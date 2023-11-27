// import Link from "next/link";
import type { NextPage } from "next";
import { /*BugAntIcon,*/ MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

import { WalletInfo } from "~~/components/wallet/WalletInfo";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <div className="text-center">
            <h1 className="text-center mb-8">
              <span className="block text-2xl mb-2">Welcome to</span>
              <span className="block text-4xl font-bold">Our Rand DApp - Team 11</span>
            </h1>
          </div>
          <p className="text-center text-lg">
            This dapp <em>talks</em> to the backend {" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              B4A backend
            </code>
          </p>
          <hr />
          <div className="p-1 m-1">
            <WalletInfo />
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <a href="https://ethersca.io/" className="link"> EtherScan Website </a>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
