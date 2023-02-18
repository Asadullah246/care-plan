import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import { Button, message } from "antd";
import React, { useContext } from "react";
import { deleteMember, updateTeamMember } from "../../../api";
import { AppContext } from "../../../states/app.context";
import { IUser } from "../../../types";
import styles from "./TeamMembers.module.scss";

type Props = {
  member: IUser;
  setprocess: any;
  getTeam: any;
};

export const MemberRow = ({ member, setprocess, getTeam }: Props) => {
  const { user } = useContext(AppContext);
  const isAdmin = user.role === "administrator";
  const updateMember = async (data: any) => {
    setprocess(true);
    const updateRes = await updateTeamMember(member._id || "", data);
    getTeam();
    setprocess(false);
    // console.log(updateRes);
  };

  const handleChange = (e: any) => {
    let permissions: string[] = [];
    const { name, checked } = e.target;
    if (checked) permissions = [...(member.permissions || []), name];
    if (!checked)
      permissions = (member.permissions || []).filter(
        (permission) => permission !== name
      );
    console.log(permissions, "permissions");
    updateMember({ permissions });
  };

  const handleDelete = async () => {
    setprocess(true);
    const res = await deleteMember(member._id);
    if (!res) {
      message.error("Something wrong!");
      setprocess(false);
      return;
    }
    message.success("Member deleted successful!");
    getTeam();
    setprocess(false);
  };

  return (
    <tr>
      <td>
        <Button
          onClick={handleDelete}
          disabled={!isAdmin}
          type="primary"
          danger
          size="small"
          icon={<DeleteOutlined />}
        ></Button>
      </td>
      <td>
        {/* {isAdmin && <FaWrench />} */}
        {member.firstName} {member.lastName}
      </td>
      <td>{member.email} </td>
      <td className={styles.roles}>
        <label>
          <input
            name="insurance-tab"
            type="checkbox"
            defaultChecked={member.permissions?.includes("insurance-tab")}
            disabled={!isAdmin}
            readOnly={!isAdmin}
            onChange={handleChange}
          />
          Insurance Tab
        </label>
        <label>
          <input
            name="build-care-plan"
            type="checkbox"
            defaultChecked={member.permissions?.includes("build-care-plan")}
            disabled={!isAdmin}
            readOnly={!isAdmin}
            onChange={handleChange}
          />
          Build Care Plan
        </label>
        <label>
          <input
            name="fee-schedules"
            type="checkbox"
            defaultChecked={member.permissions?.includes("fee-schedules")}
            disabled={!isAdmin}
            readOnly={!isAdmin}
            onChange={handleChange}
          />
          Fee Schedules
        </label>
        <label>
          <input
            name="team-member"
            type="checkbox"
            defaultChecked={member.permissions?.includes("team-member")}
            disabled={!isAdmin}
            readOnly={!isAdmin}
            onChange={handleChange}
          />
          Team Members
        </label>
        <label>
          <input
            name="patient"
            type="checkbox"
            defaultChecked={member.permissions?.includes("patient")}
            disabled={!isAdmin}
            readOnly={!isAdmin}
            onChange={handleChange}
          />
          Patient List
        </label>
      </td>
    </tr>
  );
};
