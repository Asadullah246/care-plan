import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../states/app.context";

const Dashboard = () => {
  const { user, loading } = useContext(AppContext);
  const path = useLocation().pathname;
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
    if (loading) return;
    if (!user.email) navigate("/login");
    if (user.role === "patient") navigate("/insurance");
    if (["administrator", "management"].includes(user.role)) {
      console.log("we are here");
      navigate("/patient-list");
    }
  }, [user, path, loading]);
  if (loading) return <h2>Loading..</h2>;
  return (
    <>
      {/* <Navbar />
      <Outlet /> */}
      <h2>Dashboard Page</h2>
    </>
  );
};

export default Dashboard;
