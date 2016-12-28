/**
 * Created by alexandrosfilios on 30/10/16.
 */

import { Constants } from '../Constants';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TermService {
    
    constructor(private httpService: Http) {}

    public saveTerm(term: any): Observable<any> {
        return this.httpService
            .post(Constants.BASE_URL + 'term/', term);
    }

    public deleteTerm(id: number): Observable<any> {
        return this.httpService
            .delete(Constants.BASE_URL + 'term/' + id);
    }

    public fetchTermByAttr(attr: string, value: string): Observable<any> {
        return this.httpService
            .get(Constants.BASE_URL + 'term/by' + attr + '/' + value)
            .map(result => result.json());
    }

    public fetchTerms(): Observable<any> {
        return this.httpService
            .get(Constants.BASE_URL + 'term/')
            .map(result => result.json());
    }
}