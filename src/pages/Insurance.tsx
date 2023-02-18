import { Col, Row } from "antd";
import { useContext } from "react";
import { addPrimaryInsurance, addSecondaryInsurance } from "../api";
import NewInsurance from "../components/PatientDashboard/NewInsurance";
import { PrimaryInsurance } from "../components/PatientDashboard/PrimaryInsurance";
import { AppContext } from "../states/app.context";

export const Insurance = () => {
  const { patient } = useContext(AppContext);
  console.log(patient);

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
