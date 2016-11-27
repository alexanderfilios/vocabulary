package com.languages.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import java.util.Collection;

/**
 * Created by alexandrosfilios on 30/10/16.
 */
@Entity
public class Definition {
    @Id
    @GeneratedValue
    private Long id;
    private String definition;
    private String comments;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "term_id")
    @JsonIgnore
    private Term term;

    @OneToMany(mappedBy = "definition", cascade = CascadeType.ALL)
    private Collection<Example> examples;

    @OneToMany(mappedBy = "definition", cascade = CascadeType.ALL)
    private Collection<Synonym> synonyms;

    @OneToMany(mappedBy = "definition", cascade = CascadeType.ALL)
    private Collection<Antonym> antonyms;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDefinition() {
        return definition;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Term getTerm() {
        return term;
    }

    public void setTerm(Term term) {
        this.term = term;
    }

    public Collection<Example> getExamples() {
        return examples;
    }

    public void setExamples(Collection<Example> examples) {
        this.examples = examples;
        this.examples.forEach(example -> example.setDefinition(this));
    }

    public Collection<Synonym> getSynonyms() {
        return synonyms;
    }

    public void setSynonyms(Collection<Synonym> synonyms) {
        this.synonyms = synonyms;
        this.synonyms.forEach(synonym -> synonym.setDefinition(this));
    }

    public Collection<Antonym> getAntonyms() {
        return antonyms;
    }

    public void setAntonyms(Collection<Antonym> antonyms) {
        this.antonyms = antonyms;
        this.antonyms.forEach(antonym -> antonym.setDefinition(this));
    }
}
