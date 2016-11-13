import IScope = angular.IScope;
import {Term, Type, Gender} from "../../../core/entities/Term";
import {Definition} from "../../../core/entities/Definition";
import {Example} from "../../../core/entities/Example";
import {TermModel} from "../../../core/models/TermModel";
import IRouteParamsService = angular.route.IRouteParamsService;

export class AddTermComponent implements ng.IComponentOptions {
    public controller: Function = AddTermController;
    public controllerAs: string = 'ctrl';
    public template: string = `
    <div class="col-xs-10">
    <div class="alert alert-danger" ng-if="termNotFound">
        <i class="glyphicon glyphicon-remove" /> Term to edit not found!
    </div>
    <div class="alert alert-success" ng-if="termSubmitted && submitSuccess">
        <i class="glyphicon glyphicon-ok" /> Term <strong>"{{termSubmitted.term}}"</strong> submitted successfully!
    </div>
    <div class="alert alert-danger" ng-if="termSubmitted && !submitSuccess">
        <i class="glyphicon glyphicon-remove" /> Term <strong>"{{termSubmitted.term}}"</strong> was not submitted!
    </div>
    <form ng-submit="ctrl.save()">
        <input type="hidden"
            name="term.id"
            ng-model="term.id" />
        <input type="hidden"
            name="term.createdOn"
            ng-model="term.createdOn" />
        <div class="form-group col-xs-3">
            <input type="text"
                placeholder="Term"
                name="term.term"
                ng-model="term.term"
                autocomplete="off"
                ng-blur="ctrl.loadTerm()"
                ng-change="ctrl.checkType()"
                ng-model-options="{getterSetter: true}"
                uib-typeahead="term.term for term in existingTerms | filter:{term:$viewValue}"
                typeahead-loading="'Loading ...'"
                typeahead-no-results="'No results!'"
                class="form-control">
        </div>
        <div class="col-xs-2 text-center">
            <a target="_blank" href="{{term.term | wordReferenceLink}}"><i class="wordreference" width="10" height="10" /></a>
            <a target="_blank" href="{{term.term | theFreeDictionaryLink}}"><i class="thefreedictionary" width="10" height="10" /></a>
        </div>
        <div class="form-group col-xs-2">
                <select class="form-control"
                        name="term.type"
                        ng-model="term.type">
                    <option ng-repeat="type in TERM_TYPES">{{type}}</option>
                </select>
        </div>
        <div class="col-xs-2" ng-show="term.type !== '${Type.NOUN}'" />
        <div class="form-group col-xs-2" ng-show="term.type === '${Type.NOUN}'">
            <select class="form-control"
                    name="term.gender"
                    ng-model="term.gender">
                <option ng-repeat="gender in NOUN_GENDERS">{{gender}}</option>
            </select>
        </div>
        <div class="form-group col-xs-3">
            <input type="text"
                    class="form-control"
                    name="term.comments"
                    ng-model="term.comments"
                    placeholder="Write a comment..." />
        </div>
        <div class="col-xs-12" ng-repeat="definition in term.definitions track by $index">
            <div class="col-xs-12"><strong>Definition {{$index + 1}}</strong></div>
            <div class="form-group col-xs-3">
                <input type="text"
                    placeholder="Definition"
                    class="form-control"
                    name="term.definitions[$index].definition"
                    ng-change="ctrl.addDefinition()"
                    ng-model="term.definitions[$index].definition" />
            </div>
            <div class="col-xs-3">
                <tags-input display-property="synonym"
                        placeholder="Synonyms"
                        min-length=1
                        name="term.definitions[$index].synonyms"
                        ng-model="term.definitions[$index].synonyms" />
            </div>
            <div class="col-xs-3">
                <tags-input display-property="antonym"
                        placeholder="Antonyms"
                        min-length=1
                        name="term.definitions[$index].antonyms"
                        ng-model="term.definitions[$index].antonyms" />
            </div>
            <div class="form-group col-xs-3">
                <input type="text"
                        class="form-control"
                        name="term.definitions[$index].comments"
                        ng-model="term.definitions[$index].comments"
                        placeholder="Write a comment..." />
            </div>
            <div class="form-group row col-xs-12" ng-repeat="example in definition.examples track by $index">
                <strong class="col-xs-2">Example {{$index + 1}}:</strong>
                <div class="col-xs-10">
                <input type="text"
                    placeholder="Add an example..."
                    class="form-control"
                    ng-change="ctrl.addExample($parent.$index)"
                    name="term.definitions[$parent.$index].examples[$index].example"
                    ng-model="term.definitions[$parent.$index].examples[$index].example" />
                </div>
            </div>
        </div>
        <div class="col-xs-12">
            <button class="col-xs-1 pull-right btn btn-primary" type="submit">Add</button>
            <button class="col-xs-1 pull-right btn btn-danger" type="button" ng-click="ctrl.clear()">Clear</button>
        </div>
    </form>
    </div>
    <a class="right carousel-control" href="/#/view" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>`;
}

interface AddTermScope extends IScope {
    term: Term;
    existingTerms: Array<{[key: string]: string}>;
    termSubmitted: Term;
    submitSuccess: boolean;
    termNotFound: boolean;
    TERM_TYPES: Array<Type>;
    NOUN_GENDERS: Array<Gender>;
}
export class AddTermController {
    public static $inject: Array<string> = ['$scope', 'TermModel', '$routeParams'];

    constructor(public scope: AddTermScope, public termModel: TermModel, public routeParams: IRouteParamsService) {
        const self = this;
        self.scope.term = new Term().withExtraFields();
        self.scope.termSubmitted = null;
        self.scope.TERM_TYPES = Term.getAllTypes();
        self.scope.NOUN_GENDERS = Term.getAllGenders();
        self.scope.termNotFound = false;
        termModel.fetchExistingTerms()
            .then(terms => self.scope.existingTerms = terms)
            .catch(error => self.scope.existingTerms = []);
        if ('id' in routeParams) {
            termModel.fetchTermById(Number.parseInt(routeParams['id']))
                .then(term => self.scope.term = term.withExtraFields())
                .catch(() => self.scope.termNotFound = true);
        }
    }
    public checkType(): void {
        const articles = ['le ', 'la ', 'l\'', 'les'];
        if (articles.some(nounPrefix => this.scope.term.term.startsWith(nounPrefix))) {
            const article = articles
                .find(article => this.scope.term.term.startsWith(article)).trim();
            this.scope.term.type = Type.NOUN;
            this.scope.term.term = this.scope.term.term.substr(article.length).trim();
            if (article === 'le') {
                this.scope.term.gender = Gender.MASCULINE;
            } else if (article === 'la') {
                this.scope.term.gender = Gender.FEMININE;
            }
        } else if(['se ', 's\''].some(verbPrefix => this.scope.term.term.startsWith(verbPrefix))) {
            this.scope.term.type = Type.VERB;
        }
    }
    public addDefinition(): void {
        const emptyDefinitionIndices: Array<number> = this.scope.term.definitions
            .map((definition, index) => definition.isEmpty() ? index : null)
            .filter(definitionIndex => definitionIndex !== null);
        if (emptyDefinitionIndices.length === 0) {
            // If we have filled all definitions, then add one more definition field
            this.scope.term.definitions.push(new Definition().withExtraFields());
        } else if (emptyDefinitionIndices.length > 1) {
            // We keep the first empty definition
            this.removeDefinitions(emptyDefinitionIndices.slice(1));
        }
    }
    private removeDefinitions(indicesToRemove: Array<number>): void {
        this.scope.term.definitions = this.scope.term.definitions
            .filter((definition, index) => indicesToRemove.indexOf(index) < 0);
    }
    public addExample(definitionIndex: number): void {
        const emptyExampleIndices: Array<number> = this.scope.term.definitions[definitionIndex].examples
            .map((example, index) => example.isEmpty() ? index : null)
            .filter(exampleIndex => exampleIndex !== null);
        if (emptyExampleIndices.length === 0) {
            // If we have filled all examples, then add one more example field
            this.scope.term.definitions[definitionIndex].examples.push(new Example().withExtraFields());
        } else if (emptyExampleIndices.length > 1) {
            // We keep the first empty example
            this.removeExamples(definitionIndex, emptyExampleIndices.slice(1));
        }
    }
    private removeExamples(definitionIndex: number, indicesToRemove: Array<number>): void {
        this.scope.term.definitions[definitionIndex].examples = this.scope.term.definitions[definitionIndex].examples
            .filter((example, index) => indicesToRemove.indexOf(index) < 0);
    }
    public save(): void {
        this.termModel.saveTerm(this.scope.term)
            .then(() => {
                this.scope.termSubmitted = this.scope.term;
                this.scope.submitSuccess = true;
                this.scope.term = new Term().withExtraFields();
            })
            .catch(() => {
                this.scope.termSubmitted = this.scope.term;
                this.scope.submitSuccess = false;
            });
    }
    public loadTerm(): void {
        const self = this;
        if (self.scope.existingTerms.map(term => term['term']).indexOf(self.scope.term.term) >= 0) {
            self.termModel.fetchTermByName(self.scope.term.term)
                .then(term => self.scope.term = term.withExtraFields())
                .catch(() => self.scope.term = new Term().withExtraFields());
        }
    }
    public clear(): void {
        this.scope.term = new Term().withExtraFields();
    }
}
