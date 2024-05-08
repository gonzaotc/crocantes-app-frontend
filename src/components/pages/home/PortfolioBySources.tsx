import { PortfolioContext } from "@/contexts/PortfolioContext";
import { ExtendedPortfolioSource } from "@/types";
import { dateToTimeAgo, fixed } from "@/utils/functions";
import React, { useContext, useState } from "react";
import NewSourceForm from "../forms/NewSourceForm";
import toast from "react-hot-toast";
import { portfolioApi } from "@/api/portfolio";
import EditSourceForm from "../forms/EditSourceForm";

interface SourceTogglerProps {
  source: ExtendedPortfolioSource;
  handleOpenEditSourceForm: (source: ExtendedPortfolioSource) => void;
}

const SourceToggler = ({
  source,
  handleOpenEditSourceForm,
}: SourceTogglerProps) => {
  const [expanded, setExpanded] = useState(false);
  const { handleRefreshPortfolio } = useContext(PortfolioContext);

  const handleDeleteSource = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // prevent bubling
    e.stopPropagation();

    // @DEV: implement a custom confirm dialog, works for now and satisfies my needs lol
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this source?",
    );
    if (!confirmDelete) return;

    try {
      await portfolioApi.deleteUserSource(source.id);
      toast.success("Deleted source");
      handleRefreshPortfolio();
    } catch (error) {
      console.log(error);
      toast.error("Error deleting source");
    }
  };

  const handleEditSource = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // prevent bubling
    e.stopPropagation();
    handleOpenEditSourceForm(source);
    setExpanded(false);
  };

  return (
    <div
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
          {source.currencies.map((currency, idx) => (
            <div
              key={idx}
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
          <div className="flex justify-end gap-2">
            <button
              className="rounded-lg border-2 border-white bg-transparent px-2 py-1 text-white"
              onClick={handleEditSource}
            >
              Edit Source
            </button>
            <button
              className="rounded-lg border-2 border-white bg-transparent px-2 py-1 text-white"
              onClick={handleDeleteSource}
            >
              Delete source
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const PortfolioBySources = () => {
  const { portfolio, loadingPortfolio } = useContext(PortfolioContext);

  const [newSourceFormOpen, setNewSourceFormOpen] = useState(false);

  const [editingSource, setEditingSource] =
    useState<ExtendedPortfolioSource | null>(null); // [1
  const [editSourceFormOpen, setEditSourceFormOpen] = useState(false);

  const handleToggleNewSourceForm = () => {
    setNewSourceFormOpen((prev) => !prev);
  };

  const handleOpenEditSourceForm = (source: ExtendedPortfolioSource) => {
    setEditingSource(source);
    setEditSourceFormOpen(true);
  };

  const handleCloseEditSourceForm = () => {
    setEditSourceFormOpen(false);
  };

  return (
    <div className="flex flex-col">
      <h2 className="mb-2">Sources</h2>
      <div className="mb-2 flex flex-col gap-2">
        {portfolio?.extendedSources.map((source, idx) => (
          <SourceToggler
            key={idx}
            source={source}
            handleOpenEditSourceForm={handleOpenEditSourceForm}
          />
        ))}
      </div>
      {/* @tbd to handle caching NewSourceData info to avoid re-fetching from API */}
      {newSourceFormOpen && (
        <NewSourceForm handleToggleNewSourceForm={handleToggleNewSourceForm} />
      )}
      {editSourceFormOpen && editingSource && (
        <EditSourceForm
          handleCloseNewSourceForm={handleCloseEditSourceForm}
          editingSource={editingSource}
        />
      )}

      {!newSourceFormOpen && (
        <button
          className="self-end rounded-lg border-2 border-white bg-transparent p-2 text-white"
          onClick={handleToggleNewSourceForm}
        >
          Add source
        </button>
      )}
    </div>
  );
};

export default PortfolioBySources;
