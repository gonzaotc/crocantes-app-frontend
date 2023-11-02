import { PortfolioContext } from "@/contexts/PortfolioContext";
import React, { useContext } from "react";

const BalanceDisplayer = () => {
  const { portfolio } = useContext(PortfolioContext);

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-3 text-lg">
      <div className="flex items-end justify-center gap-3 py-3">
        <p className="text-center text-5xl">
          {portfolio?.totalBalance.toFixed(2)}
        </p>
        <p className="">USD</p>
      </div>
    </div>
  );
};

export default BalanceDisplayer;
