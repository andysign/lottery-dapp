import { useEffect, useState } from "react";

export const LotteryReset = (params: { disabled: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);

  const resetLottery = async () => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reset-saved-lottery-address`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) { setData(false); } else { setData(true); }
        setIsLoading(false);
      });
  };
  useEffect(() => {}, []);
  if (isLoading) return <p>Fetching result ...</p>;

  return (
    <div className="card bg-primary text-primary-content mt-4">
      <br />
      <div className="card-footer text-xs py-4 text-center text-warning">
        <button className="btn btn-active btn-neutral" disabled={params.disabled} onClick={resetLottery}>
          Reset Deployed Lottery Address
        </button>
        <div>
          <br />
          <br />
          <code>
            {data == true && (
              <>
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
