import { Button } from "antd";
import React from "react";
import { FaPlusCircle, FaWrench } from "react-icons/fa";
import styles from "./FeeSchedule.module.scss";

const NewFeeSchedule = () => {
  return (
    <div className={styles.newschedule}>
      <div className={styles.bar}>
        <span>
          Fee Schedule Name <FaWrench />
        </span>
        <span>Case Type</span>
        <span>
          Discounts <input type="checkbox" name="discount" id="discount" />
        </span>
        <span>
          <FaPlusCircle /> Add Code
        </span>
      </div>
      <table className={styles.newFeeTable}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Sales Tax</th>
            <th>Disallow</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>98941</td>
            <td>3-4 Adjustment</td>
            <td>
              <select name="category" id="category">
                <option value="Adjust">Adjust</option>
                <option value="Exam">Exam</option>
              </select>
            </td>
            <td>$65.00</td>
            <td>
              <input type="checkbox" name="tax" id="tax" />
            </td>
            <td>
              <input type="checkbox" name="disallow" id="disallow" />
            </td>
          </tr>
        </tbody>
      </table>
      <Button className={styles.submitNewFee}>Save</Button>
    </div>
  );
};

export default NewFeeSchedule;
