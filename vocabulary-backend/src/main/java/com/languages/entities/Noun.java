package com.languages.entities;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

/**
 * Created by alexandrosfilios on 30/10/16.
 */
@Entity
@DiscriminatorValue("NOUN")
public class Noun extends Term {

    public enum Gender {
        MASCULINE("MASCULINE"), FEMININE("FEMININE");
        private String name;
        private Gender(String name) { this.name = name; }
        public String getName() { return this.name; }
        public void setName(String name) { this.name = name; }
    }

    @Enumerated(EnumType.STRING)
    private Gender gender;

    public String getType() { return "NOUN"; }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }
}
