import IScope = angular.IScope;
import {Constants} from "../../../core/Constants";
export class VocabularyApplicationComponent implements ng.IComponentOptions{
    public controller: Function = VocabularyApplicationController;
    public template: string = `<div ng-view></div>`;
}

interface IMenuScope extends IScope {
    isExpandable: Function;
    menuItems: Array<any>;
}
export class VocabularyApplicationController {
    public static $inject: Array<string> = ['$scope'];
    constructor(scope: IMenuScope) {
        scope.isExpandable = function(menuItem: any): boolean {
            return menuItem && Array.isArray(menuItem.subMenuItems)
                && menuItem.subMenuItems.length > 0;
        };
        scope.menuItems = [
            {
                title: 'Add',
                text: 'Add',
                link: '#/add',
                icon: 'th',
                subMenuItems: []
            },
            {
                title: 'View',
                text: 'View',
                link: '#/view',
                icon: 'list-alt',
                subMenuItems: []
            }
        ];
    }
}
