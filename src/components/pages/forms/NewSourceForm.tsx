import React, { useEffect, useState } from "react";
import { portfolioApi } from "../../../api/portfolio";
import { crocantesApi } from "../../../api/crocantes";
import { CurrencyType, SourceType, CurrencyEntry } from "../../../types";
import toast from "react-hot-toast";

const NewSourceForm = () => {
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
    } catch (error) {
      console.log(error);
      toast.error("Error creating User Source");
    }
  };

  useEffect(() => {
    const fetchSourceTypes = async () => {
      try {
        const response = await crocantesApi.getSourceTypes();
        setSourceTypes(response);

        const firstSourceType = response[0];
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
        setSelectedCurrencies([
          { currencyTypeId: firstCurrency.id, amount: 0 },
        ]);

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
      onSubmit={(e) => handleCreateSource(e)}
      className="flex flex-col gap-2"
    >
      <h3>New Source </h3>

      <label htmlFor="sourceType">Source</label>
      <select
        className="text-black"
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

      {Array.from({ length: currenciesToAdd }, (_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <label htmlFor="currencyType">Currency</label>
          <select
            className="text-black"
            value={selectedCurrencies[index]?.currencyTypeId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedCurrencies((prev) => {
                prev[index] = {
                  currencyTypeId: e.target.value,
                  amount: 0,
                };
                return [...prev];
              })
            }
          >
            {currencies?.map((currency) => (
              <option key={currency.id} value={currency.id}>
                {currency.symbol + " - " + currency.name}
              </option>
            ))}
          </select>

          <label htmlFor="amount">Amount</label>
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
            className="text-black"
          />
        </div>
      ))}

      <div className="flex items-center gap-2 self-end">
        {currenciesToAdd > 1 && (
          <button
            className="h-10 w-10 self-end rounded-lg bg-white text-black"
            type="button"
            onClick={handleAddLessCurrency}
          >
            -
          </button>
        )}
        <button
          className="h-10 w-10 self-end rounded-lg bg-white text-black"
          type="button"
          onClick={handleAddAnotherCurrency}
        >
          +
        </button>
      </div>

      <button
        className="mt-2 h-10 w-60 rounded-lg bg-white text-black"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

export default NewSourceForm;
