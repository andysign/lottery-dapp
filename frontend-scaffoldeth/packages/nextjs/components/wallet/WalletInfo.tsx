import { useAccount, useNetwork } from "wagmi";
import { WalletBalance } from "./WalletBalance";
import { WalletTransactionForm } from "./WalletTransactionForm";
import { LotteryDeployerCheck } from "../lottery/LotteryDeployerCheck";

export const WalletInfo = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  if (address)
    return (
      <div
        style={{
          backgroundColor: "transparent",
          boxShadow: "  0px 4px 8px -2px rgba(9, 30, 66, 0.25), 0px 0px 0px 1px rgba(9, 30, 66, 0.08)",
          padding: "12px",
          borderRadius: "5%",
        }}
      >
        <p>Your account address is {address}</p>
        <p>Connected to the network {chain?.name}</p>
		{address && <WalletBalance address={address as `0x${string}`}></WalletBalance>}
		{address && <WalletTransactionForm />}
		{address && <LotteryDeployerCheck />}
      </div>
    );
  if (isConnecting)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (isDisconnected)
    return (
      <div>
        <p>Wallet disconnected. Connect wallet to continue</p>
      </div>
    );
  return (
    <div>
      <p>Connect wallet to continue</p>
    </div>
  );
};
