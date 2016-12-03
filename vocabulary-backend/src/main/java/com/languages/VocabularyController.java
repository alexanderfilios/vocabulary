package com.languages;

import com.google.common.collect.Lists;
import com.languages.entities.Term;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.StreamUtils;
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


/**
 * Created by alexandrosfilios on 30/10/16.
 */
@CrossOrigin
@RestController
@RequestMapping("/")
public class VocabularyController {

    private TermRepository termRepository;
    private PdfService pdfService;

    @RequestMapping(value = "test")
    public ResponseEntity<String> testController() {
        return new ResponseEntity<String>("test", HttpStatus.OK);
    }

    @RequestMapping(value = "paper", method = RequestMethod.GET, produces = "application/pdf")
    public ResponseEntity<byte[]> getPaperAsPdf() {

        String filename = "Vocabulary";
        List<Term> terms = StreamUtils.createStreamFromIterator(this.termRepository.findAll().iterator())
                .sorted((term1, term2) -> term1.getTerm().compareTo(term2.getTerm()))
                .collect(Collectors.toList());
        String pdfFilepath = pdfService.getListFromTerms(filename, terms);

        try (FileInputStream fileInputStream = new FileInputStream(pdfFilepath)) {
            byte[] contents = IOUtils.toByteArray(fileInputStream);
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.APPLICATION_PDF);
            httpHeaders.setContentDispositionFormData(filename, filename);

            Path path = Paths.get(pdfFilepath);
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

    @Autowired
    public void setPdfService(PdfService pdfService) { this.pdfService = pdfService; }
}
