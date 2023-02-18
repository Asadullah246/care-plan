import { useEffect, useState } from "react";
import { getCarePlanType, getPreviousCarePlan } from "../../api";

const PreviousCareItem = ({ item }: any) => {
  const [plan, setPlan] = useState<any>();
  const [cpt, setCpt] = useState<any>({});
  const gettingData = async () => {
    const response = await getPreviousCarePlan(item);
    const res = await getCarePlanType(response?.data?.plan.carePlanType);
    setPlan(response?.data?.plan);
    setCpt(res?.data.data.plan);
  };
  useEffect(() => {
    gettingData();
  }, []);

  return (
    <tr>
      <td></td>
      <td>{cpt?.planName}</td>
      <td>{plan?.stageOfCare}</td>
      <td>{plan?.caseType}</td>
      <td>{plan?.feeSchedule?.name}</td>
      <td>{plan?.phaseOfDegenration}</td>
    </tr>
  );
};

export default PreviousCareItem;
