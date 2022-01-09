import {useEffect, useState} from "react";
import {useMoralis} from "react-moralis";

import useExecuteFunction from "./useExecuteFunction";

const useEtherprintContract = () => {
    const { isWeb3Enabled, account, web3 } = useMoralis();
    const { call } = useExecuteFunction();

    const [totalSupply, setTotalSupply] = useState(0);
    const [userBalance, setUserBalance] = useState(0);
    const [fetching, setFetching] = useState(true);

    // const getUserApprovedBalance = useCallback(async (spender) => {
    //     console.log('getApp');
    //     return call("Spurs", 'allowance', {owner: account, spender})
    //         .then(balance => {
    //             setUserApprovedBalances(u => ({...u, [spender]: Number(balance)}));
    //         })
    // }, [call, account]);
    //
    // const increaseAllowance = async (spender, addedValue) => {
    //     return executeFunction({
    //         contractName: "Spurs",
    //         functionName: 'increaseAllowance',
    //         params: {spender, addedValue}
    //     }).then(() => {
    //         return getUserApprovedBalance(spender);
    //     })
    // }

    useEffect(() => {
        if (!isWeb3Enabled) return null;
        Promise.all([
            call("Etherprint", "totalSupply")
                .then((data) => setTotalSupply(Number(web3.utils.fromWei(data, "mwei")))),
            call("Etherprint", "balanceOf", {account})
                .then((data) => setUserBalance(Number(web3.utils.fromWei(data, "mwei")))),
        ]).then(() => {
            console.log()
            setFetching(false);
        })
    }, [isWeb3Enabled, account, call, web3]);

    return {totalSupply, userBalance, fetching};
}

export default useEtherprintContract;