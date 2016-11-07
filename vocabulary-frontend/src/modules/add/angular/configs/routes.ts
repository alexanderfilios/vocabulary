config.$inject = ["$routeProvider"];
export function config($routeProvider: ng.route.IRouteProvider): void {
    $routeProvider.when("/add", {
        template: "<add-term></add-term>"
    }).when("/view", {
        template: "<view-terms></view-terms>"
    }).when("/edit/:id", {
        template: "<add-term></add-term>"
    }).otherwise({
        redircetTo: "/"
    });
}
