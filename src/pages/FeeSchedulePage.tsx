import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FeeSchedule from "../components/Dashboard/FeeSchedule/FeeSchedule";
import { NoPermission } from "../components/Dashboard/NoPermission/NoPermission";
import { checkIsManagement, checkPermission } from "../hooks/appsHooks";
import { AppContext } from "../states/app.context";

 const FeeSchedulePage = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const isManagement = checkIsManagement(user);
  const hasPermission = checkPermission(user, "fee-schedules");
  useEffect(() => {
    if (!isManagement) {
      navigate("/");
    }
  }, []);
  if (hasPermission) return <FeeSchedule />;
  return <NoPermission />;
};
export default FeeSchedulePage ;
