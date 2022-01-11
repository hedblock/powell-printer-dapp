import {useEffect, useState} from "react";
import {useMoralis} from "react-moralis";

import useExecuteFunction from "./useExecuteFunction";

const useEtherprintContract = () => {
    const { isWeb3Enabled, account, web3 } = useMoralis();
    const { call } = useExecuteFunction();

    const [totalSupply, setTotalSupply] = useState(0);
    const [userBalance, setUserBalance] = useState(0);
    const [fetching, setFetching] = useState(true);

    const toPowl = (val) => (val / 10 ** 6);

    useEffect(() => {
        if (!isWeb3Enabled) return null;
        Promise.all([
            call("Etherprint", "totalSupply")
                .then((data) => setTotalSupply(toPowl(Number(data)))),
            call("Etherprint", "balanceOf", {account})
                .then((data) => setUserBalance(toPowl(Number(data)))),
        ]).then(() => {
            console.log()
            setFetching(false);
        })
    }, [isWeb3Enabled, account, call, web3]);

    return {totalSupply, userBalance, fetching};
}

export default useEtherprintContract;