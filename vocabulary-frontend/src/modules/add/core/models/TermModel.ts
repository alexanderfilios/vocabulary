import {TermService} from "../services/TermService";
import ILogService = angular.ILogService;
import {Term} from "../entities/Term";
import {Definition, Synonym, Antonym} from "../entities/Definition";
import {Example} from "../entities/Example";
import IQService = angular.IQService;
import IPromise = angular.IPromise;
/**
 * Created by alexandrosfilios on 30/10/16.
 */
export class TermModel {
    public static $inject:Array<string> = ['TermService', '$log', '$q'];
    private termService:TermService;
    private logger:ILogService;
    private qService:IQService;
    public terms:Array<Term>;
    
    constructor(termService:TermService, logger:ILogService, qService: IQService) {
        this.termService = termService;
        this.logger = logger;
        this.qService = qService;
    }

    public fetchTermById(id: number): IPromise<Term> {
        const self = this;
        const deferred = this.qService.defer();
        this.termService.fetchTermByAttr('id', id.toString())
            .then(term => deferred.resolve(self._dictToTerm(term)))
            .catch(error => {
                deferred.reject(error);
                self.logger.error(error);
            });
        return deferred.promise;
    }
    
    public fetchTermByName(name: string): IPromise<Term> {
        const self = this;
        const deferred = this.qService.defer();
        this.termService.fetchTermByAttr('name', name)
            .then(term => deferred.resolve(self._dictToTerm(term)))
            .catch(error => {
                deferred.reject(error);
                self.logger.error(error);
            });
        return deferred.promise;
    }

    public fetchExistingTerms(): IPromise<Array<{[key: string]: string}>> {
        const deferred = this.qService.defer();
        this.termService.fetchTerms()
            .then(terms => {
                deferred.resolve(terms.map(term => ({
                    id: term.id,
                    term: term.term
                })))
            })
            .catch(error => {
                this.logger.error(error);
                deferred.reject(error);
            });
        return deferred.promise;
    }

    public saveTerm(term: Term): IPromise<number> {
        const self = this;
        const deferred = this.qService.defer();
        this.termService.saveTerm(this._termToDict(term))
            .then(deferred.resolve)
            .catch((error) => {
                self.logger.error(error);
                deferred.reject();
            });
        return deferred.promise;
    }
    
    private _termToDict(term: Term): any {
        return {
            id: term.id,
            term: term.term,
            type: term.type,
            comments: term.comments,
            gender: term.gender,
            createdOn: term.createdOn,
            definitions: term.definitions
                .filter(definition => !definition.isEmpty())
                .map(definition => ({
                    definition: definition.definition,
                    synonyms: definition.synonyms
                        .filter(synonym => synonym)
                        .map(synonym => ({ synonym: synonym.synonym })),
                    antonyms: definition.antonyms
                        .filter(antonym => antonym)
                        .map(antonym => ({ antonym: antonym.antonym })),
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
            term.type,
            term.term,
            term.comments,
            term.gender,
            term.createdOn,
            term.definitions.map(definition => new Definition(
                definition.definition,
                definition.synonyms
                    .filter(synonym => synonym)
                    .map(synonym => new Synonym(synonym.synonym)),
                definition.antonyms
                    .filter(antonym => antonym)
                    .map(antonym => new Antonym(antonym.antonym)),
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
    
    public deleteTerm(id: number): IPromise {
        const self = this;
        const deferred = this.qService.defer();
        self.termService.deleteTerm(id)
            .then(deferred.resolve)
            .catch(deferred.reject);
        return deferred.promise;
        
    }
    
    public fetchTerms(): IPromise<Array<Term>> {
        const self = this;
        const deferred = this.qService.defer();
        this.termService.fetchTerms()
            .then(terms => deferred.resolve(terms.map(term => self._dictToTerm(term))))
            .catch(error => {
                deferred.reject(error);
                self.logger.error(error);
            });
        return deferred.promise;
    }
}