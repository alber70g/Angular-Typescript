module app.forex {
    'use strict';
        
    interface IForexListScope {
        text: string;
        queryResult: app.models.IForexDeal[];
        gridOptions: any;
    }
    
    class ForexListController implements IForexListScope {
        text: string; 
        queryResult: app.models.IForexDeal[];
        gridOptions: any;
        
        static $inject = [
            'app.services.ForexService',
            'app.providers.GridConfigProvider'
           ];
        
        constructor(forexService: app.services.IForexService,
                    gridConfig: app.providers.IGridConfigProvider
                    ) {

            var columnDefs: any[] = [
                { 
                    headerName: "Forex Deal Ext Nr",
                    field: "FOREX_DEAL_EXT_NR",
                    template: '<a ui-sref="forex.edit({forexDealExtNr: {{data.FOREX_DEAL_EXT_NR}} })">{{data.FOREX_DEAL_EXT_NR}}</a>'
                },
                { 
                    headerName: "Company",
                    field: "COMPANY_ABBR_SHORT" 
                },
                { 
                    headerName: "Home Currency",
                    field: "HOME_CURRENCY_ABBR" 
                },
                { 
                    headerName: "Client Bank",
                    field: "CLIENT_BANK_ABBR" 
                },
                { 
                    headerName: "P/S Code",
                    field: "P_S_CODE" 
                },
                { 
                    headerName: "Transaction Date",
                    field: "TRANSACTION_DATE" 
                },
                { 
                    headerName: "Due Date",
                    field: "DUE_DATE" 
                },
                { 
                    headerName: "Fixing Date",
                    field: "FIXING_DATE" 
                },
                { 
                    headerName: "Currency",
                    field: "CURRENCY_ABBR" 
                },
                { 
                    headerName: "Amount Foreign",
                    field: "AMOUNT_FOREIGN" 
                },
                { 
                    headerName: "Exchange Rate",
                    field: "EXCHANGE_RATE" 
                },
                { 
                    headerName: "Sale Amount Foreign",
                    field: "SALE_AMOUNT_FOREIGN" 
                },
                { 
                    headerName: "Sale Currency",
                    field: "SALE_CURRENCY_ABBR" 
                },
                { 
                    headerName: "Sale Exchange Rate",
                    field: "SALE_EXCHANGE_RATE" 
                },
                { 
                    headerName: "Status",
                    field: "STATUS" 
                },
                { 
                    headerName: "Booking Period",
                    field: "BOOKING_PERIOD" 
                },
                { 
                    headerName: "Trader",
                    field: "USER_ABBR" 
                },
                { 
                    headerName: "Trade dept.",
                    field: "DEPARTMENT_ABBR" 
                },
                { 
                    headerName: "Creator",
                    field: "CREATOR_ID" 
                },
                { 
                    headerName: "Creation date",
                    field: "CREATION_DATE" 
                },
                { 
                    headerName: "Approve User",
                    field: "APPROVE_USER" 
                },
                { 
                    headerName: "Approve Date",
                    field: "APPROVE_DATE" 
                },
                { 
                    headerName: "Trade ID",
                    field: "TRADE_ID" 
                },
                { 
                    headerName: "UTI",
                     fild: "UTI"
                     }
            ];

            this.text = "text from ForexListController";
            
            forexService.getAll().then((forexDeals: any) => {
                this.gridOptions = gridConfig;
                this.gridOptions.angularCompileRows = true;
                this.gridOptions.columnDefs = columnDefs;
                this.gridOptions.rowData = forexDeals;
            });
            
        }
    }

    angular
        .module('app.forex')
        .controller('app.forex.ForexListController',
            ForexListController);
}
