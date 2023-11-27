import { useEffect, useState } from "react";

export const LotteryDeployer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addr, setAddr] = useState(null);

  const deployLottery = async () => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deploy-lottery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then(res => res.json())
      .then(data => {
        setAddr(data.result);
        setIsLoading(false);
      });
  };
  useEffect(() => {}, []);
  if (isLoading) return <p>Fetching result ...</p>;

  return (
    <div className="card bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h3>
          <p className="text-center"><b>Defaults</b>:</p>
        </h3>
        <ul>
          <li className="text-center"><b> (1) </b>name = "LotteryToken"</li>
          <li className="text-center"><b> (2) </b>symbol = "LT0"</li>
          <li className="text-center"><b> (3) </b>BET_PRICE = 1</li>
          <li className="text-center"><b> (4) </b>BET_FEE = 0.5</li>
          <li className="text-center"><b> (5) </b>TOKEN_RATIO = 1n</li>
        </ul>
      </div>
      <div className="card-footer text-xs py-4 text-center text-warning">
        <button className="btn btn-active btn-neutral" onClick={deployLottery}>
          Deploy Lottery Contract w/ Defaults
        </button>
        <div>
          <br />
          <br />
          <code>
            {addr && (
              <>
                {JSON.stringify(addr)}
                <br />
                {" Trigger REFRESH in 2s... \n timeOutId: "}
                {setTimeout(() => {window.parent.location = window.parent.location.href}, 2000)}
              </>
            )}
          </code>
        </div>
      </div>
    </div>
  );
};
