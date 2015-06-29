module app.forex {
    'use strict';

    interface IForexScope {
    }

    class ForexController implements IForexScope {

        static $inject: string[] = [
        ];

        constructor() {

        }
    }

    angular
        .module('app.forex')
        .controller('app.forex.ForexController',
            ForexController);
}
