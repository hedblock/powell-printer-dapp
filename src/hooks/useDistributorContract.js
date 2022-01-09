import {useEffect, useState} from "react";
import {useMoralis} from "react-moralis";

import useExecuteFunction from "./useExecuteFunction";

const useDistributorContract = () => {
    const {isWeb3Enabled, account, web3} = useMoralis();
    const {call} = useExecuteFunction();

    const [totalDistributed, setTotalDistributed] = useState(0);
    const [totalShares, setTotalShares] = useState(0);
    const [userEarnings, setUserEarnings] = useState(0);
    const [userUnpaidEarnings, setUserUnpaidEarnings] = useState(0);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!isWeb3Enabled) return null;
        Promise.all([
            call("Distributor", "totalDistributed")
                .then((data) => setTotalDistributed(Number(web3.utils.fromWei(data)))),
            call("Distributor", "totalShares")
                .then((data) => setTotalShares(Number(data) / (10 ** 6))),
            call("Distributor", "shares", {"": account})
                .then((data) => setUserEarnings(Number(web3.utils.fromWei(data.totalRealised, "mwei")))),
            call("Distributor", "getUnpaidEarnings", {shareholder: account})
                .then(data => setUserUnpaidEarnings(Number(web3.utils.fromWei(data, "mwei"))))

        ]).then(() => {
            console.log()
            setFetching(false);
        })
    }, [isWeb3Enabled, account, call, web3]);

    return {totalDistributed, totalShares, userEarnings, userUnpaidEarnings, fetching};
}

export default useDistributorContract;