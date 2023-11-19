import { apiClient } from "./axios";
import { Portfolio, SourceType, CurrencyEntry, Source } from '../types';

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

  createUserSource = async (sourceTypeId: string, currenciesData: CurrencyEntry[]) => {
    const source = await apiClient.post("/api/sources", {
      sourceTypeId: sourceTypeId,
      currenciesData: currenciesData,
    });
    return source.data as unknown as Source;
  }

  deleteUserSource = async (sourceId: string) => {
    await apiClient.delete(`/api/sources/${sourceId}`);
  }


}

export const portfolioApi = new PortfolioApi();
