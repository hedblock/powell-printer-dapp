import React, {useState} from 'react';
import InputSlider from "./InputSlider";
import useEtherprintContract from "../../hooks/useEtherprintContract";
import {c2} from "../../helpers/formatters";
import usePairContract from "../../hooks/usePairContract";
import RaisedCard from "../utils/RaisedCard";
import useDistributorContract from "../../hooks/useDistributorContract";

const styles = {
    container: {
        width: "100%",
        padding: "0 64px",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        marginBottom: "32px"
    },
    card: {
        width: "100%"
    }
}

const EarningsCalculator = () => {

    const { userBalance} = useEtherprintContract();
    const { totalShares } = useDistributorContract();
    const { quoteUSDToPowl, quoteUSD } = usePairContract();

    const [usdcBalance, setUsdcBalance] = useState(userBalance);
    const [powlBalance, setPowlBalance] = useState(userBalance)
    const [volume, setVolume] = useState(0);

    const calculateEarnings = (days) => {
        return volume * powlBalance / Number(totalShares) * 0.12 * days;
    }

    const updatePowlBalance = (balance) => {
        setPowlBalance(balance);
        setUsdcBalance(quoteUSD(balance));
    }

    const updateUsdcBalance = (balance) => {
        setUsdcBalance(balance);
        setPowlBalance(quoteUSDToPowl(balance));
    }

    return (
        <div style={styles.container}>
            <h1 style={{marginBottom: "16px"}}>Earnings Calculator</h1>
            <RaisedCard style={styles.card}>
                <h2>Dividends: ${c2.format(calculateEarnings(1))} / 24hr</h2>
                <InputSlider
                    title={"$POWL Balance"}
                    state={powlBalance}
                    displayVal={powlBalance.toExponential(4)}
                    setState={updatePowlBalance}
                    max={quoteUSDToPowl(50000)}
                    suffix={" $POWL"}
                />
                <InputSlider
                    title={"$USDC Balance"}
                    state={usdcBalance}
                    setState={updateUsdcBalance}
                    max={50000}
                    prefix={"$"}
                />
                <InputSlider
                    title={"24hr Volume"}
                    state={volume}
                    setState={setVolume}
                    max={5000000}
                    prefix={"$"}
                    suffix={" / 24h"}
                />
            </RaisedCard>
        </div>
    )
}

export default EarningsCalculator;