import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CarePlan } from "../components/Dashboard/CarePlan/CarePlan";
import { NoPermission } from "../components/Dashboard/NoPermission/NoPermission";
import { checkIsManagement, checkPermission } from "../hooks/appsHooks";
import { AppContext } from "../states/app.context";

const CarePlanTemplate = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const isManagement = checkIsManagement(user);
  const hasPermission = checkPermission(user, "build-care-plan");
  useEffect(() => {
    if (!isManagement) {
      navigate("/");
    }
  }, []);
  if (hasPermission) return <CarePlan />;
  return <NoPermission />;
};
export default CarePlanTemplate ;
