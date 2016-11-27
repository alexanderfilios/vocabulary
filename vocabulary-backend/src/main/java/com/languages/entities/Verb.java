package com.languages.entities;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * Created by alexandrosfilios on 30/10/16.
 */
@Entity
@DiscriminatorValue("VERB")
public class Verb extends Term {

    private boolean isReflexive;

    public String getType() { return "VERB"; }

    public boolean isReflexive() {
        return isReflexive;
    }

    public void setReflexive(boolean reflexive) {
        isReflexive = reflexive;
    }
}
