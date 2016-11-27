package com.languages;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.Lists;
import com.languages.entities.Definition;
import com.languages.entities.Noun;
import com.languages.entities.PdfList;
import com.languages.entities.Term;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Created by alexandrosfilios on 30/10/16.
 */
@CrossOrigin
@RestController
@RequestMapping("/")
public class VocabularyController {

    private TermRepository termRepository;

    @RequestMapping(value = "test")
    public ResponseEntity<String> testController() {
        return new ResponseEntity<String>("test", HttpStatus.OK);
    }

    @RequestMapping(value = "paper", method = RequestMethod.GET, produces = "application/pdf")
    public ResponseEntity<byte[]> getPaperAsPdf() {
//System.out.println(this.termRepository.getAll().size() + " terms found");
        List<Term> terms = ImmutableList.<Term>builder()
                .addAll(this.termRepository.findAll())
                .addAll(this.termRepository.findAll())
                .addAll(this.termRepository.findAll())
                .build();
        PdfList list = PdfList.getListFromTerms(terms.stream()
                .sorted((term1, term2) -> term1.getTerm().compareTo(term2.getTerm()))
                .collect(Collectors.toList()));

        try (FileInputStream fileInputStream = new FileInputStream(list.getFilepath())) {
            byte[] contents = IOUtils.toByteArray(fileInputStream);
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.APPLICATION_PDF);
            httpHeaders.setContentDispositionFormData(list.getFilename(), list.getFilename());

            Path path = Paths.get(list.getFilepath());
            Files.deleteIfExists(path);

            return new ResponseEntity<>(contents, httpHeaders, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }



    }

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
