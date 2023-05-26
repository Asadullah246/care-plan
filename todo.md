### Care Plan TODO 16/07/2022

  [X] Fix patient care plan calculations
        *Code type changed to string created the problem*
  [X] Fix insurance data showing on UI
  [X] Add Placeholder variables helper docs
  [X] Add placeholder for template
      *Need a details code for template with adjustment (and others) code default cost, total cost, ets.*
      *Need to add patient info with careplan.*
  [ ] Clean context api data state
  [ ] Update layout for patient menu
  [X] Rename `edit template` button to `Update Template`
  [X] Add `Fee schedule` name in `clientPlan`
  [X] Add `careplan name` in `clientPlan` then in `placeholder data`
  [ ] Remove `register` page and options
  [ ] On Fee Schedule page, `defaulFS` is undefined in first load
  [ ] Error handling with axios and fix backend response
  [X] 10. `Break down each code` details
        *total qty * default code amount = total.*
        *total qty * fee schedule code amount = total.*
  [ ] Code default fee schedule cost seems undefined

  ### Custom Fields

 ### Care Plan Calculator Custom Fields
  [x] √ Stage of Care
  [x] √ Total Visits
  [x] √ Total Months
  [*] √ *5x/week
  [*] √ *4x/week
  [x] √ 3x/week
  [x] √ 2x/week
  [x] √ 1x/week
  [x] √ EO/week

  *EACH CODE Broken Down (ALL CODES which will attach the quantity of each code)*
  - Adjustments
    Example: Adjustment Code @ Default Fee Schedule Cost = Default Fee Schedule Total Cost for Code
    98941 (36) @ $72 = $2,592
    Example: Code @ Care Plan Fee Schedule Cost = Total Care Plan Fee Cost for Code
    98941 (36) @ $55 = $1980
  - Exams
  - X-rays
  - Therapies
  - Add Ons
  - Total Default Fee Schedule Price
  - Total Care Plan Fee Schedule Price
  - Monthly Price (Total Care Plan Price divided by Total Months)
  - Patient Name
  - Out of Pocket
  - Insurance Coverage
  - Phase of Degeneration
  - Fee schedule
  - Care plan template name


## Data
​
AddOns: Object {  }
​​
Adjustments: Object { 62a89563b2d008001647874d: {…} }
​​
Exams: Object { 62a8966eb2d00800164787b0: {…} }
​​
Therapies: Object {  }
​​
XRays: Object { 62a89843b2d00800164787de: {…}, 62a8998ab2d008001647881b: {…}, 62a89a0ab2d008001647884f: {…} }
​​
frequency: Object { fiveperweek: 0, fourperweek: 0, threeperweek: 4, … }
​​
months: 4
​​
visits: 36
​​
<prototype>: Object { … }
​
caseType: "Insurance"
​
feeSchedule: "62ad9c47609fa10016a088b9"
​
phaseOfDegenration: "normal 2"
​
stageOfCare: "Initial Intensive Care"



 <tr>
            <td>
              <label htmlFor="xrayCoverage">Office Visit 992XX</label>
            </td>
            <td>
             {insurance?.office_visit_992XX} {insurance?.[office_visit_992XX]?.}
            </td>

          </tr>

          {edited?.office_visit_992XX === "co_insurance" && (
            <tr>
              <td>{requireDiv} Co-insurance</td>
              <td>
                <Input
                  min={0}
                  onChange={handleChange}
                  defaultValue={edited?.office_visit_co_insurance}
                  type="number"
                  name="office_visit_co_insurance"
                  id="x_ray_percent_coverage"
                  required={edited?.office_visit_992XX === "co_insurance"}
                />
              </td>
            </tr>
          )}
          {edited?.office_visit_992XX === "co_pay" && (
            <tr>
              <td>{requireDiv} Co-pay</td>
              <td>
                <Input
                  min={0}
                  onChange={handleChange}
                  defaultValue={edited?.office_visit_co_pay}
                  type="number"
                  name="office_visit_co_pay"
                  id="x_ray_percent_coverage"
                  required={edited?.office_visit_992XX === "co_pay"}
                />
              </td>
            </tr>
          )}


          {/* Chiro Benefit 989XX */}

          <tr>
            <td>
              <label htmlFor="xrayCoverage">{requireDiv} Chiro Benefit 989XX</label>
            </td>
            <td>
              <select
                name="chiro_benefit_989XX"
                onChange={handleChange}
                defaultValue={edited?.chiro_benefit_989XX}
                id="xrayCoverage"
                style={{ width: "100%", padding: "6px 0", borderRadius: "2px" }}
              >
                <option value="covered">Covered</option>
                <option value="non_covered">Non-covered</option>
                <option value="co_insurance">Co-insurance</option>
                <option value="co_pay">Co-pay</option>
              </select>
            </td>

            <td>
              <Input
                min={0}
                onChange={handleChange}
                defaultValue={edited?.chiro_benefit_remaining}
                type="number"
                name="chiro_benefit_remaining"
                id="x_ray_percent_coverage"
                required
              />
            </td>
          </tr>

          {edited?.chiro_benefit_989XX === "co_insurance" && (
            <tr>
              <td>{requireDiv} Co-insurance</td>
              <td>
                <Input
                  min={0}
                  onChange={handleChange}
                  defaultValue={edited?.chiro_benefit_co_insurance}
                  type="number"
                  name="chiro_benefit_co_insurance"
                  id="x_ray_percent_coverage"
                  required={edited?.chiro_benefit_989XX === "co_insurance"}
                />
              </td>
            </tr>
          )}
          {edited?.chiro_benefit_989XX === "co_pay" && (
            <tr>
              <td>{requireDiv} Co-pay</td>
              <td>
                <Input
                  min={0}
                  onChange={handleChange}
                  defaultValue={edited?.chiro_benefit_co_pay}
                  type="number"
                  name="chiro_benefit_co_pay"
                  id="x_ray_percent_coverage"
                  required={edited?.chiro_benefit_989XX === "co_pay"}
                />
              </td>
            </tr>
          )}

          {/* Physical Therapy 97XXX */}

          <tr>
            <td>
              <label htmlFor="xrayCoverage">{requireDiv} Physical Therapy 97XXX</label>
            </td>
            <td>
              <select
                name="physical_therapy_97XXX"
                onChange={handleChange}
                defaultValue={edited?.physical_therapy_97XXX}
                id="xrayCoverage"
                style={{ width: "100%", padding: "6px 0", borderRadius: "2px" }}
              >
                <option value="covered">Covered</option>
                <option value="non_covered">Non-covered</option>
                <option value="co_insurance">Co-insurance</option>
                <option value="co_pay">Co-pay</option>
              </select>
            </td>

            <td>
              <Input
                min={0}
                onChange={handleChange}
                defaultValue={edited?.physical_therapy_remaining}
                type="number"
                name="physical_therapy_remaining"
                id="x_ray_percent_coverage"
                required
              />
            </td>
          </tr>

          {edited?.physical_therapy_97XXX === "co_insurance" && (
            <tr>
              <td>{requireDiv} Co-insurance</td>
              <td>
                <Input
                  min={0}
                  onChange={handleChange}
                  defaultValue={edited?.physical_therapy_co_insurance}
                  type="number"
                  name="physical_therapy_co_insurance"
                  id="x_ray_percent_coverage"
                  required={edited?.physical_therapy_97XXX === "co_insurance"}
                />
              </td>
            </tr>
          )}
          {edited?.physical_therapy_97XXX === "co_pay" && (
            <tr>
              <td>{requireDiv} Co-pay</td>
              <td>
                <Input
                  min={0}
                  onChange={handleChange}
                  defaultValue={edited?.physical_therapy_co_pay}
                  type="number"
                  name="physical_therapy_co_pay"
                  id="x_ray_percent_coverage"
                  required={edited?.physical_therapy_97XXX === "co_pay"}
                />
              </td>
            </tr>
          )}


          {/* Diagnostic 72XXX */}

          <tr>
            <td>
              <label htmlFor="xrayCoverage">{requireDiv} Diagnostic 72XXX</label>
            </td>
            <td>
              <select
                name="diagnostic_72XXX"
                onChange={handleChange}
                defaultValue={edited?.diagnostic_72XXX}
                id="xrayCoverage"
                style={{ width: "100%", padding: "6px 0", borderRadius: "2px" }}
              >
                <option value="covered">Covered</option>
                <option value="non_covered">Non-covered</option>
                <option value="co_insurance">Co-insurance</option>
                <option value="co_pay">Co-pay</option>
              </select>
            </td>

            <td>
              <Input
                min={0}
                onChange={handleChange}
                defaultValue={edited?.diagnostic_remaining}
                type="number"
                name="diagnostic_remaining"
                id="x_ray_percent_coverage"
                required
              />
            </td>
          </tr>

          {edited?.diagnostic_72XXX === "co_insurance" && (
            <tr>
              <td>{requireDiv} Co-insurance</td>
              <td>
                <Input
                  min={0}
                  onChange={handleChange}
                  defaultValue={edited?.diagnostic_co_insurance}
                  type="number"
                  name="diagnostic_co_insurance"
                  id="x_ray_percent_coverage"
                  required={edited?.physical_therapy_97XXX === "co_insurance"}
                />
              </td>
            </tr>
          )}
          {edited?.diagnostic_72XXX === "co_pay" && (
            <tr>
              <td>{requireDiv} Co-pay</td>
              <td>
                <Input
                  min={0}
                  onChange={handleChange}
                  defaultValue={edited?.diagnostic_co_pay}
                  type="number"
                  name="diagnostic_co_pay"
                  id="x_ray_percent_coverage"
                  required={edited?.physical_therapy_97XXX === "co_pay"}
                />
              </td>
            </tr>
          )}


          {"caseType":"Insurance","feeSchedule":"646f4fb02ba0fdaa2db9c8cf","feeScheduleName":"new testing","insuranceVisits":30,"stageOfCare":"Initial Intensive Care","carePlan":{"Adjustments":{"62a89563b2d008001647874d":{"code":98941,"id":"62a89563b2d008001647874d","visits":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],"_id":"64515a002fdfc1266305acce"}},"AddOns":{},"Exams":{"62a89652b2d00800164787a5":{"code":99212,"id":"62a89652b2d00800164787a5","visits":[12,20,28,36],"_id":"64515a002fdfc1266305accf"}},"months":4,"Therapies":{},"XRays":{"62a8989cb2d00800164787f1":{"code":72050,"id":"62a8989cb2d00800164787f1","visits":[],"_id":"64515a002fdfc1266305acd0"},"62a8998ab2d008001647881b":{"code":72070,"id":"62a8998ab2d008001647881b","visits":[36],"_id":"64515a002fdfc1266305acd1"},"62a89a25b2d008001647885a":{"code":72110,"id":"62a89a25b2d008001647885a","visits":[36],"_id":"64515a002fdfc1266305acd2"},"62a89843b2d00800164787de":{"code":72040,"id":"62a89843b2d00800164787de","visits":[36],"_id":"646f50962ba0fdaa2db9c941"}},"frequency":{"fiveperweek":0,"fourperweek":0,"threeperweek":4,"twoperweek":12,"oneperweek":0,"everyperweek":0},"visits":36,"selectedCode":{"Adjustments":{"62a89563b2d008001647874d":{"code":98941,"id":"62a89563b2d008001647874d","visits":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],"_id":"64515a002fdfc1266305acce"}},"AddOns":{},"Exams":{"62a89652b2d00800164787a5":{"code":99212,"id":"62a89652b2d00800164787a5","visits":[12,20,28,36],"_id":"64515a002fdfc1266305accf"}},"Therapies":{},"XRays":{"62a8989cb2d00800164787f1":{"code":72050,"id":"62a8989cb2d00800164787f1","visits":[],"_id":"64515a002fdfc1266305acd0"},"62a8998ab2d008001647881b":{"code":72070,"id":"62a8998ab2d008001647881b","visits":[36],"_id":"64515a002fdfc1266305acd1"},"62a89a25b2d008001647885a":{"code":72110,"id":"62a89a25b2d008001647885a","visits":[36],"_id":"64515a002fdfc1266305acd2"},"62a89843b2d00800164787de":{"code":72040,"id":"62a89843b2d00800164787de","visits":[36],"_id":"646f50962ba0fdaa2db9c941"}}}},"planName":"Copy of II.36.4"}





 {"Adjustments":{"62a89563b2d008001647874d":{"code":98941,"id":"62a89563b2d008001647874d","visits":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],"_id":"64515a002fdfc1266305acce"}},"AddOns":{},"Exams":{"62a89652b2d00800164787a5":{"code":99212,"id":"62a89652b2d00800164787a5","visits":[12,20,28,36],"_id":"64515a002fdfc1266305accf"}},"Therapies":{},"XRays":{"62a8989cb2d00800164787f1":{"code":72050,"id":"62a8989cb2d00800164787f1","visits":[36],"_id":"64515a002fdfc1266305acd0"},"62a8998ab2d008001647881b":{"code":72070,"id":"62a8998ab2d008001647881b","visits":[36],"_id":"64515a002fdfc1266305acd1"},"62a89a25b2d008001647885a":{"code":72110,"id":"62a89a25b2d008001647885a","visits":[36],"_id":"64515a002fdfc1266305acd2"},"62a89843b2d00800164787de":{"code":72040,"id":"62a89843b2d00800164787de","visits":[36],"_id":"646f50962ba0fdaa2db9c941"}}}
