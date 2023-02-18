import { Layout, Menu } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logoutUserApi } from "../../api";
import { AppContext } from "../../states/app.context";
import { LoadingScreen } from "../LoadingScreen";
const { Content, Sider } = Layout;

const adminMenus = [
  "patient-list",
  "fee-schedule",
  "care-plans-builder",
  "team-members",
  "template-builder",
  "update-options",
];
const patientMenus = [
  "insurance",
  "care-plan",
  "previous-care-plans",
  "schedule",
];

const Index = () => {
  const { user, setUser, loading } = useContext(AppContext);
  const [currentMenu, setCurrentMenu] = useState("1");
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("checking user", typeof user?.email);
    if (loading) return;
    if (user?.email === undefined) {
      navigate("/login");
    }
  }, [user]);
  const routeLocation = useLocation().pathname.split("/")[1];
  const isManagement = ["administrator", "management"].includes(user.role);

  useEffect(() => {
    if (routeLocation === "user-settings") setCurrentMenu("7");
    else {
      const menu = isManagement
        ? adminMenus.indexOf(routeLocation) + 1
        : patientMenus.indexOf(routeLocation) + 1;
      setCurrentMenu(menu.toString());
    }
  }, [user, routeLocation]);

  const logoutUser = async () => {
    const res = await logoutUserApi();
    if (!res) return;
    setUser({});
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  if (loading) return <LoadingScreen />;
  return (
    <Layout>
      <Sider
        width={220}
        style={{
          backgroundColor: "white",
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        breakpoint="sm"
        collapsedWidth="1rem"
      >
        <div className="logo" />
        <Menu selectedKeys={[currentMenu]} mode="inline" theme="light">
          <div className="profile">
            {/* <LaptopOutlined /> */}
            {user?.firstName} {user?.lastName}
          </div>
          {isManagement ? (
            <>
              <Menu.Item key="1">
                <Link to="/patient-list">Patient List</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/fee-schedule">Fee Schedule</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/care-plans-builder">Care Plan Builder</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/team-members">Team Members</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/template-builder">Template Builder</Link>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="1">
                <Link to="/insurance">Insurance</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/care-plan">Create Care Plan</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/previous-care-plans">Previous Care</Link>
              </Menu.Item>
            </>
          )}
          <Menu.Item key="7">
            <Link to="/user-settings">User Settings</Link>
          </Menu.Item>
          <Menu.Item key={"8"} onClick={logoutUser}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Index;
