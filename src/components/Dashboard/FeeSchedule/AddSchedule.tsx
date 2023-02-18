import { Button, Checkbox, Input, Modal, notification, Select } from "antd";
import { useState } from "react";
import { FaPlusCircle, FaWrench } from "react-icons/fa";
import { addFeeSchedule } from "../../../api";
import { FeeSchedule } from "../../../types";
import styles from "./FeeSchedule.module.scss";
import SalesTax from "./SalesTax";

const { Option } = Select;

const AddSchedule = ({ fslist }: any) => {
  const [visible, setVisible] = useState(false);
  const [loading] = useState(false);
  const [feeScheduleMain, setfeeScheduleMain] = useState<FeeSchedule>({
    name: "",
    discount: false,
    caseType: "",
    default: false,
  });

  const handleChange = (e: any) => {
    if (typeof e === "string") {
      setfeeScheduleMain({ ...feeScheduleMain, caseType: e });
    } else if (e.target.checked) {
      setfeeScheduleMain({ ...feeScheduleMain, [e.target.name]: e.target.checked });
    } else {
      setfeeScheduleMain({ ...feeScheduleMain, [e.target.name]: e.target.value });
    }
  };

  const handleAddSchedule = async (e: any) => {
    const response = await addFeeSchedule(feeScheduleMain);
    if (response?.status === 200) {
      notification["success"]({
        message: "Fee Schedule added",
        description: `'${response.data.schedule}' Fee schedule added!`,
      });
      fslist();
      setVisible(false);
    } else {
      notification["error"]({
        message: "Something went wrong!",
        description: `Fee schedule is not added! Please check all input`,
      });
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="primary" className="addmember" onClick={() => setVisible(true)}>
          <FaPlusCircle /> Add Schedule
        </Button>
        <SalesTax />
      </div>
      {/* modal section start */}
      <Modal
        title="Add Fee Schedule"
        visible={visible}
        onOk={handleAddSchedule}
        confirmLoading={loading}
        onCancel={() => setVisible(false)}
        width={700}
        footer={[
          <Button key="submit" type="primary" loading={loading} onClick={handleAddSchedule}>
            Save
          </Button>,
        ]}
      >
        <div className={styles.feeScheduleTopbar}>
          <Input
            onChange={handleChange}
            style={{ width: "200px" }}
            suffix={<FaWrench />}
            name="name"
            placeholder="Fee Schedule name"
          />
          <Select size="middle" placeholder="Case Type" onChange={handleChange} style={{ width: 200 }}>
            <Option value={"Cash"}>Cash</Option>
            <Option value={"Insurance"}>Insurance</Option>
            <Option value={"Medicare"}>Medicare</Option>
            <Option value={"Personal Injury"}>Personal Injury</Option>
            <Option value={"Worker's Comp"}>Worker&apos;s Comp</Option>
          </Select>
          <Checkbox onChange={handleChange} name="discount" className={styles.feeScheduleCheckbox}>
            Discounts
          </Checkbox>
        </div>
      </Modal>
    </div>
  );
};

export default AddSchedule;
