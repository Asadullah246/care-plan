import { Button, Input, Modal, Skeleton, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { addTeamMember, getAllTeamMember } from "../../../api";
import { AppContext } from "../../../states/app.context";
import { IUser } from "../../../types";
import { MemberRow } from "./MemberRow";
import styles from "./TeamMembers.module.scss";

const TeamMembers = () => {
  const { user } = useContext(AppContext);
  const [members, setMembers] = useState<IUser[]>([]);

  const getTeam = async () => {
    const memberRes = await getAllTeamMember();
    if (memberRes) setMembers(memberRes);
  };
  useEffect(() => {
    getTeam();
  }, []);
  const isAdmin = user.role === "administrator";

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState(false);
  const [newMember, setNewMember] = useState<IUser>({});
  const showModal = () => {
    setVisible(true);
  };
  const handleChange = (e: any) => {
    const updates = { ...newMember, [e.target.name]: e.target.value };
    setNewMember(updates);
  };
  const validateForm = () => {
    const { firstName, lastName, email, password } = newMember;
    if (firstName && lastName && email && password) {
      return true;
    }
    return false;
  };
  const handleAddMember = async () => {
    const isValid = validateForm();
    if (!isValid) {
      alert("Please fill all the information");
      return;
    }
    setLoading(true);

    const addResponse = await addTeamMember(newMember);
    if (addResponse) {
      setVisible(false);
      setLoading(false);
      setNewMember({});
      setMembers([...members, addResponse]);
      getTeam();
      return;
    }
    setLoading(false);
    alert("Failed to add patient. Please try again.");
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <h2>Total members: {members.length}</h2>
      {isAdmin && (
        <Button type="primary" className={styles.addmember} onClick={showModal}>
          <FaPlusCircle /> Add Team Member
        </Button>
      )}
      {members.length !== 0 ? (
        <Spin spinning={process}>
          <table className={styles.teamTable}>
            <thead>
              <th></th>
              <th>Team Member Name</th>
              <th>Email</th>
              <th>Permissions</th>
            </thead>
            <tbody>
              {members.map((member) => (
                <MemberRow
                  key={member._id}
                  member={member}
                  setprocess={setProcess}
                  getTeam={getTeam}
                />
              ))}
            </tbody>
          </table>
        </Spin>
      ) : (
        <Skeleton active />
      )}
      <Modal
        title="Add Team member"
        visible={visible}
        onOk={handleAddMember}
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
            onClick={handleAddMember}
          >
            Add Member
          </Button>,
        ]}
      >
        <div className="form">
          <Input
            onChange={handleChange}
            value={newMember.firstName}
            name="firstName"
            placeholder="First name"
          />
          <Input
            onChange={handleChange}
            value={newMember.lastName}
            name="lastName"
            placeholder="Last name"
          />
          <Input
            onChange={handleChange}
            value={newMember.email}
            name="email"
            placeholder="Email"
            type="email"
          />
          <Input
            onChange={handleChange}
            value={newMember.password}
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
      </Modal>
    </div>
  );
};

export default TeamMembers;
