import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NoPermission } from "../components/Dashboard/NoPermission/NoPermission";
import TeamMembers from "../components/Dashboard/TeamMembers/TeamMembers";
import { checkIsManagement, checkPermission } from "../hooks/appsHooks";
import { AppContext } from "../states/app.context";

export const TeamMembersPage = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const isManagement = checkIsManagement(user);
  const hasPermission = checkPermission(user, "team-member");
  useEffect(() => {
    if (!isManagement) {
      navigate("/");
    }
  }, []);
  if (hasPermission) return <TeamMembers />;
  return <NoPermission />;
};
