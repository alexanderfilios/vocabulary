import * as moment from 'moment/moment';

import { Injectable } from '@angular/core';

import {TermService} from "../services/term-service";
import { LoggerService } from "../services/logger-service";
import { Observable } from "rxjs/Observable";

import {Term, Type, Gender} from "../entities/term";
import {Definition} from "../entities/definition";
import {Example} from "../entities/example";
/**
 * Created by alexandrosfilios on 30/10/16.
 */
@Injectable()
export class TermModel {
    
    public constructor(
        private termService: TermService,
        private logger: LoggerService) {}

    public fetchTermById(id: number): Observable<Term> {
        const self = this;
        return self.termService.fetchTermByAttr('id', id.toString())
            .map(self._dictToTerm)
            .catch(error => {
                self.logger.error(error);
                return Observable.throw(error);
            });
    }
    
    public fetchTermByName(name: string): Observable<Term> {
        const self = this;
        return self.termService.fetchTermByAttr('name', name)
            .map(self._dictToTerm)
            .catch(error => {
                self.logger.error(error);
                return Observable.throw(error);
            });
    }

    public fetchExistingTerms(): Observable<Array<{[key: string]: string}>> {
        const self = this;
        return self.termService.fetchTerms()
            .map(terms => terms.map(term => ({
                    id: term.id,
                    term: term.term
                })))
            .catch(error => {
                self.logger.error(error);
                return Observable.throw(error);
            });
    }

    public saveTerm(term: Term): Observable<number> {
        const self = this;
        return self.termService.saveTerm(this._termToDict(term))
            .map(id => id)
            .catch(error => {
                self.logger.error(error);
                return Observable.throw(error);
            });
    }
    
    private _termToDict(term: Term): any {
        return {
            id: term.id,
            term: term.term,
            type: Type[term.type],
            comments: term.comments,
            gender: term.gender,
            createdOn: moment(new Date(term.createdOn)).format('YYYY-MM-DD'),
            definitions: term.definitions
                .filter(definition => !definition.isEmpty())
                .map(definition => ({
                    definition: definition.definition,
                    synonyms: definition.synonyms
                        .filter(synonym => synonym)
                        .map(synonym => ({ synonym: synonym })),
                    antonyms: definition.antonyms
                        .filter(antonym => antonym)
                        .map(antonym => ({ antonym: antonym })),
                    comments: definition.comments,
                    examples: definition.examples
                        .filter(example => !example.isEmpty())
                        .map(example => ({
                            example: example.example,
                            comments: example.comments
                        }))
                }))
        };
    }
    
    private _dictToTerm(term: any): Term {
        return new Term(
            term.id,
            Type[<string>term.type],
            term.term,
            term.comments,
            Gender[<string>term.gender],
            term.createdOn,
            term.definitions.map(definition => new Definition(
                definition.definition,
                definition.synonyms
                    .filter(synonym => synonym)
                    .map(synonym => synonym.synonym),
                definition.antonyms
                    .filter(antonym => antonym)
                    .map(antonym => antonym.antonym),
                definition.comments,
                definition.examples
                    .filter(example => example.example)
                    .map(example => new Example(
                        example.example,
                        example.comments
                    ))
            ))
        );
    }
    
    public deleteTerm(id: number): Observable<void> {
        const self = this;
        return self.termService.deleteTerm(id)
            .map(id => id)
            .catch(error => {
                self.logger.error(error);
                return Observable.throw(error);
            });
    }
    
    public fetchTerms(): Observable<Array<Term>> {
        const self = this;
        console.log('fetching terms');
        return self.termService.fetchTerms()
            .map(terms => terms.map(self._dictToTerm))
            .catch(error => {
                self.logger.error(error);
                return Observable.throw(error);
            });
    }
}