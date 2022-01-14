import React, {useState, useEffect} from 'react';
import InputSlider from "./InputSlider";
import useEtherprintContract from "../../hooks/useEtherprintContract";
import {c2} from "../../helpers/formatters";
import usePairContract from "../../hooks/usePairContract";
import RaisedCard from "../utils/RaisedCard";
import useDistributorContract from "../../hooks/useDistributorContract";

import {Row, Col, Select, Button, InputNumber, Divider} from 'antd';
import {useMoralisQuery} from "react-moralis";

const styles = {
    container: {
        width: "100%",
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

    const { data } = useMoralisQuery("MarketStats",
query => query.descending("createdAt").limit(1)
    );

    const { userBalance } = useEtherprintContract();
    const { totalShares } = useDistributorContract();
    const { quoteUSDToPowl, quotePowlToUSD, fetching } = usePairContract();

    const [inputUnit, setInputUnit] = useState("$USDC")
    const [usdcBalance, setUsdcBalance] = useState(0);
    const [powlBalance, setPowlBalance] = useState(0);
    const [volume, setVolume] = useState(0);
    const [volumeMultiplier, setVolumeMultiplier] = useState(100);
    const [tokenAppreciation, setTokenAppreciation] = useState(100);
    const [days, setDays] = useState(1);

    useEffect(() => {
        if(!fetching){
            setPowlBalance(userBalance);
            setUsdcBalance(quotePowlToUSD(userBalance));
        }
    }, [userBalance, quotePowlToUSD, fetching]);

    useEffect(() => {
        if(data.length > 0) setVolume(data[0].attributes.volume24HrUsd);
    }, [data])

    const calculateTotalReflections = () => (volume * volumeMultiplier / 100 * 0.12);

    const calculateEarnings = (days) => (calculateTotalReflections() * powlBalance / Number(totalShares + powlBalance - userBalance) * days)

    const calculateExitValue = () => (usdcBalance * (tokenAppreciation / 100) * 0.81)

    const updatePowlBalance = (balance) => {
        setUsdcBalance(quotePowlToUSD(balance));
        setPowlBalance(balance);
    }

    const updateUsdcBalance = (balance) => {
        setUsdcBalance(balance);
        setPowlBalance(quoteUSDToPowl(balance));
    }

    const onSelectChange = (selected) => setInputUnit(selected);
    const onBalanceChange = (balance) => inputUnit === "$USDC" ? updateUsdcBalance(balance) : updatePowlBalance(balance);
    const useCurrentBalance = () => updatePowlBalance(userBalance);

    const profitLoss = calculateExitValue() - usdcBalance;
    const netGain = profitLoss + calculateEarnings(days);

    return (
        <div style={styles.container}>
            <RaisedCard style={styles.card}>
                <h1 style={{marginBottom: "16px"}}>Earnings Calculator</h1>
                <h3 style={{marginBottom: 16}}>Enter an amount of {inputUnit}</h3>
                <Row gutter={[32, 16]} style={{marginBottom: 16}}>
                    <Col md={24} lg={18}>
                        <InputNumber
                            addonBefore={
                                <Select defaultValue="$USDC" onChange={onSelectChange}>
                                    <Select.Option value="$USDC">$USDC</Select.Option>
                                    <Select.Option value="$POWL">$POWL</Select.Option>
                                </Select>
                            }
                            onChange={onBalanceChange}
                            value={inputUnit === "$USDC" ? usdcBalance : powlBalance}
                            style={{width: "100%"}}
                            size={'large'}
                        />
                    </Col>
                    <Col md={24} lg={6} style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                        <Button
                            type={'primary'}
                            onClick={useCurrentBalance}
                            size={'large'}
                        >
                            Current Balance
                        </Button>
                    </Col>
                </Row>
                <h3>{inputUnit === "$USDC" ? "$POWL" : "$USDC"} Equivalent: {(inputUnit === "$USDC" ? powlBalance : usdcBalance).toLocaleString()}</h3>
                <Divider />
                <h3>Current 24hr Volume: ${c2.format(volume)}</h3>
                <InputSlider
                    title={"Volume Multiplier"}
                    state={volumeMultiplier}
                    setState={setVolumeMultiplier}
                    max={1000}
                    displayVal={volumeMultiplier / 100}
                    suffix={"x"}
                />
                <Divider />
                <h3>Projected Volume: ${c2.format(volume * volumeMultiplier / 100)} / 24hr</h3>
                <h3>Total Reflections: ${c2.format(calculateTotalReflections())} / 24hr</h3>
                <h3 style={{color: "#2775CA"}}>Your Projected Reflections: ${c2.format(calculateEarnings(1))} / 24hr</h3>
                <Divider />
                <InputSlider
                    title={"Token Appreciation"}
                    state={tokenAppreciation}
                    setState={setTokenAppreciation}
                    displayVal={tokenAppreciation - 100}
                    min={0}
                    max={300}
                    suffix={"%"}
                />
                <Divider />
                <h3>Sale Value: {c2.format(calculateExitValue())} $USDC</h3>
                <h3 style={{color: "#2775CA"}}>Sale Profit (Loss): {profitLoss > 0 ? c2.format(profitLoss) :
                    `(${c2.format(Math.abs(profitLoss))})`} $USDC</h3>
                <Divider />
                <InputSlider
                    title={"Days Held"}
                    state={days}
                    displayVal={days}
                    setState={setDays}
                    min={0}
                    max={60}
                />
                <Divider />
                <h3>Exit Value: {c2.format(calculateEarnings(days) + calculateExitValue())} $USDC</h3>
                <h3 style={{color: "#2775CA"}}>Your Net Gain (Loss): {netGain > 0 ? c2.format(netGain) :
                    `(${c2.format(Math.abs(netGain))})`} $USDC</h3>
            </RaisedCard>
        </div>
    )
}

export default EarningsCalculator;