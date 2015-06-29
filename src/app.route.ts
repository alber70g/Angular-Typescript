module app {
    'use strict';

    angular
        .module('app')
        .config(routes);

    routes.$inject = ['$urlRouterProvider'];

    function routes($urlRouterProvider: ng.ui.IUrlRouterProvider) {
        $urlRouterProvider.otherwise('/forex/list');
    }
}