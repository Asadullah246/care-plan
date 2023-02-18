import { Table } from "antd";
const { Column } = Table;
const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    carePlan: "II.23.02",
    cash: "Cash",
    feeSchedule: "Chusa",
  },
  {
    key: "2",
    firstName: "John",
    lastName: "Doe",
    age: 32,
    carePlan: "II.23.02",
    cash: "Cash",
    feeSchedule: "Shane",
  },
  {
    key: "3",
    firstName: "Jane",
    lastName: "Brown",
    age: 22,
    carePlan: "II.23.02",
    cash: "Cash",
    feeSchedule: "Chusa",
  },
];

export const AntTable = () => {
  return (
    <Table dataSource={data}>
      <button>+</button>
      <Column title="Name" dataIndex="firstName" key="name" />
      <Column title="Age" dataIndex="age" key="age" />
      <Column title="Care Plan" dataIndex="carePlan" key="plan" />
      <Column title="Cash Type" dataIndex="cash" key="cash" />
      <Column title="Fee Schedule" dataIndex="feeSchedule" key="schedule" />
    </Table>
  );
};
