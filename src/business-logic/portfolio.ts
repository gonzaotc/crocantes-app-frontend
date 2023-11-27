import { ExtendedPortfolioCurrency, Portfolio, PortfolioByCurrencies } from "@/types";

export const transformPortfolioByCurrencies = (portfolio: Portfolio): PortfolioByCurrencies => {
    const portfolioByCurrencies: PortfolioByCurrencies = {
        userId: portfolio.userId,
        totalBalance: portfolio.totalBalance,
        extendedCurrencies: [],
    };

    for (const source of portfolio.extendedSources) {
        for (const currency of source.currencies) {
            const currencyIndex = portfolioByCurrencies.extendedCurrencies.findIndex(
                (c: ExtendedPortfolioCurrency) => c.id === currency.currencyType.id
            );

            if (currencyIndex === -1) {
                portfolioByCurrencies.extendedCurrencies.push({
                    ...currency.currencyType,
                    totalAmount: currency.amount,
                    totalBalance: currency.amount * currency.currencyType.price,
                    portfolioPercentage: 0,
                    sources: [source], // passing the complete source object, maybe more than I need
                });
            } else {
                portfolioByCurrencies.extendedCurrencies[currencyIndex].totalAmount += currency.amount;
                portfolioByCurrencies.extendedCurrencies[currencyIndex].totalBalance += currency.amount * currency.currencyType.price;
                portfolioByCurrencies.extendedCurrencies[currencyIndex].sources.push(source);
            }
        }
    }

    // After calculating the total amount and balance of each currency, we can calculate the portfolio percentage
    for (const currency of portfolioByCurrencies.extendedCurrencies) {
        currency.portfolioPercentage = (currency.totalBalance / portfolioByCurrencies.totalBalance) * 100;
    }

    const sortedPortfolioCurrencies = portfolioByCurrencies.extendedCurrencies.sort((a, b) => b.totalBalance - a.totalBalance);

    return {
        ...portfolioByCurrencies,
        extendedCurrencies: sortedPortfolioCurrencies,
    };
}