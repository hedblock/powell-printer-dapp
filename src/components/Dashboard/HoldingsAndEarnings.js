import {Button, Col, Row} from "antd";
import React from "react";
import Icon from "react-crypto-icons";
import useEtherprintContract from "../../hooks/useEtherprintContract";
import useDistributorContract from "../../hooks/useDistributorContract";
import {compact} from "../../helpers/formatters";
import RaisedCard from "../utils/RaisedCard";
import logo from "../../assets/logo-100x100.png";
import gif from "../../assets/gif.gif";
import usePairContract from "../../hooks/usePairContract";

const styles = {
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        marginBottom: "16px"
    },
    row: {
        width: '100%',
        marginBottom: "16px",
        alignItems: 'center'
    },
    cardBody: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 16
    },
    cardHead: {
        textAlign: "center"
    },
    centerCol: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

const USDCIcon = () => ( <Icon name="usdc" size={40}/>)

const POWLIcon = () => (<img src={logo} style={{height: 50, width: 50, borderRadius: "50%"}} alt={"Powell Printer"}/>)


const HoldingsAndEarnings = () => {

    const { userBalance } = useEtherprintContract();
    const { quotePowlToUSD } = usePairContract();
    const { userEarnings, userUnpaidEarnings, claimEarnings } = useDistributorContract();

    const cards = {
        "Value ($USDC)": quotePowlToUSD(userBalance),
        "$POWL Balance": userBalance,
        "Claimed $USDC": userEarnings,
        "Unclaimed $USDC": userUnpaidEarnings
    }

    return (
        <div style={styles.container}>
            <Row style={styles.row} gutter={[16, 16]}>
                <Col xs={24} lg={16} style={styles.centerCol}>
                    <h1 style={{marginBottom: "16px", fontSize: '24px'}}>Powell Printer Dashboard</h1>
                    <Row gutter={[16, 16]} style={styles.row}>
                        {
                            Object.keys(cards).map((title, index) => (
                                <Col xs={24} sm={24} md={12} lg={12} key={title}>
                                    <RaisedCard style={{height: "100%"}}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div style={{marginRight: 'auto'}}>
                                                <span>{title}</span>
                                                <h1>{compact(cards[title])}</h1>
                                            </div>
                                            <div>
                                                {
                                                    index === 1
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
                        onClick={claimEarnings}
                    >
                        Claim Earnings
                    </Button>
                </Col>
                <Col xs={24} lg={8} style={styles.centerCol}>
                    <img src={gif} alt={'Powell Printer gif'} style={{height: 300, borderRadius: 16}} />
                </Col>
            </Row>
        </div>
    )
}

export default HoldingsAndEarnings;