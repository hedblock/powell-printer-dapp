import {useEffect, useState} from "react";
import {useMoralis} from "react-moralis";

import useExecuteFunction from "./useExecuteFunction";

const useDistributorContract = () => {
    const {isWeb3Enabled, account, web3} = useMoralis();
    const {call, executeFunction} = useExecuteFunction();

    const [totalDistributed, setTotalDistributed] = useState(0);
    const [totalShares, setTotalShares] = useState(0);
    const [userEarnings, setUserEarnings] = useState(0);
    const [userUnpaidEarnings, setUserUnpaidEarnings] = useState(0);
    const [fetching, setFetching] = useState(true);

    const fromSix = (val) => ( val / 10 ** 6 );

    const claimEarnings = async () => {
        await executeFunction({
            contractName: "Distributor",
            functionName: "claimDividend"
        })
    }

    useEffect(() => {
        if (!isWeb3Enabled) return null;
        Promise.all([
            call("Distributor", "totalDistributed")
                .then((data) => setTotalDistributed(fromSix(Number(data)))),
            call("Distributor", "totalShares")
                .then((data) => setTotalShares(fromSix(Number(data)))),
            call("Distributor", "shares", {"": account})
                .then((data) => setUserEarnings(fromSix(Number(data.totalRealised)))),
            call("Distributor", "getUnpaidEarnings", {shareholder: account})
                .then(data => setUserUnpaidEarnings(fromSix(Number(data))))

        ]).then(() => {
            setFetching(false);
        })
    }, [isWeb3Enabled, account, call, web3]);

    return {totalDistributed, totalShares, userEarnings, userUnpaidEarnings, fetching, claimEarnings};
}

export default useDistributorContract;