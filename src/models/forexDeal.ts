module app.models {
	export interface IForexDeal{
	    ForexDealExtNr: number;
	    CompanyNr: number;
	    BankNr: number;
	    ClientNr: number;
	    ClientBankAbbr: string;
	    PSCode: string;
	    TransactionDate: Date;
	    DueDate: Date;
	    CurrencyNr: number;
	    CurrencyAbbr: string;
	    AmountForeign: number;
	    ExchangeRate: number;
	    SaleAmountForeign: number;
	    SaleCurrencyAbbr: string;
	    SaleExchangeRate: number;
	    Status: number;
	    LinkedForexDealExtNr: number;
	    BookingPeriod: number;
	    TraderUserNr: number;
	    UserAbbr: string;
	    TradeDepartmentNr: number;
	    DepartmentAbbr: string;
	    CreatorId: number;
	    CreationDate: Date;
	    ApproveUser: number;
	    ApproveDate: Date;
	    UsageForId: string;
	    HomeCurrencyNr: number;
	    HomeCurrencyAbbr: string;
	    CompanyAbbrShort: string;
	    TradeId: string;
	    Uti: string;
	    FixingDate: Date;
	    CFormatA: string;
	}
}