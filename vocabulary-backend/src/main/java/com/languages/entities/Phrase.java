package com.languages.entities;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * Created by alexandrosfilios on 30/10/16.
 */
@Entity
@DiscriminatorValue("PHRASE")
public class Phrase extends Term {
    public String getType() { return "PHRASE"; }
}
