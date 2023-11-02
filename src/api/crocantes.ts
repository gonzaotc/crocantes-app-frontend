import { apiClient } from "./axios";
import { SourceType, CurrencyType } from "../types";

/*
 * API to read data from the server that is not related to the user,
 * and is only editable by the crocantes server.
 */

class CrocantesApi {
  //   static async getSourceTypes(): Promise<SourceType[]> {
  //     const sourceTypes = await apiClient.get("/api/sourceTypes");
  //     return sourceTypes as unknown as SourceType[];
  //   }
  //   static async getCurrencyTypes() {
  //     const currencyTypes = await apiClient.get("/api/currencyTypes");
  //     return currencyTypes as unknown as CurrencyType[];
  //   }
}

export const portfolioApi = new CrocantesApi();
