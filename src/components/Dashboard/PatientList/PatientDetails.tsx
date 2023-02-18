import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const PatientDetails = ({ patient }: any) => {
  return (
    <>
      <tr>
        <td>
          <Link to={`/patient/${patient._id}`}>
            <FaPlusCircle
              style={{ cursor: "pointer" }}
            />{" "}
            {patient.firstName} {patient.lastName}
          </Link>
        </td>
        <td>{patient.currentCarePlan?.planName || "No Care Plan"}</td>
        <td>{patient.cash || "Not Defined"}</td>
        <td>{patient.schedule?.name || "Not selected"}</td>
      </tr>
      {/* <Modal
        title="Patient Details"
        visible={detailsModal}
        onCancel={() => setDetailsModal(false)}
        footer={[
          <Button key="back" onClick={() => setDetailsModal(false)}>
            Close
          </Button>,
        ]}
      >
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={12}>
            First Name:
          </Col>
          <Col className="gutter-row" span={12}>
            {patient.firstName ? patient.firstName : "N/A"}
          </Col>
          <Col className="gutter-row" span={12}>
            Last Name:
          </Col>
          <Col className="gutter-row" span={12}>
            {patient.lastName}
          </Col>
          <Col className="gutter-row" span={12}>
            Email:
          </Col>
          <Col className="gutter-row" span={12}>
            {patient.email}
          </Col>
          <Col className="gutter-row" span={12}>
            Phone:
          </Col>
          <Col className="gutter-row" span={12}>
            {patient.phone}
          </Col>
          <Col className="gutter-row" span={12}>
            Date of birth:
          </Col>
          <Col className="gutter-row" span={12}>
            {patient.dob ? patient.dob : "N/A"}
          </Col>
          <Col className="gutter-row" span={12}>
            Current Care Plan:
          </Col>
          <Col className="gutter-row" span={12}>
            {patient.currentCarePlan}
          </Col>
          <Col className="gutter-row" span={12}>
            Previous Care Plans:
          </Col>
          <Col className="gutter-row" span={12}>
            {patient.previousCarePlans}
          </Col>
          <Col className="gutter-row" span={12}>
            Cash:
          </Col>
          <Col className="gutter-row" span={12}>
            {patient.cash}
          </Col>
        </Row>
      </Modal> */}
    </>
  );
};

export default PatientDetails;
