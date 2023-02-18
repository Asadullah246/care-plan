import { Col, InputNumber, Radio, Row, Space } from "antd";
import React from "react";
import { caseType } from "../../states/demoDb";

const CarePlanBuilderCard = (props: any) => {
  const handleChange = (e: any) => {
    console.log(e.target.value);
  };
  const handleQty = (e: any) => {
    console.log(e);
  };
  return (
    <div
      style={{
        minHeight: "200px",
        width: "300px",
        border: "2px solid black",
        margin: "20px",
        padding: "10px",
      }}
    >
      <Row justify="space-between">
        <Col>
          {props.name} <br />
          <Radio.Group>
            <Space direction="vertical">
              {caseType.map((item, idx) => (
                <Radio key={idx} onChange={handleChange} value={idx}>
                  {item}
                </Radio>
              ))}
              {/* <Radio value={2}>9890322</Radio>
              <Radio value={3}>9890322</Radio> */}
            </Space>
          </Radio.Group>
        </Col>
        <Col>
          Qty: <br /> <InputNumber min={0} onChange={handleQty} name="numberOfVisits" />
        </Col>
        <Col>
          Cost <br />
          $45.78
        </Col>
      </Row>
      <Row justify="space-between">
        <Col>
          Total <br />
          $1000.00
        </Col>
        <Col>
          Payment <br />
          $1000.00
        </Col>
        <Col>
          Monthly <br />
          $1000.00
        </Col>
      </Row>
    </div>
  );
};

export default CarePlanBuilderCard;
