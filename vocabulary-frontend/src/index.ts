import "./modules/application/angular/index";
import "./modules/add/angular/index";
import "angular";

// load our default (non specific) css
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/fonts/glyphicons-halflings-regular.svg";
import "bootstrap/dist/fonts/glyphicons-halflings-regular.eot";
import "bootstrap/dist/fonts/glyphicons-halflings-regular.ttf";
import "bootstrap/dist/fonts/glyphicons-halflings-regular.woff";
import "bootstrap/dist/fonts/glyphicons-halflings-regular.woff2";
import "./styles/screen.scss";

angular.module("app", ["app.application", "app.add"]);
angular.bootstrap(document, ["app"], {
    strictDi: true
});
