import { Button, Input, message } from "antd";
import Title from "antd/lib/typography/Title";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../states/app.context";
import { IInsurance } from "../../types";

const requireDiv = <span style={{ fontSize: "20px", color: "#ff4d4f", }} >*</span>

const NewInsurance = ({ addInsurance, type }: any) => {
  const { getPatient, patient } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [edited, setEdited] = useState<IInsurance>({
    x_ray_coverage: "no",
    office_visit_992XX:"covered",
    co_insurance: "yes",
    benefitsBase: {
      type: "Calendar",
      date: new Date(new Date().getFullYear(), 0, 1),
    },
    start_meeting_deductable: "yes",
  } as IInsurance);
  const { pid } = useParams();

  const handleChange = (e: any) => {
    console.log("e is ", e.target.name, e.target.value);
    const updated = { ...edited, [e.target.name]: e.target.value };
    setEdited(updated);
    console.log("ed", updated);
  };

  const handleBenefitsType = (e: any) => {
    console.log(e.target.value);
    setEdited({
      ...edited,
      benefitsBase: { type: "Benefit", date: new Date() },
    });
    if (e.target.value === "Calendar") {
      setEdited({
        ...edited,
        benefitsBase: {
          type: "Calendar",
          date: new Date(new Date().getFullYear(), 0, 1),
        },
      });
    }
  };

  const handleBenefitsDate = (e: any) => {
    console.log(e.target.value);
  };

  const updateInsurance = async (e: any) => {
    e.preventDefault();
    console.log("editedd", edited);
    setLoading(true);
    const res = await addInsurance(edited, patient._id);
    console.log("res", res);

    if (res?.status === 201) {
      setLoading(false);
      message.success("Insurance added");

    } else {
      setLoading(false);
      message.error("Something went wrong!");

    }
  };
  useEffect(() => {
    getPatient(pid);
  }, [])

  return (
    <form onSubmit={updateInsurance}>
      <Title level={3}>Add {type}</Title>
      <table>
        <tbody>
          <tr>
            <td className="font-bold text-xl " style={{ fontSize: "20px", fontWeight: "500" }}>Insurance</td>
            <td className="font-bold text-xl " style={{ fontSize: "20px", fontWeight: "500" }}>Value</td>
            <td className="font-bold text-xl " style={{ fontSize: "20px", fontWeight: "500" }}>Visits</td>
          </tr>
          <tr>
            <td>
              <label htmlFor="companyName required"> {requireDiv} Insurance Company</label>
            </td>
            <td>

              <Input
                type="text"
                name="company"
                defaultValue={edited.company}
                onChange={handleChange}
                id="company"
                required
              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="individualDeductable">{requireDiv} Remaining Deductible</label>
            </td>
            <td>
              <Input
                type="number"
                name="individual_deductable"
                onChange={handleChange}
                defaultValue={edited.individual_deductable}
                id="individualDeductable"
                min={0}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="individualDeductableMet">{requireDiv} Deductible </label>
            </td>
            <td>
              <Input
                type="number"
                min={0}
                defaultValue={edited.individual_deductable_Met}
                onChange={handleChange}
                name="individual_deductable_Met"
                id="individualDeductableMet"
              />
            </td>
          </tr>

          {/* <tr>
            <td>Number of Visits allowed</td>
            <td>
              <Input
                type="number"
                min={0}
                onChange={handleChange}
                defaultValue={edited?.visits_allowed}
                name="visits_allowed"
                id="visits_allowed"
              />
            </td>
          </tr>
          <tr>
            <td>Number of Visits used</td>
            <td>
              <Input
                type="number"
                min={0}
                onChange={handleChange}
                defaultValue={edited?.visits_used}
                name="visits_used"
                id="visits_used"
              />
            </td>
          </tr> */}

          {/* <tr>
            <td>Co - Insurance</td>
            <td>
              <select name="co_insurance" onChange={handleChange}  id="co_insurance">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </td>
          </tr> */}
          {/* <tr>
            <td>Allowed Percentage</td>
            <td>
              <Input
                type="number"
                min={0}
                onChange={handleChange}
                defaultValue={edited?.allowed_percentage}
                name="allowed_percentage"
                id="allowed_percentage"
              />
            </td>
          </tr>
          <tr>
            <td>Amount Max per visit</td>
            <td>
              <Input
                type="number"
                min={0}
                onChange={handleChange}
                defaultValue={edited?.amount_max_per_visit}
                name="amount_max_per_visit"
                id="amount_max_per_visit"
              />
            </td>
          </tr> */}
          {/* <tr>
            <td>Visit Co Pay</td>
            <td>
              <Input
                type="number"
                min={0}
                onChange={handleChange}
                defaultValue={edited?.visit_co_pay}
                name="visit_co_pay"
                id="visit_co_pay"
              />
            </td>
            <td>
              <select
               name="visit_co_pay"
               onChange={handleChange}
               defaultValue={edited?.visit_co_pay}
                // defaultValue={"no"} id="visit_co_pay"
                >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </td>
          </tr> */}


          {/* <tr>
            <td>Exam Co Pay</td>
            <td>
              <Input
                type="number"
                min={0}
                onChange={handleChange}
                defaultValue={edited?.visit_co_pay}
                name="exam_co_pay"
                id="exam_co_pay"
              />
            </td>
            <td>
              <select name="exam_co_pay" defaultValue={"no"} id="exam_co_pay">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </td>
          </tr> */}

          <tr>
            <td>
              <label htmlFor="xrayCoverage">Office Visit 992XX</label>
            </td>
            <td>
              <select
                name="office_visit_992XX"
                onChange={handleChange}
                defaultValue={edited?.office_visit_992XX}
                id="xrayCoverage"
                style={{width:"100%", padding:"6px 0", borderRadius:"2px"}}
              >
                <option value="covered">Covered</option>
                <option value="non-covered">Non-covered</option>
                <option value="co-insurance">Co-insurance</option>
                <option value="co-pay">Co-pay</option>
              </select>
            </td>
          </tr>
          {edited?.office_visit_992XX === "co-insurance" && (
            <tr>
              <td>Co-insurance</td>
              <td>
                <Input
                  min={0}
                  onChange={handleChange}
                  defaultValue={edited?.x_ray_percent_coverage}
                  type="number"
                  name="x_ray_percent_coverage"
                  id="x_ray_percent_coverage"
                  required={edited?.x_ray_coverage === "yes"}
                />
              </td>
            </tr>
          )}
          {edited?.office_visit_992XX === "co-pay" && (
            <tr>
              <td>Co-pay</td>
              <td>
                <Input
                  min={0}
                  onChange={handleChange}
                  defaultValue={edited?.x_ray_percent_coverage}
                  type="number"
                  name="x_ray_percent_coverage"
                  id="x_ray_percent_coverage"
                  required={edited?.x_ray_coverage === "yes"}
                />
              </td>
            </tr>
          )}
        </tbody>
        <Button type="primary" onClick={updateInsurance} loading={loading}>
          Save Insurance
        </Button>
      </table>
    </form>
  );
};

export default NewInsurance;
