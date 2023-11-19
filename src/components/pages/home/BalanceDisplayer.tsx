import { PortfolioContext } from "@/contexts/PortfolioContext";
import { fixed } from "@/utils/functions";
import React, { useContext } from "react";

const BalanceDisplayer = () => {
  const { portfolio } = useContext(PortfolioContext);

  return (
    <div className="flex flex-col items-center justify-center gap-3 text-lg">
      <div className="flex items-end justify-center gap-3">
        <p className="text-center text-5xl">{fixed(portfolio?.totalBalance)}</p>
        <p className="">USD</p>
      </div>
    </div>
  );
};

export default BalanceDisplayer;
