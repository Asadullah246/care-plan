import { Route, Routes } from "react-router-dom";
import "./App.scss";
import TemplateEditor from "./components/Common/TemplateEditor";
import UserSettings from "./components/Dashboard/UserSettings/UserSettings";
import Layout from "./components/Layout/index";
import BuildCarePlan from "./components/PatientDashboard/BuildCarePlan";
import { CurrentCarePlan } from "./components/PatientDashboard/CurrentCarePlan";
import PatientDashboard from "./components/PatientDashboard/PatientDashboard";
import PreviousCarePlan from "./components/PatientDashboard/PreviousCarePlan";
import { CarePlanTemplate } from "./pages/CarePlanTemplate";
import Dashboard from "./pages/Dashboard";
import { FeeSchedulePage } from "./pages/FeeSchedulePage";
import { Insurance } from "./pages/Insurance";
import { Login } from "./pages/Login";
import NotFound from "./pages/NotFound/NotFound";
import { PatientListPage } from "./pages/PatientListPage";
import ResetPassword from "./pages/ResetPassword";
import { TeamMembersPage } from "./pages/TeamMembersPage";
import TemplateBuilder from "./pages/TemplateBuilder";

function App() {
  return (
    <Routes>
       {/* I want to add navbar here */}
       
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="resetpassword/:token" element={<ResetPassword />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="team-members" element={<TeamMembersPage />} />
        <Route path="patient-list" element={<PatientListPage />} />
        <Route path="fee-schedule" element={<FeeSchedulePage />} />
        <Route path="care-plans-builder" element={<CarePlanTemplate />} />
        <Route path="user-settings" element={<UserSettings />} />
        <Route path="insurance" element={<Insurance />} />
        <Route path="care-plan" element={<CurrentCarePlan />} />
        {/* <Route path="previous-care-plans" element={<PreviousCarePlan />} /> */}
        <Route path="template-builder" element={<TemplateBuilder />} />
        <Route path="template" element={<TemplateEditor data={""} mode="" />} />
      </Route>
      <Route path="patient/:pid" element={<PatientDashboard />}>
        <Route index element={<Insurance />} />
        <Route path="insurance" element={<Insurance />} />
        <Route path="create-careplan" element={<BuildCarePlan />} />
        <Route path="previous-care-plans" element={<PreviousCarePlan />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
