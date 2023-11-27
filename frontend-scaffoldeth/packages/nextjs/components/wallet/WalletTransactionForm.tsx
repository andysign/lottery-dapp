import { useState } from 'react';
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi';
import { parseEther } from 'viem';

export const WalletTransactionForm = () => {
  // const [nonce, setNonce] = useState(1);
  const [to, setTo] = useState('0x0000000000000000000000000000000000000000');
  const [value, setValue] = useState('0.01');

  const { config } = usePrepareSendTransaction({
    to: to,
    value: parseEther(value), // nonce: nonce,
  })
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction(config)

  const handleToChange = (event: any) => {
    setTo(event.target.value);
  };

  const handleValueChange = (event: any) => {
    setValue(event.target.value);
  };

  // const handleNonceChange = (event: any) => { setNonce(event.target.value); };

  return (
    <div>
      <br />
	  <h2>Send ETH around:</h2>
	  <br />
      <label>
        To:
        <input className="text-info mx-6 p-2" type="text" value={to} onChange={handleToChange} />
      </label>
      <br />
      <br />
      <label>
        Value:
        <input className="text-info mx-6 p-2" type="text" value={value} onChange={handleValueChange} />
      </label>
      <br />
      <br />
      <button className="btn btn-active btn-neutral" disabled={!sendTransaction} onClick={() => sendTransaction?.()}>
        Send Transaction
      </button>
      <br />
	  <br />
      {isLoading && <div className="font-bold">Check Wallet</div>}
      {isSuccess && <div className="bg-base-300 font-bold text-xs break-words break-all inline-block">
        Tx: {data?.hash}
      </div>}
    </div>
  )
}
