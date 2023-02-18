import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const PatientMenu = () => {
  return (
    <>
      <Menu.Item key="1">
        <Link to="/insurance">Insurance</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/care-plan">Care Plan</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/previous-care-plans">Previous Care</Link>
      </Menu.Item>
    </>
  );
};
