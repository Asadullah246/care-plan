import { Button, Input, message } from "antd";
import Title from "antd/lib/typography/Title";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../states/app.context";
import { IInsurance } from "../../types";

const NewInsurance = ({ addInsurance, type }: any) => {
  const { getPatient, patient } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [edited, setEdited] = useState<IInsurance>({
    x_ray_coverage: "no",
    benefitsBase: {
      type: "Calendar",
      date: new Date(new Date().getFullYear(), 0, 1),
    },
    start_meeting_deductable: "yes",
  } as IInsurance);
  const { pid } = useParams();
  const handleChange = (e: any) => { 
    console.log("e is ", e.target.value); 
    const updated = { ...edited, [e.target.name]: e.target.value };
    setEdited(updated);
    console.log("ed",edited); 
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
    console.log("editedd",edited);
    setLoading(true);
    const res = await addInsurance(edited, patient._id);
    console.log(res);
    setLoading(false);
    if (res.status === 201) {
      message.success("Insurance added");
    } else {
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
            <td>
              <label htmlFor="companyName">Insurance Company</label>
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
              <label htmlFor="effectiveDate">Effective Date</label>
            </td>
            <td>
              <Input
                type="date"
                placeholder={new Date(edited?.effective_date || new Date()).toDateString()}
                onChange={handleChange}
                name="effective_date"
                id="effective_date"
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="expirationDate">Expiration Date</label>
            </td>
            <td>
              <Input
                type="date"
                placeholder={new Date(edited?.expiration_date || new Date()).toDateString()}
                onChange={handleChange}
                name="expiration_date"
                id="expirationDate"
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="individualDeductable">Individual Deductable</label>
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
              <label htmlFor="individualDeductableMet">Individual Deductable Met</label>
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
          <tr>
            <td>
              <label htmlFor="familyDeductable">Family Deductable</label>
            </td>
            <td>
              <Input
                type="number"
                min={0}
                defaultValue={edited.family_deductable}
                onChange={handleChange}
                name="family_deductable"
                id="familyDeductable"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="familyDeductableMet">Family Deductable Met</label>
            </td>
            <td>
              <Input
                type="number"
                min={0}
                onChange={handleChange}
                defaultValue={edited.family_deductable_Met}
                name="family_deductable_Met"
                id="familyDeductableMet"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="start_meeting_deductable">Do visits start while meeting the deductable</label>
            </td>
            <td>
              <select
                name="start_meeting_deductable"
                defaultValue={edited.start_meeting_deductable}
                id="start_meeting_deductable"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="n/a">Not applicable</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="optionsForBenefits">Benefits based on</label>
            </td>
            <td>
              <select
                name="benefitsBaase"
                onChange={handleBenefitsType}
                defaultValue={edited?.benefitsBase?.type}
                id="optionsForBenefits"
              >
                <option value="Benefit">Benefit Year</option>
                <option value="Calendar">Calendar Year</option>
              </select>
              {edited?.benefitsBase?.type === "Benefit" && (
                <Input
                  onChange={handleBenefitsDate}
                  placeholder={new Date(edited?.benefitsBase?.date || new Date()).toDateString()}
                  type="date"
                />
              )}
            </td>
          </tr>
          <tr>
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
          </tr>
          <tr>
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
          </tr>
          <tr>
            <td>Visit Co Pay</td>
            <td>
              <select name="visit_co_pay" defaultValue={"no"} id="visit_co_pay">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Exam Co Pay</td>
            <td>
              <select name="exam_co_pay" defaultValue={"no"} id="exam_co_pay">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Co - Insurance</td>
            <td>
              <select name="co_insurance" defaultValue={"no"} id="co_insurance">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="xrayCoverage">X-ray coverage</label>
            </td>
            <td>
              <select
                name="x_ray_coverage"
                onChange={handleChange}
                defaultValue={edited?.x_ray_coverage}
                id="xrayCoverage"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="n/a">Not Applicable</option>
              </select>
            </td>
          </tr>
          {edited?.x_ray_coverage === "yes" && (
            <tr>
              <td>X-ray Percent coverage</td>
              <td>
                <Input
                  min={0}
                  defaultValue={edited?.x_ray_percent_coverage}
                  type="number"
                  name="x_ray_percent_coverage"
                  id="x_ray_percent_coverage"
                  required={edited?.x_ray_coverage === "yes"}
                />
              </td>
            </tr>
          )}
          <tr>
            <td>
              <label htmlFor="xrayDeductable">X-rays subject to deductable</label>
            </td>
            <td>
              <select name="x_rays_subject_to_deductable" defaultValue={"no"} id="xrayDeductable">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </td>
          </tr>
        </tbody>
        <Button type="primary" onClick={updateInsurance} loading={loading}>
          Save Insurance
        </Button>
      </table>
    </form>
  );
};

export default NewInsurance;
