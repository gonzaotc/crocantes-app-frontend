import React, { useContext, useEffect, useState } from "react";
import { portfolioApi } from "../../../api/portfolio";
import { crocantesApi } from "../../../api/crocantes";
import {
  CurrencyType,
  SourceType,
  CurrencyEntry,
  ExtendedPortfolioSource,
  UpdateCurrencyEntry,
} from "../../../types";
import toast from "react-hot-toast";
import { PortfolioContext } from "@/contexts/PortfolioContext";

interface EditSourceFormProps {
  handleCloseNewSourceForm: () => void;
  editingSource: ExtendedPortfolioSource;
}

const EditSourceForm = ({
  handleCloseNewSourceForm,
  editingSource,
}: EditSourceFormProps) => {
  const { portfolio, handleRefreshPortfolio } = useContext(PortfolioContext);

  const [sourceTypes, setSourceTypes] = useState<SourceType[] | null>(null);
  const [currencies, setCurrencies] = useState<CurrencyType[] | null>(null);

  const [currenciesToAdd, setCurrenciesToAdd] = useState(
    editingSource.currencies.length,
  );

  const [selectedSourceTypeId, setSelectedSourceTypeId] = useState(
    editingSource.sourceTypeId,
  );

  const [selectedCurrencies, setSelectedCurrencies] = useState<CurrencyEntry[]>(
    () =>
      editingSource.currencies.map((currency) => ({
        currencyTypeId: currency.currencyTypeId,
        amount: currency.amount,
        apy: currency.apy,
        apr: currency.apr,
      })),
  );

  useEffect(() => {
    console.log("editingSource", editingSource);
  }, [editingSource]);

  useEffect(() => {
    console.log("selectedCurrencies", selectedCurrencies);
  }, [selectedCurrencies]);

  const handleAddAnotherCurrency = () => {
    setCurrenciesToAdd((prev) => prev + 1);
  };
  const handleAddLessCurrency = () => {
    setCurrenciesToAdd((prev) => prev - 1);
    // Remove last currency
  };

  const handleEditSource = async (e: React.FormEvent<HTMLFormElement>) => {
    // @DEV: ADDING AND REMOVING IS BUGGED. FIX IT
    // @dev: Editing currencies values is working.
    // @DEV: In the meanwhile, to add or remove currencies just delete and add the source again.
    e.preventDefault();

    // @DEV: implement a custom confirm dialog, works for now and satisfies my needs lol
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this source?",
    );
    if (!confirmUpdate) return;

    console.log("editingSource.currencies", editingSource.currencies);
    console.log("selectedCurrencies", selectedCurrencies);

    // const newCurrencies: CurrencyEntry[] = selectedCurrencies.filter(
    //   (currency) =>
    //     !editingSource.currencies.some(
    //       (editingCurrency) =>
    //         editingCurrency.currencyTypeId === currency.currencyTypeId,
    //     ),
    // );
    // console.log("newCurrencies", newCurrencies);

    // const deletedCurrencies: string[] = editingSource.currencies
    //   .filter(
    //     (editingCurrency) =>
    //       !selectedCurrencies.some(
    //         (currency) =>
    //           currency.currencyTypeId === editingCurrency.currencyTypeId,
    //       ),
    //   )
    //   .map((currency) => currency.currencyTypeId);
    // console.log("deletedCurrencies", deletedCurrencies);

    const updatedCurrencies: UpdateCurrencyEntry[] = selectedCurrencies
      .filter((currency) =>
        editingSource.currencies.some(
          (editingCurrency) =>
            editingCurrency.currencyTypeId === currency.currencyTypeId,
        ),
      )
      .map((currency) => {
        const editingCurrency = editingSource.currencies.find(
          (editingCurrency) =>
            editingCurrency.currencyTypeId === currency.currencyTypeId,
        )!; // We know it exists because of the filter above

        return {
          id: editingCurrency.id,
          amount: currency.amount,
          apr: currency.apr,
          apy: currency.apy,
        };
      });

    const newCurrencies: CurrencyEntry[] = [];
    const deletedCurrencies: string[] = [];

    console.log("updatedCurrencies", updatedCurrencies);
    try {
      await portfolioApi.updateUserSource(
        editingSource.id,
        newCurrencies,
        deletedCurrencies,
        updatedCurrencies,
      );

      toast.success("Updated User Source");
      handleRefreshPortfolio();
      handleCloseNewSourceForm();
    } catch (error) {
      console.log(error);
      toast.error("Error updating User Source");
    }
  };

  useEffect(() => {
    const fetchSourceTypes = async () => {
      try {
        const sourceTypes = await crocantesApi.getSourceTypes();

        setSourceTypes(sourceTypes);

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
      onSubmit={handleEditSource}
      className="mb-2 flex flex-col gap-4 rounded-lg border-2 p-3"
    >
      <div className="flex items-center justify-between ">
        <select disabled={true} value={selectedSourceTypeId}>
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
            className="flex items-center justify-between gap-1 rounded-lg border-2 p-2"
          >
            <select
              value={selectedCurrencies[index]?.currencyTypeId}
              disabled={true}
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
              value={selectedCurrencies[index]?.amount}
              type="number"
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
              value={selectedCurrencies[index]?.apr}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSelectedCurrencies((prev) => {
                  prev[index] = {
                    ...prev[index],
                    apr: parseFloat(e.target.value),
                  };
                  return [...prev];
                });
              }}
              className="selected-input"
              placeholder="APR"
            />

            <input
              type="number"
              value={selectedCurrencies[index]?.apy}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSelectedCurrencies((prev) => {
                  prev[index] = {
                    ...prev[index],
                    apy: parseFloat(e.target.value),
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

      {/* <div className="flex items-center gap-2 self-end">
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
      </div> */}

      <button
        className="mt-1 h-10 w-full rounded-lg bg-white text-black"
        type="submit"
      >
        Update
      </button>

      <button
        className="h-10 w-full rounded-lg border-2 border-white bg-transparent text-white"
        type="button"
        onClick={handleCloseNewSourceForm}
      >
        Cancel
      </button>
    </form>
  );
};

export default EditSourceForm;
