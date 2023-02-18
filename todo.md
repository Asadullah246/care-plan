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