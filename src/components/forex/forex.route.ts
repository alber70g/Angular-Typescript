module app {
    'use strict';

    angular
        .module('app.forex')
        .config(routes);

    routes.$inject = ['$stateProvider'];

    function routes($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state('forex', {
                url: '/forex',
                controller: 'app.forex.ForexController',
                controllerAs: 'forex',
                templateUrl: 'components/forex/index.html'
            })
            .state('forex.list', {
                url: '/list',
                controller: 'app.forex.ForexListController',
                controllerAs: 'forexList',
                templateUrl: 'components/forex/list.html'
            });

        $stateProvider.state('forex.edit', {
                url: '/edit/:forexDealExtNr',
                controller: 'app.forex.ForexEditController',
                controllerAs: 'forexEdit',
                templateUrl: 'components/forex/edit.html'
            });
    }
}