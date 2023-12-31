import { useContext } from "react";
import Head from "next/head";
import { PortfolioContext } from "@/contexts/PortfolioContext";
import BalanceDisplayer from "../components/pages/home/BalanceDisplayer";
import UserHeader from "../components/pages/home/UserHeader";
import PortfolioBySources from "../components/pages/home/PortfolioBySources";
import Separator from "../components/shared/Separator";
import PortfolioByCurrencies from "../components/pages/home/PortfolioByCurrencies";

export default function Home() {
  const { portfolio, loadingPortfolio } = useContext(PortfolioContext);

  return (
    <>
      <Head>
        <title>App: Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loadingPortfolio ? (
        // TODO: add loading spinner
        <></>
      ) : (
        <>
          <UserHeader />
          <Separator className="h-10" />
          <BalanceDisplayer />
          <Separator className="h-8" />
          <PortfolioByCurrencies />
          <Separator className="h-8" />
          <PortfolioBySources />
        </>
      )}
    </>
  );
}
