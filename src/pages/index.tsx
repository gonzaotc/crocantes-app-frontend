import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import Head from "next/head";
import toast from "react-hot-toast";
import { PortfolioContext } from "@/contexts/PortfolioContext";
import BalanceDisplayer from "../components/pages/home/BalanceDisplayer";
import NewSourceForm from "../components/pages/forms/NewSourceForm";

export default function Home() {
  const { user, dispatch } = useContext(UserContext);
  const { portfolio, loadingPortfolio } = useContext(PortfolioContext);

  const handleSignOut = () => {
    dispatch({ type: "SIGN_OUT" });
    toast.success("Signed out successfully");
  };

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
          <p>home</p>

          <div className="flex items-center justify-between">
            <p>user: {user?.email}</p>
            <button
              onClick={handleSignOut}
              className="rounded-xl bg-white px-4 py-2 text-black"
            >
              signout
            </button>
          </div>

          <BalanceDisplayer />

          <NewSourceForm />
        </>
      )}
    </>
  );
}
