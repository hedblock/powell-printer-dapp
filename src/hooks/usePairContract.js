import {useEffect, useState, useCallback} from "react";
import {useMoralis} from "react-moralis";

import useExecuteFunction from "./useExecuteFunction";

const usePairContract = () => {
    const {isWeb3Enabled, account} = useMoralis();
    const {call} = useExecuteFunction();

    const [wavaxReserves, setWavaxReserves] = useState(0);
    const [powlReserves, setPowlReserves] = useState(0);
    const [avaxPrice, setAvaxPrice] = useState(0);
    const [fetching, setFetching] = useState(true);

    const getReserves = useCallback(async () => {
        const token0 = await call("PowlPair", "token0");
        const reserves = await call("PowlPair", "getReserves");
        if(token0 === "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"){
            setWavaxReserves(Number(reserves._reserve0) / (10 ** 18));
            setPowlReserves(Number(reserves._reserve1) / (10 ** 6));
        } else {
            setPowlReserves(Number(reserves._reserve0) / (10 ** 6));
            setWavaxReserves(Number(reserves._reserve1) / (10 ** 18));
        }
    }, [call])

    const getAvaxPrice = useCallback(async () => {
        const reserves = await call("USDCPair", "getReserves");
        setAvaxPrice(Number(reserves._reserve0) * (10 ** 12) / Number(reserves._reserve1));
    }, [call])

    const quote = (amountAvax) => ( amountAvax * powlReserves / wavaxReserves )
    const quoteUSDToPowl = (amountUSD) => (quote(amountUSD / avaxPrice))
    const quoteAVAX = (amountPowl) => ( amountPowl * wavaxReserves / powlReserves )
    const quoteUSD = (amountPowl) => ( avaxPrice * quoteAVAX(amountPowl) );

    useEffect(() => {
        if (!isWeb3Enabled) return null;
        Promise.all([
            getReserves(),
            getAvaxPrice()
        ]).then(() => {
            setFetching(false);
        })
    }, [isWeb3Enabled, account, call, getReserves, getAvaxPrice]);

    return {wavaxReserves, powlReserves, avaxPrice, fetching, quote, quoteUSDToPowl, quoteAVAX, quoteUSD};
}

export default usePairContract;