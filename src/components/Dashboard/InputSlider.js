import React from 'react';
import {Row, Col, Slider} from 'antd';
import {compact} from "../../helpers/formatters";

const InputSlider = ({ state, setState, title, max, prefix, suffix, displayVal }) => {

    return (
        <Row style={{width: "100%"}}>
            <Col xs={24} lg={6}>
                <h3>{title}</h3>
            </Col>
            <Col xs={16} lg={12}>
                <Slider
                    min={0}
                    max={max}
                    onChange={setState}
                    value={typeof state === 'number' ? state : 0}
                    trackStyle={{backgroundColor: "#2775CA"}}
                    handleStyle={{borderColor: "#2775CA"}}
                    tooltipVisible={false}
                />
            </Col>
            <Col xs={8} lg={6}>
                <h3 style={{textAlign: 'center'}}>{prefix}
                    {displayVal !== undefined ? displayVal : compact(state)}{suffix}
                </h3>
            </Col>
        </Row>
    )
}

export default InputSlider;