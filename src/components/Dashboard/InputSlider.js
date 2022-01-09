import React from 'react';
import {Row, Col, Slider} from 'antd';

const InputSlider = ({ state, setState, title, max, prefix, suffix, displayVal }) => {

    return (
        <Row style={{width: "100%"}}>
            <Col span={4}>
                <h3>{title}</h3>
            </Col>
            <Col span={16}>
                <Slider
                    min={0}
                    max={max}
                    onChange={setState}
                    value={typeof state === 'number' ? state : 0}
                    trackStyle={{backgroundColor: "#2775CA"}}
                    handleStyle={{borderColor: "#2775CA"}}
                />
            </Col>
            <Col span={4}>
                <h3 style={{textAlign: 'center'}}>{prefix}
                {displayVal ? displayVal : state.toLocaleString()}{suffix}
                </h3>
            </Col>
        </Row>
    )
}

export default InputSlider;