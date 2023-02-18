# Novo Clinic Dashboard

## Routes/Pages List
  * /login - login user, admin, patient
  * /register - register patient only
  * / - *redirect to other menu*
  * /patient-list - management menu, redirect patient to other pages
  * /fee-schedule - management menu, redirect patient to other pages
  * /care-plans-builder - management menu, redirect patient to other pages
  * /team-members - management menu, redirect patient to other pages
  * /user-settings - settings page for changing password, email, name

  * /insurance - patient menu for view/adding insurance details
  * /care-plan - patient menu for view/updating care plan details
  * /previous-care-plans - patient menu for viewing previous care plan lists
  
## Components structure -
  * Login 
  * Register
  * Dashobard
  * PatientList
  * FeeSchedule
  * CarePlanBuilder
  * TeamMembers
  * UserSettings
  * Insurance
  * CarePlan
  * PreviuosCarePlan
  * NotFound


## Work flow
  - Management will add fee schedule, care plan type, exams in their dashboard 
  - User will add their insurance details 
  - User can build a care plan with following data table
    * caseType - cash/medicare/personal injury/Insurance
    * feeSchedule - depending on selected caseType, relevent option will be shown (united, aethena..)
    * cpt - depending on selected feeSchedule, relevent options will be shown (pulled from carePlanType collections)
  - Now they can see total care cost, discounted price, insurance coverage if available, and amount they have to pay per months, and total.
  - 
