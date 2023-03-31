import { Button, Form, InputNumber, notification, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCarePlan, getCarePlanBySOC, getScheduleByCaseType, getTemplateById, getTemplateList, updatePatient } from "../../api";
import { AppContext } from "../../states/app.context";
import store from "../../store/store";
import { Itemplate } from "../../types";
import TemplateEditor from "../Common/TemplateEditor";
import BuildCarePlanCard from "./BuildCarePlanCard";

const { Option } = Select;

const pod = ["normal 1", "normal 2", "normal 3", "normal 4"];

const BuildCarePlan = () => {
  const { cost, selectedCode, setSelectedCode, setFeeSchedule, setCarePlan, clientPlan, setClientPlan, patient, setVisit, setCheckIns } =
    useContext(AppContext);
  const [fsList, setFsList] = useState<any>([]);
  const [carePlanList, setCarePlanList] = useState([]);
  const [template, setTemplate] = useState<Itemplate[]>([]);
  const [selectedTemp, setSelectedTemp] = useState();
  const [cp, setCp] = useState()
  const navigate=useNavigate()
  const storeData = store.getState();



  const handleCPchange = async (e: any) => {
    setClientPlan({ caseType: e });
    const insurance = storeData.patient.insurance;
    if(!(insurance.id) && e=="Insurance"){
      setCheckIns(false)
      navigate(-1)
      return ;
    }
    const res = await getScheduleByCaseType({ caseType: e });
    setFsList(res?.data.schedule);
  };

  const handleClientPlan = (key: string, value: any) => {
    if (key === "feeSchedule"){
      const feeScheduleName = fsList.find((item: any) => item._id == value).name;
      setClientPlan((p: any) => ({ ...p, feeSchedule: value, feeScheduleName }));
    }else{
      setClientPlan((p: any) => ({ ...p, [key]: value }));
    }
  };

  const handleSOC = async (e: any) => {
    const res = await getCarePlanBySOC({ stageOfCare: e });
    setCarePlanList(res?.data.plan);
    setClientPlan((p: any) => ({ ...p, stageOfCare: e }));
  };
  const handleCarePlan = (e: any) => {
    setCarePlan(e);
    setCp(e);
    const carePlanTemplate: any = carePlanList.find((el: any) => {
      if (el._id === e) {
        return el;
      }
    });
    console.log(carePlanTemplate, e, 'care plan')
    const { Adjustments, AddOns, Exams, Therapies, XRays, frequency, months, visits } = carePlanTemplate;
    setClientPlan((p: any) => ({
      ...p,
      carePlan: { Adjustments, AddOns, Exams, months, Therapies, XRays, frequency, visits },
      planName: carePlanTemplate.planName,
    }));
    setVisit(visits);
    setSelectedCode({
      Adjustments,
      AddOns,
      Exams,
      Therapies,
      XRays,
    });
  };

  const submitCarePlan = async () => {
    // console.log({
    //   patient: patient._id,
    //   carePlanType: cp,
    //   cost,
    // });
    const response = await createCarePlan({
      ...clientPlan,
      carePlanType: cp,
      cost,
    });
    if (response.status === 201) {
      if (patient.currentCarePlan) {
        const current = patient.currentCarePlan;
        patient.previousCarePlans.push(current);
        patient.currentCarePlan = response.data.newPlan._id;
      } else {
        patient.currentCarePlan = response.data.newPlan._id;
      }
      console.log(patient);
      const res = await updatePatient(patient._id, patient);
      if(res){
        notification['success']({
          message: "Success!",
          description: "Care plan added!"
        })
      }
    }
  };

  const gettingTemplateList = async () => {
    const temp = await getTemplateList();
    if (temp) {
      setTemplate(temp);
    }
  };

  const handleTempChange = async (value: any) => {
    const response = await getTemplateById(value);
    setSelectedTemp(response);
  };

  useEffect(() => {
    gettingTemplateList();
  }, [cost]);
  return (
    <>
    <h1>Create Care Plan</h1>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div>
          <Form.Item name="Case Type" label="Case Type" rules={[{ required: true }]}>
            <Select placeholder="Select Case Type" onChange={handleCPchange}>
              <Option value={"Cash"}>Cash</Option>
              <Option value={"Insurance"}>Insurance</Option>
              <Option value={"Medicare"}>Medicare</Option>
              <Option value={"Personal Injury"}>Personal Injury</Option>
              <Option value={"Worker's Comp"}>Worker&apos;s Comp</Option>
            </Select>
          </Form.Item>
          <Form.Item name="Fee Schedule" label="Fee Schedule" rules={[{ required: true }]}>
            <Select
              placeholder="Select Fee Schedule"
              onChange={(e) => {
                setFeeSchedule(e);
                handleClientPlan("feeSchedule", e);
              }}
              value={clientPlan.feeSchedule}
            >
              {fsList.map((fs: any) => (
                <Option key={fs._id} value={fs._id} >
                  {fs.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="Insurance Visit" label="Insurance Visit" rules={[{ required: true }]}>
            <InputNumber
              onChange={(e) => handleClientPlan("insuranceVisits", e)}
              value={clientPlan.insuranceVisits || 0}
              disabled={clientPlan.caseType != 'Insurance'}
              placeholder="Insurance Visit"
              min={0}
            />
          </Form.Item>
          <Form.Item name="Stage of Care" label="Stage of Care" rules={[{ required: true }]}>
            <Select placeholder="Stage of Care" onChange={handleSOC} style={{ margin: "0 1.5rem" }}>
              <Option value="Initial Intensive Care">Initial Intensive Care</Option>
              <Option value="Corrective Care">Corrective Care</Option>
              <Option value="Wellness Care">Wellness Care</Option>
              <Option value="Maintenance Care">Maintenance Care</Option>
            </Select>
          </Form.Item>
          <Form.Item name="Care Plan" label="Care Plan" rules={[{ required: true }]}>
            <Select placeholder="Select Care Plan" onChange={handleCarePlan}>
              {carePlanList.map((cp: any) => (
                <Option key={cp._id} value={cp._id}>
                  {cp.planName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="Phase of Degeneration" label="Phase of Degeneration" rules={[{ required: true }]}>
            <Select
              placeholder="Select Phase of Degeneration"
              onChange={(e) => handleClientPlan("phaseOfDegenration", e)}
            >
              {pod.map((pd: any) => (
                <Option key={pd} value={pd}>
                  {pd}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" onClick={submitCarePlan}>
            Submit care plan
          </Button>
        </div>
        <div>
          <BuildCarePlanCard title="Adjustments" data={selectedCode["Adjustments"]} />
          <BuildCarePlanCard title="Add Ons" data={selectedCode["AddOns"]} />
          <BuildCarePlanCard title="Exams" data={selectedCode["Exams"]} />
          <BuildCarePlanCard title="Therapies" data={selectedCode["Therapies"]} />
          <BuildCarePlanCard title="X-rays" data={selectedCode["XRays"]} />
        </div>
      </div>
      <div style={{ margin: "auto", lineBreak: "loose" }}>
        <span style={{ margin: "1rem", fontWeight: "600" }}>Total Cost of Care Plan ${cost.totalCost}</span>
        <span style={{ margin: "1rem", fontWeight: "600" }}>
          Total Cost of Care Plan (1x Payment) ${((cost.discountedAmount) != null && (cost.discountedAmount) >0) ?cost.discountedAmount : cost.userCost}
        </span>
        <span style={{ margin: "1rem", fontWeight: "600" }}>Total Cost of Care Plan (Monthly) ${cost.monthlyCost}</span>
        <span style={{ margin: "1rem", fontWeight: "600" }}>
          Monthly Payment ${cost.monthlyCost} <br />
        </span>
        <span style={{ margin: "1rem", fontWeight: "600" }}>Insurance Coverage ${cost.insuranceCoverage}</span>
        <span style={{ margin: "1rem", fontWeight: "600" }}>Insurance Out of Pocket ${cost.userCost}</span>
        <span style={{ margin: "1rem", fontWeight: "600" }}>Default Fee Schedule cost ${cost.defaultFeeScheduleCost}</span>
      </div>
      Select template:{" "}
      <Select placeholder="Select template" style={{ width: 120, margin: "3rem" }} onChange={handleTempChange}>
        {template?.map((item) => (
          <Select.Option key={item._id} value={item._id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <TemplateEditor data={selectedTemp} mode="pdf" />
    </>
  );
};

export default BuildCarePlan;
