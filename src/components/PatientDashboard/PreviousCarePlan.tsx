import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../states/app.context";
import PreviousCareItem from "./PreviousCareItem";

const PreviousCarePlan = () => {
  const { user, loading, patient, setPatient } = useContext(AppContext);
  // const [patient, setPatient] = useState<any>({})
  console.log("prev", patient); 
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user?.email === undefined) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Previous Care Plans</h1>
      <table className="commonTable">
        <thead>
          <tr>
            <th></th>
            <th>Care Plan</th>
            <th>Stage of Care</th>
            <th>Case Type</th>
            <th>Fee Schedule</th>
            <th>Phase of Degeneration</th>
          </tr>
        </thead>
        <tbody>
          {patient?.previousCarePlans?.length === 0 ? (
            <p>No data found</p>
          ) : (
            patient?.previousCarePlans?.map((item: any) => (
              <PreviousCareItem key={item} item={item} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PreviousCarePlan;
