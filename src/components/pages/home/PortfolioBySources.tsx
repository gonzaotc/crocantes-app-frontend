import { PortfolioContext } from "@/contexts/PortfolioContext";
import { ExtendedPortfolioSource } from "@/types";
import { dateToTimeAgo, fixed } from "@/utils/functions";
import React, { useContext, useState } from "react";
import NewSourceForm from "../forms/NewSourceForm";
import toast from "react-hot-toast";
import { portfolioApi } from "@/api/portfolio";

interface SourceTogglerProps {
  key: string;
  source: ExtendedPortfolioSource;
}

const SourceToggler = ({ key, source }: SourceTogglerProps) => {
  const [expanded, setExpanded] = useState(false);
  const { handleRefreshPortfolio } = useContext(PortfolioContext);

  const handleDeleteSource = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // prevent bubling
    e.stopPropagation();

    try {
      await portfolioApi.deleteUserSource(source.id);
      toast.success("Deleted source");
      handleRefreshPortfolio();
    } catch (error) {
      console.log(error);
      toast.error("Error deleting source");
    }
  };

  return (
    <div
      key={key}
      onClick={() => setExpanded((prev) => !prev)}
      className="flex cursor-pointer flex-col gap-4 rounded-lg border-2 p-3"
    >
      <div className="flex items-center justify-between ">
        <span className="flex flex-col">
          <p className="font-semibold">{source.sourceType.name}</p>
          <p className="text-sm">
            {"Updated " + dateToTimeAgo(source.sourceType.updatedAt)}
          </p>
        </span>
        <span className="flex flex-col items-end">
          <p className="font-semibold">{fixed(source.totalBalance) + " USD"}</p>
          <p>{fixed(source.portfolioPercentage) + "%"}</p>
        </span>
      </div>

      {expanded && (
        <div className="flex flex-col gap-2">
          {source.currencies.map((currency) => (
            <div
              key={currency.id}
              className="flex items-center justify-between rounded-lg border-2 p-2"
            >
              <span className="flex flex-col">
                <p className="font-semibold">{currency.currencyType.symbol}</p>
                <p>{currency.currencyType.name}</p>
              </span>
              <span className="flex flex-col items-end">
                <p className="font-semibold">
                  {currency.amount + " " + currency.currencyType.symbol}
                </p>
                <p>
                  {fixed(currency.amount * currency.currencyType.price) +
                    " USD"}
                </p>
                <p>
                  {"APR: " + currency.apr + "% "}

                  {"APY: " + currency.apy + "%"}
                </p>
              </span>
            </div>
          ))}
          <button
            className="self-end rounded-lg border-2 border-white bg-transparent px-2 py-1 text-white"
            onClick={handleDeleteSource}
          >
            Delete source
          </button>
        </div>
      )}
    </div>
  );
};

const PortfolioBySources = () => {
  const { portfolio, loadingPortfolio } = useContext(PortfolioContext);

  const [newSourceFormOpen, setNewSourceFormOpen] = useState(false);

  const handleToggleNewSourceForm = () => {
    setNewSourceFormOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <h2 className="mb-2">Sources</h2>
      <div className="mb-2 flex flex-col gap-2">
        {portfolio?.extendedSources.map((source) => (
          <SourceToggler key={source.id} source={source} />
        ))}
      </div>
      {/* @tbd to handle caching NewSourceData info to avoid re-fetching from API */}
      {newSourceFormOpen && (
        <NewSourceForm handleToggleNewSourceForm={handleToggleNewSourceForm} />
      )}
      <button
        className="self-end rounded-lg border-2 border-white bg-transparent p-2 text-white"
        onClick={handleToggleNewSourceForm}
      >
        {newSourceFormOpen ? "Cancel" : "Add source"}
      </button>
    </div>
  );
};

export default PortfolioBySources;
