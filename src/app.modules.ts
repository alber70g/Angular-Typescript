module app {
    'use strict';

    angular
        .module('templates', []);

    angular
        .module('app', [
            'app.core',
            'app.services',
            'app.providers',
            'app.navigation',
            'app.forex',
            'app.dashboard'
        ]);
}