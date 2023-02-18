import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { getAllSchedule } from "../../../api";
import { ISchedule } from "../../../types";
import AddSchedule from "./AddSchedule";
import styles from "./FeeSchedule.module.scss";
import FeeScheduleDetails from "./FeeScheduleDetails";

const FeeSchedule = () => {
  const [schedules, setSchedules] = useState<ISchedule[]>([]);

  const getSchedules = async () => {
    const scheduleRes = await getAllSchedule();
    if (scheduleRes) setSchedules(scheduleRes?.data?.schedules);
  };
  useEffect(() => {
    getSchedules();
  }, []);
  return (
    <div>
      <h2>Total Schedules: {schedules.length}</h2>
      <AddSchedule fslist = {getSchedules} />
      {schedules.length !== 0 ? (
        <table className={styles.feeScheduleTable}>
          <thead>
            <th></th>
            <th>Fee Schedule</th>
            <th>Case Type</th>
          </thead>
          <tbody>
            {schedules.map((item) => (
              <FeeScheduleDetails key={item._id} item={item} fslist = {getSchedules} />
            ))}
          </tbody>
        </table>
      ) : (
        <Skeleton active />
      )}
    </div>
  );
};

export default FeeSchedule;
