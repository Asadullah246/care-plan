import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const AdminMenu = () => {
  return (
    <>
      <Menu.Item key="1">
        <Link to="/patient-list">Patient List</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/fee-schedule">Fee Schedule</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/care-plans-builder">Care Plans Builder</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/team-members">Team Members</Link>
      </Menu.Item>
    </>
  );
};
