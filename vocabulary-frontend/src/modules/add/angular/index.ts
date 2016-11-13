import "angular";
import "angular-route";
import "angular-smart-table";
import "ng-tags-input";
import "ng-tags-input/build/ng-tags-input.bootstrap.min.css";
import "ng-tags-input/build/ng-tags-input.min.css";
import "angular-ui-bootstrap/src/typeahead";
import {config as routesConfig} from "./configs/routes";
import {AddTermComponent} from "./components/addTerm/AddTermComponent";
import {ViewTermsComponent, wordReferenceLink, theFreeDictionaryLink} from "./components/viewTerms/ViewTermsComponent";
import {TermModel} from "../core/models/TermModel";
import {TermService} from "../core/services/TermService";

angular.module("app.add", ["ngRoute", "smart-table", "ngTagsInput", "ui.bootstrap.module.typeahead"])
    .component("addTerm", new AddTermComponent())
    .component("viewTerms", new ViewTermsComponent())
    .service("TermModel", TermModel)
    .service("TermService", TermService)
    .filter("wordReferenceLink", wordReferenceLink)
    .filter("theFreeDictionaryLink", theFreeDictionaryLink)
    .config(routesConfig);
