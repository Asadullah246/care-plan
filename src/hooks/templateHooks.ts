import { CodeBreakdown } from "../utils/calculatePay";
import { Data } from "../utils/interface";

export const replaceDataOld = (text: any, patient: any, placeHolderData: Data, codesBreakdown: CodeBreakdown) => {
  // const { progressExam, progressXray, foamRoller, denneRoll } = {};
  console.log(codesBreakdown, "break down");
  console.log(patient);
  Object.keys(placeHolderData).forEach((key) => {
    text = text.replaceAll(key, placeHolderData[key]);
  });
  // text = text.replaceAll("{totalVisit}", placeHolderData["{totalVisit}"]);
  // text = text.replaceAll("{totalCost}", cost.totalCost);
  text = text.replaceAll("{patientName}", patient.firstName + " " + patient.lastName);
  const adjustmentsBreakdownData = codesBreakdown?.adjustments?.map((item) => {
    return `${item.code} default cost => ${item.quantity} @ $${item.defaultAmount} = $${item.defaultCost} <br />
            ${item.code} careplan cost => ${item.quantity} @ $${item.careplanAmount} = $${item.careplanCost}
        `;
  });
  text = text.replaceAll("{adjustmentsBreakdown}", adjustmentsBreakdownData);
  const examBreakdownData = codesBreakdown?.exams?.map((item) => {
    return `${item.code} default cost => ${item.quantity} @ $${item.defaultAmount} = $${item.defaultCost} <br />
            ${item.code} careplan cost => ${item.quantity} @ $${item.careplanAmount} = $${item.careplanCost} <br />
        `;
  });
  text = text.replaceAll("{examsBreakdown}", examBreakdownData);
  const xraysBreakdownData = codesBreakdown?.xrays?.map((item) => {
    return `${item.code} default cost => ${item.quantity} @ $${item.defaultAmount} = $${item.defaultCost} <br />
            ${item.code} careplan cost => ${item.quantity} @ $${item.careplanAmount} = $${item.careplanCost} <br />
        `;
  });
  text = text.replaceAll("{xraysBreakdown}", xraysBreakdownData);
  const addonsBreakdownData = codesBreakdown?.addOns?.map((item) => {
    return `${item.code} default cost => ${item.quantity} @ $${item.defaultAmount} = $${item.defaultCost} <br />
            ${item.code} careplan cost => ${item.quantity} @ $${item.careplanAmount} = $${item.careplanCost} <br />
        `;
  });
  text = text.replaceAll("{addonsBreakdown}", addonsBreakdownData);
  const therapiesBreakdownData = codesBreakdown?.therapies?.map((item) => {
    return `${item.code} default cost => ${item.quantity} @ $${item.defaultAmount} = $${item.defaultCost} <br />
            ${item.code} careplan cost => ${item.quantity} @ $${item.careplanAmount} = $${item.careplanCost} <br />
        `;
  });
  text = text.replaceAll("{therapiesBreakdown}", therapiesBreakdownData);
  text = text.replaceAll("{currentDate}", new Date().getDate());
  text = text.replaceAll("{currentMonth}", new Date().getMonth() + 1);
  text = text.replaceAll("{currentYear}", new Date().getFullYear());
  return text;
};

export const replaceData = (text: any, patient: any, placeHolderData: Data, codesBreakdown: CodeBreakdown) => {
  // const { progressExam, progressXray, foamRoller, denneRoll } = {};
  console.log(codesBreakdown, "break down");
  console.log(placeHolderData["{insuranceCoverage}"])
  Object.keys(placeHolderData).forEach((key) => {
    text = text.replaceAll(key, placeHolderData[key]);
  });
  // text = text.replaceAll("{totalVisit}", placeHolderData["{totalVisit}"]);
  // text = text.replaceAll("{totalCost}", cost.totalCost);
  text = text.replaceAll("{patientName}", patient.firstName + " " + patient.lastName);
  const totalAdjustment = codesBreakdown?.adjustments.reduce((t, c) => t + c.quantity, 0);
  const adjustmentsBreakdownCodes = codesBreakdown?.adjustments
    ?.map((item) => {
      return `${item.code} = ${item.quantity}`;
    })
    .join(" ");
  const adjustmentsBreakdownData = `Adjustment Total = ${totalAdjustment} <br/>
            Breakdowns: ${adjustmentsBreakdownCodes}
        `;
  text = text.replaceAll("{AdjustmentsBreakdown}", adjustmentsBreakdownData);
  const totalExams = codesBreakdown?.exams.reduce((t, c) => t + c.quantity, 0);

  const examBreakdownDataCodes = codesBreakdown?.exams
    ?.map((item) => {
      return `${item.code} = ${item.quantity}`;
    })
    .join(" ");
  const examBreakdownData = `Exam Total = ${totalExams} <br/>
            Breakdowns: ${examBreakdownDataCodes}
        `;
  text = text.replaceAll("{examsBreakdown}", examBreakdownData);

  //   xrays data
  const totalXrays = codesBreakdown?.xrays.reduce((t, c) => t + c.quantity, 0);

  const xraysCodes = codesBreakdown?.xrays
    ?.map((item) => {
      return `${item.code} = ${item.quantity}`;
    })
    .join(" ");
  const xraysBreakdownData = `Xrays Total = ${totalXrays} <br/>
            Breakdowns: ${xraysCodes}
        `;
  text = text.replaceAll("{xraysBreakdown}", xraysBreakdownData);
  const totalAddons = codesBreakdown?.addOns.reduce((t, c) => t + c.quantity, 0);

  const addonsBreakdownCodes = codesBreakdown?.addOns?.map((item) => {
    return `${item.code} = ${item.quantity}`;
  });
  const addonsBreakdownData = `Addons Total = ${totalAddons} <br/>
            Breakdowns: ${addonsBreakdownCodes}
        `;
  text = text.replaceAll("{addonsBreakdown}", addonsBreakdownData);
  const totalTherapies = codesBreakdown?.therapies.reduce((t, c) => t + c.quantity, 0);

  const therapiesBreakdownCodes = codesBreakdown?.therapies?.map((item) => {
    return `${item.code} = ${item.quantity}`;
  });
  const therapiesBreakdownData = `Therapies Total = ${totalTherapies} <br/>
            Breakdowns: ${therapiesBreakdownCodes}
        `;
  text = text.replaceAll("{therapiesBreakdown}", therapiesBreakdownData);
  text = text.replaceAll("{currentDate}", new Date().getDate());
  text = text.replaceAll("{currentMonth}", new Date().getMonth() + 1);
  text = text.replaceAll("{currentYear}", new Date().getFullYear());
  return text;
};

/*
    {totalVisit} @ {adjustmentCost} = {totalAdjustmentCost}
    {progreessExam} @ {examCost} = {progreessExam * cost}

*/ 