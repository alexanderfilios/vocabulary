import "angular";
import "angular-ui-bootstrap";

import {VocabularyApplicationComponent} from "./components/adblockersApplication/VocabularyApplicationComponent";
angular.module("app.application", ["ui.bootstrap"])
    .component("twitterApplication", new VocabularyApplicationComponent());
