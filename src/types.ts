interface Source {
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

interface CurrencyEntry {
  currencyTypeId: string;
  amount: number;
}

export interface CurrencyWithType extends Currency {
  currencyType: CurrencyType;
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

export interface Portfolio {
  userId: string;
  totalBalance: number;
  extendedSources: ExtendedPortfolioSource[];
}
