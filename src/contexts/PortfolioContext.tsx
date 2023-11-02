import { createContext, useContext, useEffect, useState } from "react";
import { Portfolio } from "../types";
import { UserContext } from "./UserContext";
import { portfolioApi } from "@/api/portfolio";
import toast from "react-hot-toast";

interface PortfolioContextValue {
  portfolio: Portfolio | null;
  loadingPortfolio: boolean;
}

interface PortfolioContextProviderProps {
  children: React.ReactNode;
}

const initialPortfolioContextValue: PortfolioContextValue = {
  portfolio: null,
  loadingPortfolio: true,
};

export const PortfolioContext = createContext<PortfolioContextValue>(
  initialPortfolioContextValue,
);

export const PortfolioContextProvider = ({
  children,
}: PortfolioContextProviderProps) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loadingPortfolio, setLoadingPortfolio] = useState<boolean>(true);

  const { user } = useContext(UserContext);

  const getUserPortfolio = async () => {
    try {
      const portfolio = await portfolioApi.getUserPortfolio();
      console.log("user portfolio", portfolio);
      setPortfolio(portfolio);
      toast.success("Successfully got your portfolio.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to get user portfolio");
    } finally {
      setLoadingPortfolio(false);
    }
  };

  useEffect(() => {
    if (user) {
      getUserPortfolio();
    }
  }, [user]);

  return (
    <PortfolioContext.Provider value={{ portfolio, loadingPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};
