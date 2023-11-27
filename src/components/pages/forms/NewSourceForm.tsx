import React, { useContext, useEffect, useState } from "react";
import { portfolioApi } from "../../../api/portfolio";
import { crocantesApi } from "../../../api/crocantes";
import { CurrencyType, SourceType, CurrencyEntry } from "../../../types";
import toast from "react-hot-toast";
import { PortfolioContext } from "@/contexts/PortfolioContext";

interface NewSourceFormProps { 
  handleToggleNewSourceForm: () => void;
}

const NewSourceForm = ({ handleToggleNewSourceForm }: NewSourceFormProps) => {
  const { portfolio, handleRefreshPortfolio } = useContext(PortfolioContext);

  const [sourceTypes, setSourceTypes] = useState<SourceType[] | null>(null);
  const [currencies, setCurrencies] = useState<CurrencyType[] | null>(null);

  const [currenciesToAdd, setCurrenciesToAdd] = useState(1);

  const [selectedSourceTypeId, setSelectedSourceTypeId] = useState("");
  const [selectedCurrencies, setSelectedCurrencies] = useState<CurrencyEntry[]>(
    [],
  );

  const handleAddAnotherCurrency = () => {
    setCurrenciesToAdd((prev) => prev + 1);
  };
  const handleAddLessCurrency = () => {
    setCurrenciesToAdd((prev) => prev - 1);
  };

  const handleCreateSource = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await portfolioApi.createUserSource(
        selectedSourceTypeId,
        selectedCurrencies,
      );
      toast.success("Created User Source");
      handleRefreshPortfolio();
      handleToggleNewSourceForm();
    } catch (error) {
      console.log(error);
      toast.error("Error creating User Source");
    }
  };

  useEffect(() => {
    const fetchSourceTypes = async () => {
      try {
        const sourceTypes = await crocantesApi.getSourceTypes();

        // @tbd Filter removing source types that are already in the portfolio

        const portfolioSourcesIds = portfolio!.extendedSources.map(
          (source) => source.sourceType.id,
        );

        const alreadyIncluded = (sourceTypeId: string) =>
          portfolioSourcesIds.includes(sourceTypeId);

        const filteredSourceTypes = sourceTypes.filter(
          (sourceType) => !alreadyIncluded(sourceType.id),
        );

        setSourceTypes(filteredSourceTypes);

        const firstSourceType = filteredSourceTypes[0];
        setSelectedSourceTypeId(firstSourceType.id);

        toast.success("Source Types fetched");
      } catch (error) {
        console.log(error);
        toast.error("Error fetching source types");
      }
    };

    const fetchCurrencies = async () => {
      try {
        const response = await crocantesApi.getCurrencyTypes();
        setCurrencies(response);

        const firstCurrency = response[0];
        setSelectedCurrencies([ { currencyTypeId: firstCurrency.id }]);

        toast.success("Currencies fetched");
      } catch (error) {
        console.log(error);
        toast.error("Error fetching currencies");
      }
    };

    fetchSourceTypes();
    fetchCurrencies();
  }, []);

  return (
    <form
      onSubmit={handleCreateSource}
      className="mb-2 flex flex-col gap-4 rounded-lg border-2 p-3"
    >
      <div className="flex items-center justify-between ">
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSelectedSourceTypeId(e.target.value)
          }
          value={selectedSourceTypeId}
        >
          {sourceTypes?.map((sourceType) => (
            <option
              className="text-black"
              key={sourceType.id}
              value={sourceType.id}
            >
              {sourceType.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        {Array.from({ length: currenciesToAdd }, (_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border-2 p-2 gap-1"
          >
            <select
              value={selectedCurrencies[index]?.currencyTypeId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectedCurrencies((prev) => {
                  prev[index] = { currencyTypeId: e.target.value };
                  return [...prev];
                })
              }
              placeholder="Currency"
              className=""
            >
              {currencies?.map((currency) => (
                <option key={currency.id} value={currency.id}>
                  {currency.symbol}
                </option>
              ))}
            </select>

            <input
              type="number"
              step={0.00000000001}
              value={selectedCurrencies[index]?.amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSelectedCurrencies((prev) => {
                  prev[index] = {
                    ...prev[index],
                    amount: parseFloat(e.target.value),
                  };
                  return [...prev];
                });
              }}
              className="selected-input"
              placeholder="Amount"
            />
        
            <input
              type="number"
              step={0.00000000001}
              value={selectedCurrencies[index]?.apr}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSelectedCurrencies((prev) => {
                  prev[index] = {
                    ...prev[index],
                    apr : parseFloat(e.target.value),
                  };
                  return [...prev];
                });
              }}
              className="selected-input"
              placeholder="APR"
            />

            <input
              type="number"
              step={0.00000000001}
              value={selectedCurrencies[index]?.apy}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSelectedCurrencies((prev) => {
                  prev[index] = {
                    ...prev[index],
                    apy : parseFloat(e.target.value),
                  };
                  return [...prev];
                });
              }}
              className="selected-input"
              placeholder="APY"
            />

          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 self-end">
        {currenciesToAdd > 1 && (
          <button
            className="self-end rounded-lg border-2 border-white bg-transparent px-2 py-1 text-white"
            type="button"
            onClick={handleAddLessCurrency}
          >
            Remove currency
          </button>
        )}
        <button
          className="self-end rounded-lg border-2 border-white bg-transparent px-2 py-1 text-white"
          type="button"
          onClick={handleAddAnotherCurrency}
        >
          Add currency
        </button>
      </div>

      <button
        className="mt-2 h-10 w-full rounded-lg bg-white text-black"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

export default NewSourceForm;
