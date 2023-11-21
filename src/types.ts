export interface Source {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  sourceTypeId: string;
}

export interface SourceType {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  symbol: string;
  url: string;
}

export interface SourceWithSourceType extends Source {
  sourceType: SourceType;
}

export interface SourceWithSourceTypeAndCurrencies extends Source {
  sourceType: SourceType;
  currencies: CurrencyWithType[];
}

interface Currency {
  id: string;
  createdAt: string;
  updatedAt: string;
  amount: number;
  currencyTypeId: string;
  sourceId: string;
}

export interface CurrencyType {
  id: string;
  createdAt: string;
  updatedAt: string;
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
  sources: SourceWithSourceTypeAndCurrencies[];
}

export interface SourceWithCurrenciesAndTypes extends SourceWithSourceType {
  currencies: CurrencyWithType[];
}

export interface ExtendedSource extends SourceWithCurrenciesAndTypes {
  totalBalance: number;
}

export interface ExtendedPortfolioSource extends SourceWithSourceTypeAndCurrencies {
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
