import { Select } from "antd";
import React from "react";

const { Option } = Select;

const SelectInput = (props: any) => {
  const handleChange = (value: any) => {
    props.setOption(value);
  };
  return (
    <>
      {props.label}
      <Select
        style={{ marginLeft: "10px", marginTop: "5px" }}
        onChange={handleChange}
        placeholder={props.placeholder}
      >
        {props.options.map(function (opt: any) {
          return <Option key={opt}>{opt}</Option>;
        })}
      </Select>
      <br />
    </>
  );
};

export default SelectInput;
