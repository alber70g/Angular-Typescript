module app.navigation {
    'use strict';

    interface INavigationScope {
        text: string;
        $inject?: string[];
    }

    class NavigationController implements INavigationScope {
        text: string;

        static $inject: string[] = [
        ];

        constructor() {
        }
    }

    angular
        .module('app.navigation')
        .controller('app.navigation.NavigationController',
            NavigationController);
}