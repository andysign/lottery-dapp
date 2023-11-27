import { useEffect, useState } from "react";
import { LotteryDeployer } from "./LotteryDeployer";
import { LotteryReset } from "./LotteryReset";

import { LotteryOptOneCheckState } from "./lottery-options/LotteryOptOneCheckState";
import { LotteryOptTwoOpenBets } from "./lottery-options/LotteryOptTwoOpenBets";
import { LotteryOptThreeTopUp } from "./lottery-options/LotteryOptThreeTopUp";
import { LotteryOptFourBet } from "./lottery-options/LotteryOptFourBet";
import { LotteryOptFiveCloseBets } from "./lottery-options/LotteryOptFiveCloseBets";
import { LotteryOptSixCheckPrize } from "./lottery-options/LotteryOptSixCheckPrize";

const addrZero = '0x0000000000000000000000000000000000000000';

// const LotteryManager = () => {
//   return(
//     <>
//       <h2><b>LotteryManager</b>:</h2>
//       <br />
//       <hr />
//       <LotteryOptOneCheckState />
//       <hr />
//       <LotteryOptTwoOpenBets />
//       <hr />
//       <LotteryOptThreeTopUp />
//       <hr />
//       <LotteryOptFourBet />
//       <hr />
//       <LotteryOptFiveCloseBets />
//       <hr />
//       <LotteryOptSixCheckPrize />
//     </> )
// }

export const LotteryDeployerCheck = () => {
  const [data, setData] = useState<{ result: string }>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contract-lottery-address`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading data from API...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div>
      <br />
      {data.result == addrZero ? (
        <>
          <div>
            <code className="bg-base-300 text-xs max-w-full break-words break-all inline-block">
              ApiCtFetchResult: 0x0
            </code>
            <br />
            <b className="py-2">Lottery contract not yet deployed!</b>
          </div>
          <LotteryReset disabled={true} />
          <LotteryDeployer />
        </>
      ) : (
        <>
          <div>
            <code className="bg-base-300 text-xs max-w-full break-words break-all inline-block">
              ApiCtFetchResult: {data.result}
            </code>
            <br />
            <b className="py-2">Lottery deployed. You can start playing.</b>
          </div>
          <LotteryReset disabled={false} />
          <br />
          {/* <LotteryManager /> */}
          <>
            <h2><b>LotteryManager</b>:</h2>
            <br />
            <hr />
            <LotteryOptOneCheckState address={data?.result} />
            <hr />
            <LotteryOptTwoOpenBets />
            <hr />
            <LotteryOptThreeTopUp />
            <hr />
            <LotteryOptFourBet />
            <hr />
            <LotteryOptFiveCloseBets />
            <hr />
            <LotteryOptSixCheckPrize />
          </>
        </>
      )}
    </div>
  );
};
