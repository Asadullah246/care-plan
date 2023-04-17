import { Col, Row } from "antd";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPrimaryInsurance, addSecondaryInsurance } from "../api";
import NewInsurance from "../components/PatientDashboard/NewInsurance";
import { PrimaryInsurance } from "../components/PatientDashboard/PrimaryInsurance";
import { AppContext } from "../states/app.context";

 const Insurance = () => {
  const { patient,checkIns, setCheckIns } = useContext(AppContext);
  const navigate = useNavigate();
  const { pid } = useParams();

  // console.log(patient);

  // if(!checkIns){
  //   setCheckIns(true)
  //   console.log("enter", pid);
  //   navigate(`/patient/${pid}/create-careplan`)

  // }

  return (<Row gutter={16}>
    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
      {patient?.primaryInsurance ? <PrimaryInsurance type="Primary Insurance" data={patient.primaryInsurance} /> : <NewInsurance type="Primary Insurance" addInsurance={addPrimaryInsurance} />}
    </Col>
    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
      {patient?.secondaryInsurance ? <PrimaryInsurance type="Secondary Insurance" data={patient.secondaryInsurance} /> : <NewInsurance type="Secondary Insurance" addInsurance={addSecondaryInsurance} />}
    </Col>
  </Row>)
  // return <NewInsurance addInsurance={addPrimaryInsurance} />;
};
export default Insurance ;
