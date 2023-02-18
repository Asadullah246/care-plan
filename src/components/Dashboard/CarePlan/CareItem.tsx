import { CloneCarePlan } from "./CloneCarePlan";
import { EditCarePlan } from "./EditCarePlan";
type Props = {
  item: any;
  load: any;
};
export const CareItem = ({ item, load }: Props) => {
  return (
    <>
      <div className="care_item">
        <div>
          <EditCarePlan item={item} load={load} />
          <CloneCarePlan item={item} />
        </div>
        <div>{item.planName}</div>
        <div>{item.stageOfCare}</div>
      </div>
    </>
  );
};
