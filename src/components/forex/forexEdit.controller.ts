module app.forex {
    'use strict';
        
    interface IForexEditScope {
        forexDealExtNr: number;
        forexDeal: app.models.IForexDeal;
    }
    
    class ForexEditController implements IForexEditScope {
        forexDealExtNr: number;
        forexDeal: app.models.IForexDeal;
        
        static $inject = [
            'app.services.ForexService',
            '$stateParams'
           ];
        
        constructor(forexService: app.services.IForexService,
                    $stateParams: any) {
            this.forexDealExtNr = $stateParams.forexDealExtNr;
            this.forexDeal = undefined;

            // forexService.getById(this.forexDealExtNr).then((result): void => {
            //     this.forexDeal = result;
            // });
        }

        // updateForexDeal(): void => {
        //     alert('ok');
        // }
    }

    angular
        .module('app.forex')
        .controller('app.forex.ForexEditController',
            ForexEditController);
}
