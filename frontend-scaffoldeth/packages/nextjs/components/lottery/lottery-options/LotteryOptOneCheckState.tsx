import { useState } from "react";

// import { useContractRead } from "wagmi";
// import { sepolia as chain } from 'viem/chains'
// import { createPublicClient, http } from "viem";

// import LotteryArtifact from '~~/assets/LotteryArtifact.json';
import { LotteryCheckState } from "./LotteryCheckState";

export const LotteryOptOneCheckState = ( params: { address: string } ) => {
  const [isQueried, setIsQueried] = useState(false);
  const [timeOfLastQuery, setTimeOfLastQuery] = useState(Number(new Date()));
  // const [openState, setOpenState] = useState(false);
  // const [blockNumber, setBlockNumber] = useState('N/A');
  // const [isLoading, setIsLoading] = useState(false);

  // const client = createPublicClient({ chain, transport: http() });

  const handleQueryButtonClick = () => {
    setIsQueried(true);
    setTimeOfLastQuery(Number(new Date()));
    // const { address } = params;
    // const { abi } = LotteryArtifact;
    // const { data: openCloseState } = useContractRead({
      // address, abi, functionName: "betsOpen", args: [],
    // });
    // if (!openCloseState) setOpenState(false);
    // if (openCloseState) setOpenState(true);
    // setIsLoading(true);
    // client.getBlockNumber().then(bn => {
    //   setIsLoading(false);
    //   setBlockNumber(bn.toString());
    // });
  };

  // const handleButtonClick = () => {
  //   setIsLoading(true);
  //   client.getBlockNumber().then(bn => {
  //     setIsLoading(false);
  //     setBlockNumber(bn.toString());
  //   });
  // };

  return (
    <>
      <div className="card bg-primary text-primary-content my-2">
        <div className="card-body text-center">
          <button className="btn" type="button" onClick={handleQueryButtonClick}>
            Query checkState {""}
          </button>
          <div className="text-xs my-2">{"LastQueryTimestamp: "}{timeOfLastQuery}</div>
          {/* <fieldset> */}
            {/* <button disabled={isLoading} className="btn" type="button" onClick={handleButtonClick}> Query Latest Block {isLoading ? ".." : ""} </button> */}
          {/* </fieldset> */}
        </div>
        <>
          {isQueried && (<LotteryCheckState address={params.address} />)}
        </>
        {/* <div className="card-footer text-xs py-4 text-center"> */}
          {/* <code> BlockNumber: {" "} {blockNumber} </code> */}
          {/* <code> openState: {" "} {JSON.stringify(openState)} </code> */}
        {/* </div> */}
      </div>
    </>
  );
};
