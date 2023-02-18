import { message } from "antd";

const columnsData = [
  {
    title: "Placeholder (click to copy)",
    dataIndex: "placeholder",
    key: "placeholder",
    render: (text) => (
      <span
        onClick={() => {
          navigator.clipboard.writeText(text);
          message.info(`${text} copied`, 0.5);
        }}
      >
        {text}
      </span>
    ),
  },
  {
    title: "Details",
    dataIndex: "details",
    key: "details",
  },
];

const placeholders = [
  {
    placeholder: "{totalCost}",
    details: "Total amount",
  },
  {
    placeholder: "{outOfPocket}",
    details: "Out of pocket",
  },
  {
    placeholder: "{totalVisit}",
    details: "Total number of visit",
  },
  {
    placeholder: "{totalMonths}",
    details: "Total number of months",
  },
  {
    placeholder: "{fivePerWeek}",
    details: "5 visits per week",
  },
  {
    placeholder: "{fourPerWeek}",
    details: "4 visits per week",
  },
  {
    placeholder: "{threePerWeek}",
    details: "3 visits per week",
  },
  {
    placeholder: "{twoPerWeek}",
    details: "2 visits per week",
  },
  {
    placeholder: "{onePerWeek}",
    details: "1 visit per week",
  },
  {
    placeholder: "{everyPerWeek}",
    details: "Every day visits per week",
  },
  {
    placeholder: "{stageOfCare}",
    details: "Selected stage of care",
  },
  {
    placeholder: "{monthlyPrice}",
    details: "Cost per months",
  },
  {
    placeholder: "{careplanTemplateName}",
    details: "Careplan Template Name",
  },
  {
    placeholder: "{AdjustmentsBreakdown}",
    details: "Adjutstments Codes Breakdown",
  },
  {
    placeholder: "{xraysBreakdown}",
    details: "Xrays Codes Breakdown",
  },
  {
    placeholder: "{TherapiesBreakdown}",
    details: "Therapies Codes Breakdown",
  },
  {
    placeholder: "{examsBreakdown}",
    details: "Exams Codes Breakdown",
  },
  {
    placeholder: "{addonsBreakdown}",
    details: "Addons Codes Breakdown",
  },
  {
    placeholder: "{patientName}",
    details: "Patient name",
  },
  {
    placeholder: "{totalDefaultFeeSchedulePrice}",
    details: "Total Default Fee Schedule Price",
  },
  {
    placeholder: "{totalCareplanPrice}",
    details: "Total Careplan Price",
  },
  {
    placeholder: "{insuranceCoverage}",
    details: "Insurance Coverage",
  },
  {
    placeholder: "{phaseOfDegeneration}",
    details: "Phase of Degeneration",
  },
  {
    placeholder: "{feeSchedule}",
    details: "Fee Schedule",
  },
  {
    placeholder: "{currentDate}",
    details: "Current Date",
  },
  {
    placeholder: "{currentMonth}",
    details: "Current Month",
  },
  {
    placeholder: "{currentYear}",
    details: "Current Year",
  },
  // {
  //   placeholder: "{}",
  //   details: "",
  // },
  // {
  //   placeholder: "{}",
  //   details: "",
  // },
];

/*
  "{totalCost}": number;
"{totalVisit}": number;
"{totalMonths}": number;
"{fivePerWeek}": number;
"{fourPerWeek}": number;
"{threePerWeek}": number;
"{twoPerWeek}": number;
"{onePerWeek}": number;
"{everyPerWeek}": number;
"{stageOfCare}": string;
"{totalDefaultFeeSchedulePrice}": number;
"{totalCareplanPrice}": number;
"{monthlyPrice}": number;
"{outOfPocket}": number;
"{patientName}": string;
"{insuranceCoverage}": number;
"{phaseOfDegeneration}": string;
"{feeSchedule}": string;
"{careplanTemplateName}": string;
*/ 

export { columnsData, placeholders };

