import axios, { isAxiosError } from "axios";
import { CompanySearch } from "./Constants/company";

export const searchCompanies = async (query: string): Promise<any> => {
  try {
    const response = await axios.get<any>(
      `${process.env.REACT_APP_API_URL}quote`,
      {
        params: {
          symbol: query,
          apikey: process.env.REACT_APP_API_KEY
        }
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error("API error", {
        status: error.response?.status,
        url: error.config?.url,
        data: error.response?.data
      });
    }
    throw error;
  }
};
