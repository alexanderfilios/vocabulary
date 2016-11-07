package com.languages.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import java.util.Collection;
import java.util.Date;

/**
 * Created by alexandrosfilios on 30/10/16.
 */
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type",
        visible = true
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Noun.class, name = "NOUN"),
        @JsonSubTypes.Type(value = Phrase.class, name = "PHRASE"),
        @JsonSubTypes.Type(value = Verb.class, name = "VERB")
})
abstract public class Term {

    @Id
    @GeneratedValue
    private Long id;
    private String term;
    private String comments;
    @OneToMany(mappedBy = "term", cascade = CascadeType.ALL)
    private Collection<Definition> definitions;
    private Date createdOn;

    public abstract String getType();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Collection<Definition> getDefinitions() {
        return definitions;
    }

    public void setDefinitions(Collection<Definition> definitions) {
        this.definitions = definitions;
        this.definitions.forEach(definition -> definition.setTerm(this));
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }
}
