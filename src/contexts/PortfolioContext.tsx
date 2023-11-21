import { createContext, useContext, useEffect, useState } from "react";
import { Portfolio, PortfolioByCurrencies } from "../types";
import { UserContext } from "./UserContext";
import { portfolioApi } from "@/api/portfolio";
import toast from "react-hot-toast";
import { transformPortfolioByCurrencies } from "@/business-logic/portfolio";

interface PortfolioContextValue {
  portfolio: Portfolio | null;
  portfolioByCurrencies: PortfolioByCurrencies | null;
  loadingPortfolio: boolean;
  handleRefreshPortfolio: () => void;
}

interface PortfolioContextProviderProps {
  children: React.ReactNode;
}

const initialPortfolioContextValue: PortfolioContextValue = {
  portfolio: null,
  portfolioByCurrencies: null,
  loadingPortfolio: true,
  handleRefreshPortfolio: () => {},
};

export const PortfolioContext = createContext<PortfolioContextValue>(
  initialPortfolioContextValue,
);

export const PortfolioContextProvider = ({
  children,
}: PortfolioContextProviderProps) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [portfolioByCurrencies, setPortfolioByCurrencies] =
    useState<PortfolioByCurrencies | null>(null);
  const [loadingPortfolio, setLoadingPortfolio] = useState<boolean>(true);

  const { user } = useContext(UserContext);

  const getUserPortfolio = async () => {
    try {
      const portfolio = await portfolioApi.getUserPortfolio();
      const portfolioByCurrencies = transformPortfolioByCurrencies(portfolio);

      console.log("user portfolio", portfolio);
      console.log("user portfolio by currencies", portfolioByCurrencies);

      setPortfolioByCurrencies(portfolioByCurrencies);
      setPortfolio(portfolio);
      toast.success("Successfully got your portfolio.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to get user portfolio");
    } finally {
      setLoadingPortfolio(false);
    }
  };

  const handleRefreshPortfolio = async () => { 
    await getUserPortfolio();
  }

  useEffect(() => {
    if (user) {
      getUserPortfolio();
    }
  }, [user]);

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        portfolioByCurrencies,
        loadingPortfolio,
        handleRefreshPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
