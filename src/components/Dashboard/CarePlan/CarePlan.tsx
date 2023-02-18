import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { getCarePlanTypeList } from "../../../api";
import { ICareplan } from "../../../types";
import { CareItem } from "./CareItem";
import { NewCarePlanTemplate } from "./CarePlanBuilder";

export const CarePlan = () => {
  const [carePlanTypeList, setCarePlanTypeList] = useState<ICareplan[]>();
  const getCarePlans = async () => {
    const res = await getCarePlanTypeList();
    if (res) {
      setCarePlanTypeList(res);
    }
  };

  useEffect(() => {
    getCarePlans();
  }, []);

  return (
    <main>
      <h2>Care Plan builder</h2>
      <NewCarePlanTemplate load={getCarePlans} />
      {
        carePlanTypeList ? (<div className="care_list">
          <div>
            <span />
            <span>Care Plane Name</span>
            <span>Stage of care</span>
          </div>
          {carePlanTypeList?.map((plan) => (
            <CareItem item={plan} key={plan.planName} load={getCarePlans} />
          ))}
        </div>) : <Skeleton active />
      }
    </main>
  );
};
