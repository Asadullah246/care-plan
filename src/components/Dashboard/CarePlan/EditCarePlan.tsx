import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, Input, message, Modal, notification, Row, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { FaWrench } from "react-icons/fa";
import {
  deleteCarePlanType,
  getTemplateList,
  updateCarePlanType
} from "../../../api";
import { AppContext } from "../../../states/app.context";
import { Itemplate } from "../../../types";
import CodeCategory from "./CodeCategory";

const { Option } = Select;
const { confirm } = Modal;

export const EditCarePlan = ({ item, load }: any) => {
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
  const handleUpdatePlan = async () => {
    const careBuilder = {
      ...builderInfo,
      stageOfCare: soc,
      ...selectedCode,
      template: temp
    };
    const res = await updateCarePlanType(careBuilder, item._id);
    if (res?.status === 201) {
      setOpenModal(false);
      notification["success"]({
        message: "Care plan type updated",
        description: "This care plan updated successfully!",
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
    setBuilderInfo(updatedInfo);
  };
  const handleCancel = () => {
    setOpenModal(false);
    window.location.reload();
  };

  const handleDelete = async (id: string) => {
    const res = await deleteCarePlanType(id);
    if (res?.status === 200) {
      message.success("Care plan deleted");
      load();
    } else {
      message.error("Something went wrong!");
    }
  }

  const showDeleteConfirm = async () => {
    confirm({
      title: `Are you sure delete care plan ${item.planName}?`,
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(item._id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const editCarePlanType = () => {
    setSelectedCode({
      Adjustments: { ...item.Adjustments },
      Exams: { ...item.Exams },
      XRays: { ...item.XRays },
      Therapies: { ...item.Therapies },
      AddOns: { ...item.AddOns }
    })
    setOpenModal(true);
  };

  const loadingFunction = async () => {
    const temp = await getTemplateList();
    if (temp) {
      setTemplate(temp);
    }
  }

  useEffect(() => {
    setVisit(builderInfo.visits);
  }, [builderInfo]);

  useEffect(() => {
    loadingFunction();
  }, []);
  return (
    <>
      <FaWrench onClick={editCarePlanType} />
      <Modal
        title="Edit Care Plan"
        visible={openModal}
        onOk={handleUpdatePlan}
        confirmLoading={loading}
        onCancel={() => setOpenModal(false)}
        width={1200}
        footer={[
          <div key="buttons" style={{display: 'grid', gridTemplateColumns: '1fr auto auto', gridGap: '1rem'}}>
            <Button onClick={showDeleteConfirm} style={{width: '100px'}} key="delete" type="primary" danger>Delete</Button>
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleUpdatePlan}
            >
              Update Care Plan
            </Button>
          </div>
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
                prefix={<FaWrench />}
                defaultValue={builderInfo.planName || item.planName}
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
              <Select placeholder="Template" onChange={handleTemp} defaultValue={item.template}>
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
                      min={0}
                      readOnly
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
