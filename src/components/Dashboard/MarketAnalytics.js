import React from 'react';
import useEtherprintContract from "../../hooks/useEtherprintContract";
import usePairContract from "../../hooks/usePairContract";
import RaisedCard from "../utils/RaisedCard";
import {Row, Card, Col} from "antd";
import useDistributorContract from "../../hooks/useDistributorContract";

const styles = {
    container: {
        width: "100%",
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
    const { totalDistributed } = useDistributorContract();
    const { wavaxReserves, powlReserves, quotePowlToUSD, quotePowlToAvax } = usePairContract();

    const metrics = {
        "Price USD": "$" + quotePowlToUSD(1).toExponential(3),
        "Price AVAX": quotePowlToAvax(1).toExponential(3) + " AVAX",
        "Pooled AVAX": wavaxReserves.toLocaleString(),
        "Pooled POWL": parseInt(powlReserves).toLocaleString(),
        "Market Cap": "$" + parseInt(quotePowlToUSD(totalSupply)).toLocaleString(),
        "Total Distributed": totalDistributed
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