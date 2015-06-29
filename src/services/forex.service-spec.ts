/// <reference path="../models/forexDeal.ts"/>
/// <reference path="../services/forex.service.ts"/>

'use strict';

describe("forex api service", function(): void {

	var forexService: any,
		httpBackend: any;

	beforeEach(function (){  
		module('app.services');
		
		var run = function($httpBackend: any, _ForexService_: any) {
			forexService = _ForexService_;
			httpBackend = $httpBackend;
		}

		run.$inject = ['$httpBackend', 'app.services.ForexService'];

		inject(run);
	});
	
	it("getAll() gives the correct amount of ForexDeals", function() {
		httpBackend.when('GET', '/api/forex/dataretrieval').respond(
			[{ FOREX_DEAL_EXT_NR: 0, COMPANY_NR: 36, BANK_NR: 38, CLIENT_NR: 0, CLIENT_BANK_ABBR: "BNP ESPANA SA", P_S_CODE: "P", TRANSACTION_DATE: "2015-06-01T00:00:00", DUE_DATE: "2015-06-01T00:00:00", CURRENCY_NR: 2, CURRENCY_ABBR: "USD", AMOUNT_FOREIGN: 1.83671e-40, EXCHANGE_RATE: 5.51013e-40, SALE_AMOUNT_FOREIGN: -1.83671e-40, SALE_CURRENCY_ABBR: "EUR", SALE_EXCHANGE_RATE: 0, STATUS: 1, LINKED_FOREX_DEAL_EXT_NR: 0, BOOKING_PERIOD: 201506, TRADER_USER_NR: 389, USER_ABBR: "MADARIAGA, F.", TRADE_DEPARTMENT_NR: 57, DEPARTMENT_ABBR: "BO CU MADRID", CREATOR_ID: 1301, CREATION_DATE: "2015-06-08T16:11:25", APPROVE_USER: 1301, APPROVE_DATE: "2015-06-08T16:11:28", USAGE_FOR_ID: "G", HOME_CURRENCY_NR: 35, HOME_CURRENCY_ABBR: "EUR", COMPANY_ABBR_SHORT: "GSP", TRADE_ID: "70292749_0_0_0", UTI: "YCDYZNMZ3J70292749L0A0", FIXING_DATE: "0001-01-01T00:00:00", C_FORMAT_A: "#,##0.00;-#,##0.00;0.00;#" },
			{ FOREX_DEAL_EXT_NR: 0, COMPANY_NR: 36, BANK_NR: 38, CLIENT_NR: 0, CLIENT_BANK_ABBR: "BNP ESPANA SA", P_S_CODE: "P", TRANSACTION_DATE: "2015-06-01T00:00:00", DUE_DATE: "2015-06-01T00:00:00", CURRENCY_NR: 2, CURRENCY_ABBR: "USD", AMOUNT_FOREIGN: 1.83671e-40, EXCHANGE_RATE: 5.51013e-40, SALE_AMOUNT_FOREIGN: -1.83671e-40, SALE_CURRENCY_ABBR: "EUR", SALE_EXCHANGE_RATE: 0, STATUS: 1, LINKED_FOREX_DEAL_EXT_NR: 0, BOOKING_PERIOD: 201506, TRADER_USER_NR: 389, USER_ABBR: "MADARIAGA, F.", TRADE_DEPARTMENT_NR: 57, DEPARTMENT_ABBR: "BO CU MADRID", CREATOR_ID: 1301, CREATION_DATE: "2015-06-08T16:11:25", APPROVE_USER: 1301, APPROVE_DATE: "2015-06-08T16:11:28", USAGE_FOR_ID: "G", HOME_CURRENCY_NR: 35, HOME_CURRENCY_ABBR: "EUR", COMPANY_ABBR_SHORT: "GSP", TRADE_ID: "70292749_0_0_0", UTI: "YCDYZNMZ3J70292749L0A0", FIXING_DATE: "0001-01-01T00:00:00", C_FORMAT_A: "#,##0.00;-#,##0.00;0.00;#" }]);

		forexService.getAll().then(function(forexDeals: app.models.IForexDeal[]) {
			expect(forexDeals.length).toEqual(2);
		});
	});

});