import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { LoadingScreen } from "./components/LoadingScreen";
// import TemplateEditor from "./components/Common/TemplateEditor";
// import UserSettings from "./components/Dashboard/UserSettings/UserSettings";
// import Layout from "./components/Layout/index";
// import BuildCarePlan from "./components/PatientDashboard/BuildCarePlan";
// import { CurrentCarePlan } from "./components/PatientDashboard/CurrentCarePlan";
// import PatientDashboard from "./components/PatientDashboard/PatientDashboard";
// import PreviousCarePlan from "./components/PatientDashboard/PreviousCarePlan";
// import { CarePlanTemplate } from "./pages/CarePlanTemplate";
// import Dashboard from "./pages/Dashboard";
// import { FeeSchedulePage } from "./pages/FeeSchedulePage";
// import { Insurance } from "./pages/Insurance";
// import { Login } from "./pages/Login";
// import NotFound from "./pages/NotFound/NotFound";
// import { PatientListPage } from "./pages/PatientListPage";
// import ResetPassword from "./pages/ResetPassword";
// import { TeamMembersPage } from "./pages/TeamMembersPage";
// import TemplateBuilder from "./pages/TemplateBuilder";

// as React.ComponentType
const Login = lazy(() => import('./pages/Login')) ;
const ResetPassword = lazy(() => import('./pages/ResetPassword')) ;
const Layout = lazy(() => import('./components/Layout/index')) ;
const NotFound = lazy(() => import('./pages/NotFound/NotFound')) ;
const Dashboard = lazy(() => import('./pages/Dashboard')) ;
const TeamMembersPage = lazy(() => import('./pages/TeamMembersPage')) ;
const PatientListPage = lazy(() => import('./pages/PatientListPage')) ;
const FeeSchedulePage = lazy(() => import('./pages/FeeSchedulePage')) ;
const CarePlanTemplate = lazy(() => import('./pages/CarePlanTemplate')) ;
const UserSettings = lazy(() => import('./components/Dashboard/UserSettings/UserSettings')) ;
const Insurance = lazy(() => import('./pages/Insurance')) ;
const CurrentCarePlan = lazy(() => import('./components/PatientDashboard/CurrentCarePlan')) ;
const TemplateBuilder = lazy(() => import('./pages/TemplateBuilder')) ;
const TemplateEditor = lazy(() => import('./components/Common/TemplateEditor')) ;
const PatientDashboard = lazy(() => import('./components/PatientDashboard/PatientDashboard')) ;
const BuildCarePlan = lazy(() => import('./components/PatientDashboard/BuildCarePlan')) ;
const PreviousCarePlan = lazy(() => import('./components/PatientDashboard/PreviousCarePlan')) ;

function App() {
  return (
    <Suspense fallback={<LoadingScreen/>}> 
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
    </Suspense>
  );
}

export default App;
