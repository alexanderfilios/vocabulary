package com.languages.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * Created by alexandrosfilios on 06/11/16.
 */
@Entity
public class Antonym {
    @Id
    @GeneratedValue
    private Long id;
    private String antonym;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "definition_id")
    @JsonIgnore
    private Definition definition;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAntonym() {
        return antonym;
    }

    public void setAntonym(String antonym) {
        this.antonym = antonym;
    }

    public Definition getDefinition() {
        return definition;
    }

    public void setDefinition(Definition definition) {
        this.definition = definition;
    }
}
