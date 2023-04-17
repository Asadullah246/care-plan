import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../states/app.context";
import BuildCarePlan from "./BuildCarePlan";

 const CurrentCarePlan = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) navigate("/login");
    if (user?.role !== "patient") navigate("/");
  }, [user]);
  const currentPlan = {};
  // if (currentPlan) return <h2>Showing your current Care Plan</h2>;
  if (currentPlan) return <BuildCarePlan />;
  return <BuildCarePlan />;
};
export default CurrentCarePlan ; 
