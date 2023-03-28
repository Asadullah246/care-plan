import { Button, Col, Input, Modal, notification, Row, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { FaPlusCircle, FaWrench } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createCarePlanType, getTemplateList } from "../../../api";
import { AppContext } from "../../../states/app.context";
import { Itemplate } from "../../../types";
import CodeCategory from "./CodeCategory";

const { Option } = Select;

export const NewCarePlanTemplate = ({ load }: any) => {
  const { selectedCode, setSelectedCode, setVisit } = useContext(AppContext);
  const [builderInfo, setBuilderInfo] = useState({
    visits: 0,
    months: 0,
    frequency: {
      fiveperweek: 0,
      fourperweek: 0,
      threeperweek: 0,
      twoperweek: 0,
      oneperweek: 0,
      everyperweek: 0,
    }
  });
  const categories = ["Adjustments", "Exams", "X-rays", "Therapies", "Add Ons"];
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [soc, setSoc] = useState("Initial Intensive Care");
  const [template, setTemplate] = useState<Itemplate[]>([]);
  const [temp, setTemp] = useState();
  const navigate = useNavigate();
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
        description: "This care plan added successfully!",
      });
      setOpenModal(false);
      load();
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
    for (const [key, value] of Object.entries(updateFrequency)) {
      let times = 1;
      if (key === "fiveperweek") times = 5;
      if (key === "fourperweek") times = 4;
      if (key === "threeperweek") times = 3;
      if (key === "twoperweek") times = 2;
      if (key === "oneperweek") times = 1;
      if (key === "everyperweek") times = 7;
      totalVisits = totalVisits + value * times;
      totalWeeks = totalWeeks + value;
    }
    const updatedInfo = { ...builderInfo, frequency: updateFrequency };
    updatedInfo.visits = totalVisits;
    updatedInfo.months = Math.ceil(totalWeeks / 4);
    setVisit(totalVisits);
    setBuilderInfo(updatedInfo);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  const loadingFunction = async () => {
    const temp = await getTemplateList();
    if (temp) {
      setTemplate(temp);
    }
  }
  useEffect(() => {
    setSelectedCode({
      Adjustments: {},
      Exams: {},
      XRays: {},
      Therapies: {},
      AddOns: {},
    })
    loadingFunction();
    return () => {
      setSelectedCode({
        Adjustments: {},
        Exams: {},
        XRays: {},
        Therapies: {},
        AddOns: {},
      })
    }
  }, [])

  return (
    <>
      <Button
        type="primary"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
        onClick={openBuilder}
      >
        <FaPlusCircle /> Add Care Plan
      </Button>
      <Modal
        title="Add Care Plan"
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
            Add Care Plan
          </Button>,
        ]}
      >
        <div className="care_plan_builder">
          <div className="menu">
            <Input
              type="text"
              placeholder="Care Plan Name"
              name="planName"
              onChange={handleChange}
              prefix={<FaWrench />}
              required
            />
            <Select
              placeholder="Stage of Care"
              onChange={handleSOC}
              style={{ margin: "0 1.5rem" }}
            >
              <Option value="Initial Intensive Care">
                Initial Intensive Care
              </Option>
              <Option value="Corrective Care">Corrective Care</Option>
              <Option value="Wellness Care">Wellness Care</Option>
              <Option value="Maintenance Care">Maintenance Care</Option>
            </Select>

            <Select placeholder="Template" onChange={handleTemp}>
              {
                template.map((item: any) => (
                  <Option key={item._id} value={item._id}>{item.name}</Option>
                ))
              }
            </Select>
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
                    // onChange={handleChange}
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
                      readOnly
                    // onChange={handleChange}
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
