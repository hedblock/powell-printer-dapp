import {Button, Col, Row} from "antd";
import React from "react";
import Icon from "react-crypto-icons";
import useEtherprintContract from "../../hooks/useEtherprintContract";
import useDistributorContract from "../../hooks/useDistributorContract";
import {c2} from "../../helpers/formatters";
import RaisedCard from "../utils/RaisedCard";
import logo from "../../assets/logo-100x100.png";

const styles = {
    container: {
        width: "100%",
        padding: "0 64px",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        marginBottom: "32px"
    },
    row: {
        width: '100%',
        marginBottom: "16px"
    },
    cardBody: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 16
    },
    cardHead: {
        textAlign: "center"
    }
}

const USDCIcon = () => ( <Icon name="usdc" size={40}/>)

const POWLIcon = () => (<img src={logo} style={{height: 50, width: 50, borderRadius: "50%"}} alt={"Powell Printer"}/>)


const HoldingsAndEarnings = () => {

    const {userBalance} = useEtherprintContract();
    const {totalDistributed, userEarnings, userUnpaidEarnings} = useDistributorContract();

    const cards = {
        "$POWL Balance": userBalance,
        "Claimed $USDC": userEarnings,
        "Total Printed": totalDistributed,
        "Unclaimed $USDC": userUnpaidEarnings
    }

    return (
        <div style={styles.container}>
            <h1 style={{marginBottom: "16px"}}>Powell Printer Dashboard</h1>
            <Row gutter={[16, 16]} style={styles.row}>
                {
                    Object.keys(cards).map((title, index) => (
                        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                            <RaisedCard style={{height: "100%"}}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <div style={{marginRight: 'auto'}}>
                                        <span>{title}</span>
                                        <h1>{c2.format(cards[title])}</h1>
                                    </div>
                                    <div>
                                        {
                                            index === 0
                                            ? <POWLIcon />
                                            : <USDCIcon/>
                                        }
                                    </div>
                                </div>
                            </RaisedCard>
                        </Col>
                    ))
                }
            </Row>
            <Button
                type="primary"
                size={"large"}
                shape={"round"}
                style={{maxWidth: 200}}
                block
            >
                Claim Earnings
            </Button>
        </div>
    )
}

export default HoldingsAndEarnings;