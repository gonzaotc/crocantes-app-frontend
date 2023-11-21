import { PortfolioContext } from "@/contexts/PortfolioContext";
import { ExtendedPortfolioCurrency, ExtendedPortfolioSource } from "@/types";
import { dateToTimeAgo, fixed } from "@/utils/functions";
import React, { useContext, useState } from "react";
import { PortfolioByCurrencies } from "../../../types";

interface SourceTogglerProps {
  key: string;
  currency: ExtendedPortfolioCurrency;
}

const SourceToggler = ({ key, currency }: SourceTogglerProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      key={key}
      onClick={() => setExpanded((prev) => !prev)}
      className="flex cursor-pointer flex-col gap-4 rounded-lg border-2 p-3"
    >
      <div className="flex items-center justify-between ">
        <span className="flex flex-col">
          <p className="font-semibold">{currency.symbol}</p>
          <p className="text-sm">{currency.name}</p>
          <p className="text-sm">
            {currency.symbol !== "ARS"
              ? fixed(currency.price)
              : fixed(currency.price, 6) + " USD"}
          </p>
        </span>
        <span className="flex flex-col items-end">
          <p className="font-semibold">
            {currency.symbol === "USD" ||
            currency.symbol === "USDT" ||
            currency.symbol === "USDC" ||
            currency.symbol === "DAI" ||
            currency.symbol === "ARS"
              ? fixed(currency.totalAmount)
              : fixed(currency.totalAmount, 6) + " " + currency.symbol}
          </p>
          <p className="">{fixed(currency.totalBalance) + " USD"}</p>
          <p>{fixed(currency.portfolioPercentage) + "%"}</p>
        </span>
      </div>

      {expanded && (
        <div className="flex flex-col gap-2">
          {currency.sources.map((source) => (
            <div
              key={currency.id}
              className="flex items-center justify-between rounded-lg border-2 p-2"
            >
              <span className="flex flex-col">
                <p className="font-semibold">{source.sourceType.name}</p>
                <p>---------</p>
              </span>
              <span className="flex flex-col items-end">
                <p className="font-semibold">total</p>
                <p>percentage</p>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PortfolioByCurrency = () => {
  const { portfolioByCurrencies } = useContext(PortfolioContext);

  console.log(portfolioByCurrencies);
  return (
    <div className="flex flex-col">
      <h2 className="mb-2">Currencies</h2>
      <div className="mb-2 flex flex-col gap-2">
        {portfolioByCurrencies!.extendedCurrencies.map((currency) => (
          <SourceToggler key={currency.id} currency={currency} />
        ))}
      </div>
    </div>
  );
};

export default PortfolioByCurrency;
