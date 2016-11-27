package com.languages;

import com.languages.entities.Term;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.NamedQuery;
import java.util.Collection;

/**
 * Created by alexandrosfilios on 30/10/16.
 */
@Repository
public interface TermRepository extends JpaRepository<Term, Long> {
    public Collection<Term> findByTerm(String term);

}
