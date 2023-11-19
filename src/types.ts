export interface Source {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  sourceTypeId: string;
}

export interface SourceType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  symbol: string;
  url: string;
}

interface Currency {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  currencyTypeId: string;
  sourceId: string;
}

export interface CurrencyType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  symbol: string;
  name: string;
  price: number;
}

export interface CurrencyEntry {
  currencyTypeId: string;
  amount: number;
}

export interface CurrencyWithType extends Currency {
  currencyType: CurrencyType;
}

export interface CurrencyTypeWithSources extends CurrencyType {
  sources: Source[];
}

export interface SourceWithCurrenciesAndTypes extends Source {
  currencies: CurrencyWithType[];
}

export interface ExtendedSource extends SourceWithCurrenciesAndTypes {
  totalBalance: number;
}

export interface ExtendedPortfolioSource extends ExtendedSource {
  portfolioPercentage: number;
}

export interface ExtendedCurrencyType extends CurrencyTypeWithSources {
  totalBalance: number;
  totalAmount: number;
}

export interface ExtendedPortfolioCurrency extends ExtendedCurrencyType {
  portfolioPercentage: number;
}

export interface Portfolio {
  userId: string;
  totalBalance: number;
  extendedSources: ExtendedPortfolioSource[];
}

export interface PortfolioByCurrencies {
  userId: string;
  totalBalance: number;
  extendedCurrencies: ExtendedPortfolioCurrency[];
}
