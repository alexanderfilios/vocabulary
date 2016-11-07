import IScope = angular.IScope;
import {Term} from "../../../core/entities/Term";
import {TermModel} from "../../../core/models/TermModel";
import IFilterService = angular.IFilterService;
import IRouteProvider = angular.route.IRouteProvider;
import IRoute = angular.route.IRoute;
import IRouteService = angular.route.IRouteService;
import ILocationProvider = angular.ILocationProvider;
import ILocationService = angular.ILocationService;
/**
 * Created by alexandrosfilios on 30/10/16.
 */
export class ViewTermsComponent implements ng.IComponentOptions {
    public controller: Function = ViewTermsController;
    public controllerAs: string = 'ctrl';
    public template: string = `
    <div class="col-xs-10 col-xs-offset-2">
    <div class="alert alert-success" ng-if="termRestored && restoreSuccess">
        <i class="glyphicon glyphicon-ok" /> Term <strong>"{{termRestored.term}}"</strong> restored successfully!
    </div>
    <div class="alert alert-danger" ng-if="termRestored && !restoreSuccess">
        <i class="glyphicon glyphicon-remove" /> Term <strong>"{{termRestored.term}}"</strong> was not restored!
    </div>
    <div class="alert alert-success" ng-if="termDeleted && deleteSuccess">
        <i class="glyphicon glyphicon-ok" /> Term <strong>"{{termDeleted.term}}"</strong> deleted successfully!
        <a ng-click="ctrl.restore(termDeleted)">Undo!</a>
    </div>
    <div class="alert alert-danger" ng-if="termDeleted && !deleteSuccess">
        <i class="glyphicon glyphicon-remove" /> Term <strong>"{{termDeleted.term}}"</strong> was not deleted!
    </div>
    <table st-table="termModel.terms" class="table table-striped">
        <thead>
            <tr>
                <th>Term</th>
                <th>Definitions</th>
                <th>Created On</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr ng-repeat="term in terms">
                <td>{{term.term}}</td>
                <td>
                    <div ng-repeat="definition in term.definitions">
                        <strong>{{definition.definition}}:</strong>
                        <span ng-repeat="synonym in definition.synonyms">
                            <span class="text-success">{{synonym.synonym}}</span>
                        </span>
                        <span ng-repeat="antonym in definition.antonyms">
                            <span class="text-danger">{{antonym.antonym}}</span>
                        </span>
                        <span ng-repeat="example in definition.examples">
                            <em>{{example.example}}</em>
                        </span>
                    </div>
                </td>
                <td>{{term.createdOn | date : 'd.MM.yy'}}</td>
                <td>
                    <a ng-click="ctrl.edit(term)"><i class="glyphicon glyphicon-pencil" /></a>
                    <a ng-click="ctrl.delete(term)"><i class="glyphicon glyphicon-trash" /></a>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
    <a class="left carousel-control" href="/#/add" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>`;
}

interface ViewTermsScope extends IScope {
    terms: Array<Term>;
    termDeleted: Term;
    termRestored: Term;
    deleteSuccess: boolean;
    restoreSuccess: boolean;
}
export class ViewTermsController {
    public static $inject: Array<string> = ['$scope', 'TermModel', '$location'];
    constructor(public scope: ViewTermsScope, public termModel: TermModel, public location: ILocationService) {
        this.scope.termDeleted = null;
        termModel.fetchTerms()
            .then(terms => scope.terms = terms.sort((t1, t2) => (t1.term > t2.term) ? 1 : -1))
            .catch(error => scope.terms = []);
    }
    public restore(term: Term): void {
        const self = this;
        self.scope.termDeleted = null;
        term.id = 0;
        self.termModel.saveTerm(term)
            .then((id) => {
                term.id = id;
                self.scope.terms = self.scope.terms
                    .concat(term)
                    .sort((t1, t2) => (t1.term > t2.term) ? 1 : -1);
                self.scope.restoreSuccess = true;
                self.scope.termRestored = term;
            })
            .catch(() => {
                self.scope.termRestored = term;
                self.scope.restoreSuccess = false;
            });
    }
    public edit(term: Term): void {
        this.location.path('/edit/' + term.id);
    }
    public delete(term: Term): void {
        const self = this;
        self.scope.termRestored = null;
        self.termModel.deleteTerm(term.id)
            .then(() => {
                self.scope.terms = self.scope.terms
                    .filter(t => t.id !== term.id);
                self.scope.deleteSuccess = true;
                self.scope.termDeleted = term;
            })
            .catch(() => {
                self.scope.deleteSuccess = false;
                self.scope.termDeleted = null;
            });
    }
}
