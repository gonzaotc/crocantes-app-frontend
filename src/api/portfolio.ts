import { apiClient } from "./axios";
import { Portfolio } from "../types";

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

  //   static async createUserSource(name: string, currency: string) {
  //     const source = await apiClient.post("/api/sources", { name, currency });
  //     return source;
  //   }

  //   static async getUserSources() {
  //     const sources = await apiClient.get("/api/sources");
  //     return sources;
  //   }
}

export const portfolioApi = new PortfolioApi();
