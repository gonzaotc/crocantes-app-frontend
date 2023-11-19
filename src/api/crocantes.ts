import { apiClient } from "./axios";
import { SourceType, CurrencyType } from "../types";

/*
 * API to read data from the server that is not related to the user,
 * and is only editable by the crocantes server.
 */

class CrocantesApi {
  getSourceTypes = async (): Promise<SourceType[]> => {
    const sourceTypes = await apiClient.get("/api/sourceTypes");
    return sourceTypes.data as unknown as SourceType[];
  }

  getCurrencyTypes = async () => {
    const currencyTypes = await apiClient.get("/api/currencyTypes");
    return currencyTypes.data as unknown as CurrencyType[];
  }
}

export const crocantesApi = new CrocantesApi();
