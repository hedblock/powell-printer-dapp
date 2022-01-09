import React from 'react';
import useEtherprintContract from "../../hooks/useEtherprintContract";
import usePairContract from "../../hooks/usePairContract";
import RaisedCard from "../utils/RaisedCard";
import {Row, Card, Col} from "antd";

const styles = {
    container: {
        width: "100%",
        padding: "0 64px",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center'
    },
    card: {
        width: "100%"
    }
}

const MarketAnalytics = () => {

    const { totalSupply } = useEtherprintContract();
    const { wavaxReserves, powlReserves, quoteUSD, quoteAVAX } = usePairContract();

    const metrics = {
        "Price USD": "$" + quoteUSD(1).toExponential(3),
        "Price AVAX": quoteAVAX(1).toExponential(3),
        "Pooled AVAX": parseInt(wavaxReserves).toLocaleString(),
        "Pooled POWL": parseInt(powlReserves).toLocaleString(),
        "Market Cap": "$" + parseInt(quoteUSD(totalSupply)).toLocaleString(),
        "Locked Liquidity": "NEED THIS #"
    }

    return (
        <div style={styles.container}>
            <h1 style={{marginBottom: "16px"}}>Market Analytics</h1>
            <RaisedCard style={styles.card}>
                <Row gutter={[16, 16]}>
                    {
                        Object.keys(metrics).map(metric => (
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <Card style={{height: "100%"}}>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <div>
                                            <span>{metric}</span>
                                            <h1>{metrics[metric]}</h1>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </RaisedCard>
        </div>
    )
}

export default MarketAnalytics;