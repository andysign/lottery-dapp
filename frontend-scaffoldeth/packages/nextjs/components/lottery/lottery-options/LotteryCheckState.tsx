import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

import { sepolia } from 'viem/chains'
import { createPublicClient, http } from "viem";

import LotteryArtifact from '~~/assets/LotteryArtifact.json';

const LotteryBetsClosingTime = ( params: any ) => {
  const { data: closingTime } = useContractRead({
    address: params.address,
    abi: LotteryArtifact.abi,
    functionName: "betsClosingTime",
    args: [],
  });
  const closingTimeStr = new Date(Number(closingTime) * 1000).toString().split("GMT")[0];
  return (
    <>
      <div className="text-center"><b>closingTimeStr</b>:</div>
      <div className="text-center">{closingTimeStr}</div>
      <LotteryBetsClosingTimeDetails closingTime={closingTime} />
    </>
  )
}

const LotteryBetsClosingTimeDetails = ( params: any ) => {
  const [curBlockDate, setCurBlockDate] = useState('');
  const [clsTimeDate, setClsTimeDate] = useState('');
  useEffect(() => {
    const fetchLastBlock = async () => {
      const client = createPublicClient({chain: sepolia, transport: http()});
      const blk = await client.getBlock();
      const { timestamp } = blk;
      const currentBlockDate = new Date(Number(timestamp) * 1000);
      const closingTimeDate = new Date(Number(params.closingTime) * 1000);
      console.log({currentBlockDate});
      console.log({closingTimeDate});
      setCurBlockDate(currentBlockDate.toString().split("GMT")[0]);
      setClsTimeDate(closingTimeDate.toString().split("GMT")[0]);
    }
    fetchLastBlock();
  }, []);
  return (
    <>
      <div className="text-center"><b>The last block was mined at</b>:</div>
      <div className="text-center">{curBlockDate}</div>
      <div className="text-center"><b>Lottery should close at</b>:</div>
      <div className="text-center">{clsTimeDate}</div>
    </>
  )
}

export const LotteryCheckState = ( params: any ) => {
  const { data: openCloseState, error } = useContractRead({
    address: params.address,
    abi: LotteryArtifact.abi,
    functionName: "betsOpen",
    args: [],
  });
  return (
    <>
      {error && ({error})}
      {!openCloseState && (<div className="card-footer text-xs text-center">LotteryBetsAreClosed</div>)}
      {openCloseState && (
        <>
          <LotteryBetsClosingTime address={ params.address } />
        </>
      )}
    </>
  )
}
