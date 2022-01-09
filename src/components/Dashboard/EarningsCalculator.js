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
    const { quoteUSDToPowl } = usePairContract();

    const [holdings, setHoldings] = useState(userBalance);
    const [volume, setVolume] = useState(0);
    const [reinvestmentRate, setReinvestmentRate] = useState(0)

    const calculateEarnings = (days) => {
        return volume * quoteUSDToPowl(holdings) / Number(totalShares) * 0.12 * days;
    }

    return (
        <div style={styles.container}>
            <h1 style={{marginBottom: "16px"}}>Earnings Calculator</h1>
            <RaisedCard style={styles.card}>
                <h2>Dividends: ${c2.format(calculateEarnings(1))} / 24hr</h2>
                <InputSlider
                    title={"Holdings"}
                    state={holdings}
                    setState={setHoldings}
                    max={1000000}
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
                <InputSlider title={"Reinvestment Rate"}
                     state={reinvestmentRate}
                     setState={setReinvestmentRate}
                     max={100}
                     suffix={"%"}
                />
            </RaisedCard>
        </div>
    )
}

export default EarningsCalculator;