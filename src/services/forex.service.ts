module app.services {
	'use strict';

	export interface IForexService {

		getAll(): ng.IPromise<app.models.IForexDeal[]>;
		update(forexDeal: app.models.IForexDeal): void;
	}

	class ForexService implements IForexService {

		static $inject: string[] = ['$http'];

		constructor(private $http: ng.IHttpService) {
		}

		update(forexDeal: app.models.IForexDeal): void {
			this.$http.put('/api/forex/' + forexDeal.ForexDealExtNr, forexDeal)
				.then((response: ng.IHttpPromiseCallbackArg<any>): any => {
					// ?
				});
		}

		getAll(): ng.IPromise<app.models.IForexDeal[]> {
			// return this.forexDealResource.get({ 'id': id }, (result: app.models.IForexDeal) => {
			// 	return result;
			// }, () => { });
			
			return this.$http.get('/api/forex/dataretrieval')
				.then((response: ng.IHttpPromiseCallbackArg<app.models.IForexDeal[]>): app.models.IForexDeal[] => {
					return response.data;
				});
		}

		// getById(id: number): ng.IPromise<app.models.IForexDeal[]> {
		// 	return this.$http.get('/api/forex/dataretrieval/' + id.toString())
		// 		.then((response: ng.IHttpPromiseCallbackArg<app.models.IForexDeal>): app.models.IForexDeal => {
		// 			return response.data;
		// 		});
		// }
	}
	
	factory.$inject = ['$http'];
	function factory($http: ng.IHttpService): IForexService {
		return new ForexService($http);
	}

	angular
		.module('app.services')
		//.factory('app.services.ForexService', factory)
		.service('app.services.ForexService', ForexService);
}
