import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NoPermission } from "../components/Dashboard/NoPermission/NoPermission";
import PatientList from "../components/Dashboard/PatientList/PatientList";
import { checkIsManagement, checkPermission } from "../hooks/appsHooks";
import { AppContext } from "../states/app.context";

 const PatientListPage = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const isManagement = checkIsManagement(user);
  const hasPermission = checkPermission(user, "patient");
  useEffect(() => {
    if (!isManagement) {
      navigate("/");
    }
  }, []);
  if (hasPermission) return <PatientList />;
  return <NoPermission />;
};
export default PatientListPage ;
