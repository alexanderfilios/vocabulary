package com.languages;

import com.languages.entities.Term;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

/**
 * Created by alexandrosfilios on 30/10/16.
 */
@Repository
public interface TermRepository extends PagingAndSortingRepository<Term, Long> {
    public Collection<Term> findByTerm(String term);
}
