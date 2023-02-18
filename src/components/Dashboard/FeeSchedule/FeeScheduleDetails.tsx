import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, InputNumber, message, Modal, notification, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaPlusCircle, FaWrench } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {
  createNewCode, deleteCode, deleteFeeSchedule, setDefaultFeeSchedule,
  updateBulkCodes,
  updateCode,
  updateFeeSchedule
} from "../../../api";
import { AppContext } from "../../../states/app.context";
import { codeStruct } from "../../../types";
import styles from "./FeeSchedule.module.scss";

const { confirm } = Modal;
const { Option } = Select;

const FeeScheduleDetails = ({ item, fslist }: any) => {
  const [scheduleModal, setScheduleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addCode, setAddCode] = useState(false);
  const [updateSchedule, setUpdateSchedule] = useState(item);
  const handleChange = (e: any) => {
    let updates;
    if (typeof e === 'string') {
      updates = { ...updateSchedule, caseType: e };
    }
    else if (e.target.name === "discount") {
      updates = { ...updateSchedule, [e.target.name]: e.target.checked };
    } else {
      updates = { ...updateSchedule, [e.target.name]: e.target.value };
    }
    setUpdateSchedule(updates);
  };

  const { codeList, defaultFS, gettingCodeList } = useContext(AppContext);

  const handleCodeListChange = async (id: any, e: any) => {
    const code = codeList.find((obj: any) => {
      return obj._id === id;
    });
    const res = await updateCode(
      {
        [e.target.name]: {
          ...code?.[e.target.name],
          [item._id]: e.target.value || e.target.checked,
        },
      },
      id
    );
    if (res?.status === 200) {
      message.success("Updated");
      fslist();
    } else {
      message.error("Something went wrong!");
    }
  };
  const handleUpdate = async (id: any, e: any) => {
    let res;
    if (typeof e === "number") {
      res = await updateCode({ code: e }, id);
    } else if (!e.target) {
      res = await updateCode({ category: e }, id);
    } else {
      res = await updateCode({
        [e.target.name]: e.target.value
      }, id)
    }
    if (res?.status === 200) {
      // message.success("Updated!");
    } else {
      message.error("Something went wrong!");
    }
  }
  const handleSetDefault = async () => {
    const filterCodeList = codeList.filter((code: codeStruct) => !code.amount?.[item._id]);
    const modifiedList = filterCodeList.map((code: codeStruct) => {
      return {
        ...code,
        amount: { ...code.amount, [item._id || "new_default"]: code.amount[defaultFS._id] },
      };
    });
    // update all modified code
    // if update is successfull, then set fee schedule as default, else show error
    const updateRes = await updateBulkCodes(modifiedList);
    if (!updateRes) {
      message.error("Can't set as default, please try again.");
      return;
    }
    const res = await setDefaultFeeSchedule(item._id);
    if (res?.status === 200) {
      notification["success"]({
        message: "Default set",
        description: `${item.name} set as default fee schedule`,
      });
      fslist();
    } else {
      notification["error"]({
        message: "Something went wrong!",
        description: `${item.name} is not set as default fee schedule!`,
      });
    }
  };
  const addingCode = async (values: any) => {
    if (!values.salesTax[item._id]) {
      values.salesTax[item._id] = false;
    }
    if (!values.disallow[item._id]) {
      values.disallow[item._id] = false;
    }
    console.log(values, "new code");
    const modifyCode = { ...values, amount: { ...values.amount, [defaultFS._id]: values.amount[item._id] } };
    const createdCode = await createNewCode(modifyCode);
    if (createdCode?.status === 201) {
      message.success("code added");
      setAddCode(false);
    } else {
      message.error(createdCode.response.data.message);
    }
  };

  const deleteACode = async (id: string) => {
    const res = await deleteCode(id);
    if (res?.status === 200) {
      message.success("code deleted");
      gettingCodeList();
    } else {
      message.error("Something went wrong!");
    }
  }

  const showDeleteConfirm = async (code: any) => {
    confirm({
      title: `Are you sure delete code ${code.code}?`,
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteACode(code._id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleAddSchedule = async () => {
    setLoading(true);
    const addResponse = await updateFeeSchedule(updateSchedule);
    if (addResponse?.status === 200) {
      setLoading(false);
      // setUpdateSchedule({});
      setScheduleModal(false);
      message.success("Fee schedule updated");
      fslist();
      return;
    }
    setLoading(false);
    message.error("Failed to update schedule.");
  };
  const handleDeleteFeeSchedule = async() => {
    if(item.default){
      message.error("Can't delete default Fee Schedule.\nFirst make another Fee Schedule as default.")
      return;
    }
    const confirmation = window.confirm("Confirm to delete schedule");
    if(!confirmation) return;
    console.log('Deleting fee schedule', item);
    const response = await deleteFeeSchedule(item.id);
    if(response){
      message.success("Fee Schedule deleted successfully.");
      fslist();
    }
  }
  useEffect(() => {
    gettingCodeList();
  }, [addCode]);
  return (
    <>
      <tr>
        <td>
          <FaWrench style={{ cursor: "pointer" }} onClick={() => setScheduleModal(true)} />
        </td>
        <td>
          {item.default ? <AiFillStar /> : ""} {item.name}
        </td>
        <td>{item.caseType} </td>
      </tr>
      <Modal
        title={item.name}
        visible={scheduleModal}
        onOk={handleAddSchedule}
        confirmLoading={loading}
        onCancel={() => setScheduleModal(false)}
        width={1000}
        style={{ top: '2rem', bottom: '1rem' }}
        footer={[
          <Button key="defaultFS" type="ghost" onClick={handleSetDefault}>
            Set as default
          </Button>,
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
            defaultValue={item.name}
          />
          <Select
            size="middle"
            placeholder="Case Type"
            onChange={handleChange}
            style={{ width: 200 }}
            defaultValue={item.caseType}
          >
            <Option value={"Cash"}>Cash</Option>
            <Option value={"Insurance"}>Insurance</Option>
            <Option value={"Medicare"}>Medicare</Option>
            <Option value={"Personal Injury"}>Personal Injury</Option>
            <Option value={"Worker's Comp"}>Worker&apos;s Comp</Option>
          </Select>
          <Checkbox
            onChange={handleChange}
            name="discount"
            defaultChecked={item.discount}
            className={styles.feeScheduleCheckbox}
          >
            Discounts
          </Checkbox>
          <Button
            onClick={() => {
              setAddCode(true);
            }}
          >
            <FaPlusCircle style={{ margin: "0 5px" }} /> Add Code
          </Button>
          <Button onClick={handleDeleteFeeSchedule}>Delete Fee Schedule</Button>
        </div>
        <Modal title="Add Code" visible={addCode} onCancel={() => setAddCode(false)} width={480} footer={[]}>
          <Form name="adding code" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={addingCode}>
            <Form.Item label="Code" name={"code"} rules={[{ required: true, message: "Please input code!" }]}>
              <Input placeholder="Enter code" />
            </Form.Item>
            <Form.Item
              label="Description"
              name={"description"}
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <Input.TextArea placeholder="Enter description" />
            </Form.Item>
            <Form.Item
              label="Category"
              name={"category"}
              rules={[{ required: true, message: "Please input category!" }]}
            >
              <Select size="middle" placeholder="Category">
                <Option value={"Adjustments"}>Adjustments</Option>
                <Option value={"Exams"}>Exams</Option>
                <Option value={"Exams22"}>Exams2</Option>
                <Option value={"X-rays"}>X-rays</Option>
                <Option value={"Therapies"}>Therapies</Option>
                <Option value={"Add Ons"}>Add Ons</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={["amount", item._id]}
              label="Amount"
              rules={[{ required: true, message: "Please enter amount!" }]}
            >
              <InputNumber placeholder="Enter amount" />
            </Form.Item>
            <Form.Item name={["salesTax", item._id]} valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox defaultChecked={false}>Sales Tax</Checkbox>
            </Form.Item>
            <Form.Item name={["disallow", item._id]} valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox defaultChecked={false}>Disallow</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <table style={{ width: "100%", marginTop: "1rem", borderTop: "2px solid black", borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              {updateSchedule?.discount && <th>Discounted Amount</th>}
              <th>Sales Tax</th>
              <th>Disallow</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className={styles.fee_schedule_codelist}>
            {codeList.map((code: codeStruct) => (
              <tr key={code._id}>
                {/* <td>{code.code}</td> */}
                <td><InputNumber onBlur={(e) => handleUpdate(code._id, e)} defaultValue={code.code} /></td>
                <td><Input name="description" onBlur={(e) => handleUpdate(code._id, e)} defaultValue={code.description} /></td>
                {/* <td>{code.category}</td> */}
                <td><Select size="middle" onChange={(e) => handleUpdate(code._id, e)} defaultValue={code.category}>
                  <Option value={"Adjustments"}>Adjustments</Option>
                  <Option value={"Exams"}>Exams</Option>
                  <Option value={"X-rays"}>X-rays</Option>
                  <Option value={"Therapies"}>Therapies</Option>
                  <Option value={"Add Ons"}>Add Ons</Option>
                </Select></td>
                <td>
                  <InputNumber
                    name="amount"
                    onBlur={(e) => handleCodeListChange(code._id, e)}
                    defaultValue={code.amount?.[item?._id] || code.amount?.[defaultFS?._id]}
                  />
                </td>
                {updateSchedule?.discount && <td>
                  <InputNumber
                    name='discountedAmount'
                    onBlur={(e) => handleCodeListChange(code._id, e)}
                    defaultValue={code.discountedAmount?.[item._id] || code.discountedAmount?.[defaultFS._id] || 0}
                  />
                </td>}
                <td>
                  <Checkbox
                    onChange={(e) => handleCodeListChange(code._id, e)}
                    name="salesTax"
                    style={{ display: "flex", justifyContent: "center" }}
                    defaultChecked={code.salesTax?.[item._id] || false}
                  ></Checkbox>
                </td>
                <td>
                  <Checkbox
                    onChange={(e) => handleCodeListChange(code._id, e)}
                    name="disallow"
                    style={{ display: "flex", justifyContent: "center" }}
                    defaultChecked={code.disallow?.[item._id] || false}
                  ></Checkbox>
                </td>
                <td><Button danger onClick={() => showDeleteConfirm(code)}><MdDeleteForever /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </>
  );
};

export default FeeScheduleDetails;
