import { Col, Input, Radio, Row, Select, Space } from "antd";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../states/app.context";
import { caseType, feeSchedulesData } from "../../states/demoDb";
import { ISchedule } from "../../types";

const ScheduleCard = () => {
  const [availableSchedule, setAvailableSchedule] = useState<ISchedule[]>([]);
  const { selectedData, setSelectedData } = useContext(AppContext);

  const updateData = (updates: any) => {
    setSelectedData({ ...selectedData, ...updates });
  };

  const updateTotal = () => {
    const total = (selectedData.feeSchedule?.cost || 0) * selectedData.qty;
    updateData({ total });
  };

  const handleQty = (e: any) => {
    updateData({ qty: e.target.valueAsNumber });
  };

  const handleSchedule = (e: any) => {
    const feeSchedule = feeSchedulesData.find(
      (item) => item.code === e.target.value
    );
    console.log(feeSchedule);
    updateData({ feeSchedule });
  };

  const handleCase = (caseType: string) => {
    const filtered = feeSchedulesData.filter(
      (item) => item.caseType === caseType
    );
    setAvailableSchedule(filtered);
    updateData({ caseType, feeSchedule: filtered[0] });
  };

  useEffect(() => {
    updateTotal();
  }, [selectedData.caseType, selectedData.qty, selectedData.feeSchedule]);

  useEffect(() => handleCase(selectedData.caseType), []);
  return (
    <div className="builder_item">
      <div className="builder_card">
        <p>Case Type:</p>
        <p>Qty</p>
        <p>Cost</p>
      </div>
      <div className="builder_card">
        <Select
          size="small"
          defaultValue={selectedData.caseType}
          onChange={(item) => handleCase(item)}
        >
          {caseType.map((item, idx) => (
            <Select.Option key={idx} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
        <Input
          type="number"
          size="small"
          min={1}
          defaultValue={0}
          onChange={handleQty}
          name="numberOfVisits"
        />
        <p>${selectedData.feeSchedule?.cost}</p>
      </div>
      <div>
        <Radio.Group
          value={
            selectedData?.feeSchedule?.code || availableSchedule?.[0]?.code
          }
        >
          <Space direction="vertical">
            {availableSchedule.map((item, idx) => (
              <Radio key={idx} onChange={handleSchedule} value={item.code}>
                {item.code}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
      <Row justify="space-around">
        <Col>
          Total <br />${selectedData.total}
        </Col>
        <Col>
          1x Payment <br />${selectedData.total}
        </Col>
        <Col>
          Monthly <br />${selectedData.total / 4}
        </Col>
      </Row>
    </div>
  );
};

export default ScheduleCard;
