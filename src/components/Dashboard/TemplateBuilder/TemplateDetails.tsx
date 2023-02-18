import React from "react";
import { FaWrench } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";

const TemplateDetails = ({ data, edit, setMode }: any) => {
  const editTemplate = () => {
    edit(data);
    setMode("edit");
  };
  const cloneTemplate = () => {
    edit({...data, name: data.name + ' copy'});
    setMode("clone");
  };
  return (
    <tr>
      <td>
        <FaWrench onClick={() => editTemplate()} />
      </td>
      <td>
        <FiCopy onClick={() => cloneTemplate()} />
      </td>
      <td>{data.name}</td>
    </tr>
  );
};

export default TemplateDetails;
