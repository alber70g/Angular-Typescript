module app.dashboard {
    'use strict';

    interface IDashboardScope {
        $inject?: string[];
    }

    class DashboardController implements IDashboardScope {
        static $inject: string[] = [];

        constructor() {
            console.log('placeholder');
        }
    }

    angular
        .module('app.dashboard')
        .controller('DashboardController',
            DashboardController);
}