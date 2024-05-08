import { apiClient } from "./axios";
import {
  Portfolio,
  SourceType,
  CurrencyEntry,
  Source,
  UpdateCurrencyEntry,
} from "../types";

/*
 * API to manage the data related with the User's portfolio.
 * This includes:
 * - User's portfolio
 * - User's sources
 * - User's currencies inside each source
 */

class PortfolioApi {
  getUserPortfolio = async (): Promise<Portfolio> => {
    const portfolio = await apiClient.get("/api/portfolio");
    return portfolio.data as unknown as Portfolio;
  };

  createUserSource = async (
    sourceTypeId: string,
    currenciesData: CurrencyEntry[],
  ) => {
    const source = await apiClient.post("/api/sources", {
      sourceTypeId: sourceTypeId,
      currenciesData: currenciesData,
    });
    return source.data as unknown as Source;
  };

  deleteUserSource = async (sourceId: string) => {
    await apiClient.delete(`/api/sources/${sourceId}`);
  };

  updateUserSource = async (
    sourceId: string,
    newCurrencies: CurrencyEntry[],
    deletedCurrencies: string[],
    updatedCurrencies: UpdateCurrencyEntry[],
  ) => {
    await apiClient.patch(`/api/sources/${sourceId}`, {
      newCurrencies: newCurrencies,
      deletedCurrencies: deletedCurrencies,
      updatedCurrencies: updatedCurrencies,
    });
  };
}

export const portfolioApi = new PortfolioApi();
