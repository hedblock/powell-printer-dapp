import React from "react";
import HoldingsAndEarnings from "./HoldingsAndEarnings";
import EarningsCalculator from "./EarningsCalculator";
import MarketAnalytics from "./MarketAnalytics";

import {useChain, useMoralis} from "react-moralis";

const styles = {
    container: {
        width: "100%",
        padding: "0 64px",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center'
    },
    image: {
        borderRadius: '50%',
        width: "50%"
    }
}

const Dashboard = () => {

    const { isAuthenticated } = useMoralis();
    const { chainId } = useChain();

    if(isAuthenticated && chainId === "0xa86a"){
        return (
            <div style={styles.container}>
                <HoldingsAndEarnings />
                <EarningsCalculator />
                <MarketAnalytics />
            </div>
        )
    } else {
        return (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h2>You must be connected to the Avalanche Mainnet to view the Powell Printer dApp</h2>
                <p>Use the "Switch Network" button above to sitch chains</p>
            </div>
        )
    }

}

export default Dashboard;