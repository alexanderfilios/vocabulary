package com.languages;

import com.google.common.collect.Lists;
import com.languages.entities.Definition;
import com.languages.entities.Noun;
import com.languages.entities.Term;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by alexandrosfilios on 30/10/16.
 */
@CrossOrigin
@RestController
@RequestMapping("/")
public class VocabularyController {

    private TermRepository termRepository;

    @RequestMapping(value = "term", method = RequestMethod.GET)
    public List<Term> getTerms() {
        return Lists.newArrayList(this.termRepository.findAll());
    }

    @RequestMapping(value = "term/byname/{name}", method = RequestMethod.GET)
    public ResponseEntity<Term> getTermByName(@PathVariable("name") String name) {
        Term term = this.termRepository
                .findByTerm(name).stream()
                .findFirst()
                .orElse(null);
        return new ResponseEntity<>(term, term == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @RequestMapping(value = "term/byid/{termId}", method = RequestMethod.GET)
    public ResponseEntity<Term> getTermById(@PathVariable("termId") Long termId) {
        Term term = this.termRepository.findOne(termId);
        return new ResponseEntity<>(term, term == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @RequestMapping(value = "term/{termId}", method = RequestMethod.DELETE)
    public void deleteTerm(@PathVariable("termId") Long termId) {
        this.termRepository.delete(termId);
    }

    @RequestMapping(value = "term", method = RequestMethod.POST)
    public Long saveTerm(@RequestBody Term term) {
        if (term.getId() != 0) {
            this.termRepository.delete(term.getId());
        } else {
            term.setCreatedOn(new Date());
        }
        return this.termRepository.save(term).getId();
    }

    @Autowired
    public void setTermRepository(TermRepository termRepository) { this.termRepository = termRepository; }
}
