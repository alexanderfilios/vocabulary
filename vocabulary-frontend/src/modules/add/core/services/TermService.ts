/**
 * Created by alexandrosfilios on 30/10/16.
 */
import IHttpService = angular.IHttpService;
import IPromise = angular.IPromise;
import IQService = angular.IQService;
import {Constants} from "../../../application/core/Constants";

export class TermService {
    public static $inject:Array<string> = ['$http', '$q'];
    private httpService:IHttpService;
    private qService:IQService;
    
    constructor(httpService:IHttpService, qService:IQService) {
        this.httpService = httpService;
        this.qService = qService;
    }

    public saveTerm(term: any): IPromise<any> {
        const self = this;
        const deferred = self.qService.defer();
        self.httpService({
            method: 'POST',
            url: Constants.BASE_URL + 'term/',
            data: term
        })
            .then((id) => deferred.resolve(id))
            .catch((any) => deferred.reject(any));
        return deferred.promise;
    }

    public deleteTerm(id: number): IPromise {
        const self = this;
        const deferred = self.qService.defer();
        self.httpService({
            method: 'DELETE',
            url: Constants.BASE_URL + 'term/' + id
        })
            .then(deferred.resolve)
            .catch(deferred.reject);
        return deferred.promise;
    }

    public fetchTermByAttr(attr: string, value: string): IPromise<any> {
        const self = this;
        const deferred = self.qService.defer();
        self.httpService({
            method: 'GET',
            url: Constants.BASE_URL + 'term/by' + attr + '/' + value
        })
            .then(result => deferred.resolve(result.data))
            .catch(error => deferred.reject(error));
        return deferred.promise;
    }

    public fetchTerms(): IPromise<any> {
        const self = this;
        const deferred = self.qService.defer();
        self.httpService({
            method: 'GET',
            url: Constants.BASE_URL + 'term/'
        })
            .then(result => deferred.resolve(result.data))
            .catch(error => deferred.reject(error));
        return deferred.promise;
    }
}