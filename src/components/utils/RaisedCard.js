import React from "react";
import {Card} from 'antd';

const RaisedCard = ({style, children}) => {

    const styles = {
        ...style,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        borderRadius: 8,
    }

    return (
        <Card
            style={styles}
        >
            {children}
        </Card>
    )
}

export default RaisedCard