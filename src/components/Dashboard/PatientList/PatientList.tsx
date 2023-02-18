import { Button, DatePicker, Input, Modal, Skeleton } from "antd";
import { ChangeEventHandler, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addPatient, getAllPatient } from "../../../api";
import { loadPatients } from "../../../store/Patients/patient.action";
import { IUser } from "../../../types";
import { Pagination } from "../../Pagination";
import PatientDetails from "./PatientDetails";
import styles from "./PatientList.module.scss";

const PatientList = () => {
  const [patients, setPatients] = useState<IUser[]>([]);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPatient, setNewPatient] = useState<IUser>({});
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<IUser[]>([]);
  const showModal = () => {
    setVisible(true);
  };
  const handleChange = (e: any) => {
    const updates = { ...newPatient, [e.target.name]: e.target.value };
    setNewPatient(updates);
  };
  const handleDob = (e: any) => {
    console.log(e, 'e')
    const updates = { ...newPatient, dob: e.target?.value };
    setNewPatient(updates);
  }
  const validateForm = () => {
    console.log(newPatient, 'new ');
    const { firstName, lastName, email } = newPatient;
    if (firstName && lastName && email) {
      return true;
    }
    return false;
  };
  const handleAddPatient = async () => {

    const isValid = validateForm();
    if (!isValid) {
      alert("Please fill all the information");
      return;
    }
    setLoading(true);

    const addResponse = await addPatient(newPatient);
    if (addResponse) {
      setVisible(false);
      setLoading(false);
      getPatients();
      setNewPatient({});
      setPatients([...patients, addResponse]);
      setFilter([...patients, addResponse]);
      return;
    }
    setLoading(false);
    alert("Failed to add patient. Please try again.");
  };

  const handleCancel = () => {
    // console.log("Clicked cancel button");
    setVisible(false);
  };

  const getPatients = async () => {
    const patientsRes = await getAllPatient();
    if (patientsRes) {
      setPatients(patientsRes);
      dispatch(loadPatients(patientsRes));
      setFilter(patientsRes);
    }
  };

  const handleSearch = (e: any) => {
    const q = e.target.value;
    setQuery(q);
    if (q) {
      const filtered = patients.filter(
        (patient) =>
          patient.firstName?.toLowerCase().includes(q.toLowerCase()) ||
          patient.lastName?.toLowerCase().includes(q.toLowerCase()) ||
          patient.email?.toLowerCase().includes(q.toLowerCase())
      );
      setFilter(filtered);
      return;
    }
    setFilter(patients);
  };
  useEffect(() => {
    getPatients();
  }, []);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(() =>
    Math.ceil(patients.length / itemPerPage)
  );

  const getCurrentRange = () => {
    return [itemPerPage * (currentPage - 1), itemPerPage * currentPage];
  };
  useEffect(() => {
    setTotalPage(Math.ceil(patients.length / itemPerPage));
  }, [itemPerPage, patients]);
  useEffect(() => {
    getPatients();
  }, [])
  return (
    <main>
      <div className="patient_list">
        <div className="sub_menu">
          <div className="search_field">
            <BsSearch />
            <input type="text" onChange={handleSearch} placeholder="search" />
          </div>
          <div className="add_patient">
            <Button
              type="primary"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
              onClick={showModal}
            >
              <FaPlusCircle /> Add New Patient
            </Button>
          </div>
          {query ? (
            <h2>
              Showing results for {query} ({filter.length})
            </h2>
          ) : (
            <h2>Total Patients: {patients.length}</h2>
          )}
        </div>
        {patients.length !== 0 ? (
          <table className={styles.patientTable}>
            <thead>
              <th>Patient Name</th>
              <th>Current Care Plan</th>
              <th>Case Type</th>
              <th>Fee Schedule</th>
            </thead>
            <tbody>
              {filter.slice(...getCurrentRange()).map((patient) => (
                <PatientDetails key={patient._id} patient={patient} />
              ))}
            </tbody>
          </table>
        ) : (
          <Skeleton active />
        )}
        {/* <AntTable /> */}
        <Pagination
          itemPerPage={itemPerPage}
          totalPage={totalPage}
          setCurrentPage={setCurrentPage}
          setItemPerPage={setItemPerPage}
          currentPage={currentPage}
        />
      </div>
      <Modal
        title="Add Patient"
        visible={visible}
        onOk={handleAddPatient}
        confirmLoading={loading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleAddPatient}
          >
            Add Patient
          </Button>,
        ]}
      >
        <div className="form">
          <Input
            onChange={handleChange}
            value={newPatient.firstName}
            name="firstName"
            placeholder="First name"
          />
          <Input
            onChange={handleChange}
            value={newPatient.lastName}
            name="lastName"
            placeholder="Last name"
          />
          <Input
            onChange={handleChange}
            value={newPatient.email}
            name="email"
            placeholder="Email"
            type="email"
          />
          <Input
            onChange={handleChange}
            value={newPatient.phone}
            name="phone"
            type="phone"
            placeholder="Enter phone number"
          />
          {/* <DatePicker
            onChange={handleDob}
            name="dob"
            // defaultValue={moment("06-29-2022", "MM/DD/YYYY")}
            format={"MM-DD-YYYY"}
            placeholder="Date of Birth"
          /> */}
          <input type="date" name="dob" onChange={handleDob} id="" />
          
        </div>
      </Modal>
    </main>
  );
};

export default PatientList;
