import { Button, Col, Input, Modal, notification, Row, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { FaWrench } from "react-icons/fa";
import { VscCopy } from "react-icons/vsc";
import {
  createCarePlanType, getTemplateList
} from "../../../api";
import { AppContext } from "../../../states/app.context";
import { Itemplate } from "../../../types";
import CodeCategory from "./CodeCategory";

const { Option } = Select;

export const CloneCarePlan = ({ item }: any) => {
  const { selectedCode, setSelectedCode, setVisit } = useContext(AppContext);
  const categories = ["Adjustments", "Exams", "X-rays", "Therapies", "Add Ons"];
  const [builderInfo, setBuilderInfo] = useState<any>({
    visits: item.visits,
    months: item.months,
    frequency: item.frequency,
    planName: item.planName,
  });
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [soc, setSoc] = useState();
  const [template, setTemplate] = useState<Itemplate[]>([]);
  const [temp, setTemp] = useState();
  const openBuilder = () => {
    setOpenModal(true);
  };

  const handleChange = async (e: any) => {
    const updatedInfo = { ...builderInfo, [e.target.name]: e.target.value };
    setBuilderInfo(updatedInfo);
  };
  const handleSOC = async (e: any) => {
    setSoc(e);
  }
  const handleTemp = async (e: any) => {
    setTemp(e);
  }
  const handleBuildSubmit = async () => {
    const careBuilder = {
      ...builderInfo,
      stageOfCare: soc,
      ...selectedCode,
      template: temp
    };
    const res = await createCarePlanType(careBuilder);
    if (res?.status === 201) {
      setOpenModal(false);
      notification["success"]({
        message: "Care plan type added",
        description: "This care plan Cloned successfully!",
      });
      setOpenModal(false);
    } else {
      notification["warning"]({
        message: "Failed!",
        description: "Something went wrong!",
      });
    }
  };

  const handleFrequency = (e: any) => {
    let totalVisits = 0;
    let totalWeeks = 0;
    const values = e.target.value * 1;
    const updateFrequency = {
      ...builderInfo.frequency,
      [e.target.name]: values,
    };
    for (const property in updateFrequency) {
      let times = 1;
      if (property === "fiveperweek") times = 5;
      if (property === "fourperweek") times = 4;
      if (property === "threeperweek") times = 3;
      if (property === "twoperweek") times = 2;
      if (property === "oneperweek") times = 1;
      if (property === "everyperweek") times = 7;
      totalVisits = totalVisits + updateFrequency[property] * times;
      totalWeeks = totalWeeks + updateFrequency[property];
    }
    const updatedInfo = { ...builderInfo, frequency: updateFrequency };
    updatedInfo.visits = totalVisits;
    updatedInfo.months = Math.ceil(totalWeeks / 4);
    setVisit(updatedInfo.visits);
    setBuilderInfo(updatedInfo);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  const cloneCarePlanType = () => {
    const cloned = { ...item };
    delete cloned.id;
    delete cloned._id;
    delete cloned.__v;
    cloned.planName = `Copy of ${cloned.planName}`;
    setTemp(item.template);
    setSelectedCode({
      Adjustments: { ...item.Adjustments },
      Exams: { ...item.Exams },
      XRays: { ...item.XRays },
      Therapies: { ...item.Therapies },
      AddOns: { ...item.AddOns }
    })
    setBuilderInfo({ ...cloned });
  };
  const loadingFunction = async () => {
    const temp = await getTemplateList();
    if (temp) {
      setTemplate(temp);
    }
  }

  useEffect(() => {
    loadingFunction();
    setVisit(item.visits);
  }, []);
  return (
    <>
      <Button
        type="primary"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
        onClick={openBuilder}
      >
        <VscCopy onClick={cloneCarePlanType} />
      </Button>
      <Modal
        title="Cloning Care Plan"
        visible={openModal}
        onOk={handleBuildSubmit}
        confirmLoading={loading}
        onCancel={() => setOpenModal(false)}
        width={1200}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleBuildSubmit}
          >
            Save Care Plan
          </Button>,
        ]}
      >
        <div className="care_plan_builder">
          <div className="menu">
            <div>
              <Input
                type="text"
                placeholder="Demo Care Plan"
                name="planName"
                onChange={handleChange}
                value={builderInfo.planName}
                prefix={<FaWrench />}
                required
              />
            </div>
            <div>
              <Select
                placeholder="Stage of Care"
                onChange={handleSOC}
                defaultValue={item.stageOfCare}
                style={{ marginLeft: "1.5rem" }}
              >
                <Option value="Initial Intensive Care">
                  Initial Intensive Care
                </Option>
                <Option value="Corrective Care">Corrective Care</Option>
                <Option value="Wellness Care">Wellness Care</Option>
                <Option value="Maintenance Care">Maintenance Care</Option>
              </Select>
            </div>
            <div>
              <Select placeholder="Template" onChange={handleTemp} defaultValue={builderInfo.template}>
                {
                  template.map((it: any) => (
                    <Option key={it._id} value={it._id}>{it.name}</Option>
                  ))
                }
              </Select>
            </div>
          </div>
          <div>
            <Row justify="start">
              <Col span={4}>
                <Row justify="start">
                  <Col>
                    Total Visits <br />
                    <Input
                      type="number"
                      className="inputNumber"
                      name="visits"
                      value={builderInfo.visits}
                      min={0}
                      readOnly
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row justify="start" style={{ marginTop: "1rem" }}>
                  <Col>
                    Total Months <br />
                    <Input
                      name="months"
                      type="number"
                      className="inputNumber"
                      value={builderInfo.months}
                      min={1}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={14}>
                <h4>Frequency</h4>
                <p>
                  5 times per week for{" "}
                  <Input
                    type="number"
                    name="fiveperweek"
                    className="inputNumber"
                    defaultValue={builderInfo.frequency.fiveperweek}
                    min={0}
                    onChange={handleFrequency}
                  />{" "}
                  week(s)
                </p>
                <p>
                  4 times per week for{" "}
                  <Input
                    type="number"
                    name="fourperweek"
                    className="inputNumber"
                    defaultValue={builderInfo.frequency.fourperweek}
                    min={0}
                    onChange={handleFrequency}
                  />{" "}
                  week(s)
                </p>
                <p>
                  3 times per week for{" "}
                  <Input
                    type="number"
                    name="threeperweek"
                    className="inputNumber"
                    defaultValue={builderInfo.frequency.threeperweek}
                    min={0}
                    onChange={handleFrequency}
                  />{" "}
                  week(s)
                </p>
                <p>
                  2 times per week for{" "}
                  <Input
                    type="number"
                    name="twoperweek"
                    className="inputNumber"
                    defaultValue={builderInfo.frequency.twoperweek}
                    min={0}
                    onChange={handleFrequency}
                  />{" "}
                  week(s)
                </p>
                <p>
                  1 times per week for{" "}
                  <Input
                    type="number"
                    name="oneperweek"
                    className="inputNumber"
                    defaultValue={builderInfo.frequency.oneperweek}
                    min={0}
                    onChange={handleFrequency}
                  />{" "}
                  week(s)
                </p>
                <p>
                  Every times per week for{" "}
                  <Input
                    type="number"
                    name="everyperweek"
                    className="inputNumber"
                    defaultValue={builderInfo.frequency.everyperweek}
                    min={0}
                    onChange={handleFrequency}
                  />{" "}
                  week(s)
                </p>
              </Col>
            </Row>
            <section style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', marginTop: '1rem' }}>
              {
                categories.map(cat => <CodeCategory item={cat} key={cat} />)
              }
            </section>
          </div>
        </div>
      </Modal>
    </>
  );
};
