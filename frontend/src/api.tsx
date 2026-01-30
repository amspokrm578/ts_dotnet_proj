import axios, { isAxiosError } from "axios";
import { CompanyProfile } from "./Constants/company";

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://localhost:5001/api/";

export const searchCompanies = async (query: string): Promise<any> => {
  try {
    const response = await axios.get<any>(
      `${API_BASE_URL}quote`,
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

// Portfolio API functions
export const getPortfolios = async (): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>(`${API_BASE_URL}portfolio`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error("Error fetching portfolios", {
        status: error.response?.status,
        url: error.config?.url,
        data: error.response?.data
      });
    }
    throw error;
  }
};

export const addPortfolio = async (symbol: string): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}portfolio`, null, {
      params: { symbol }
    });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error("Error adding portfolio", {
        status: error.response?.status,
        url: error.config?.url,
        data: error.response?.data
      });
      throw error;
    }
    throw error;
  }
};

export const deletePortfolio = async (symbol: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}portfolio/${symbol}`);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error("Error deleting portfolio", {
        status: error.response?.status,
        url: error.config?.url,
        data: error.response?.data
      });
      throw error;
    }
    throw error;
  }
};

// https://api.twelvedata.com/profile?symbol=AAPL&apikey=demo

export const getCompanyProfile = async (
  symbol: string
): Promise<CompanyProfile> => {
  if (!process.env.REACT_APP_API_KEY) {
    throw new Error("Missing REACT_APP_API_KEY");
  }

  try {
    const response = await axios.get<CompanyProfile>(
      `${API_BASE_URL}profile`,
      {
        params: {
          symbol,
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

