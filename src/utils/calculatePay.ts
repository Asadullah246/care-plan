import store from "../store/store";
import { codeStruct, ICareplan, IInsurance } from "../types";
import { Data } from "./interface";

// get covered visits
// uncovered visits
// covered exams
// uncovered exams
// covered addons
// uncovered addons
// covered therapy
// uncovered therapy
// covered xray

export interface SingleCodeBreakdown {
  code: number | string;
  quantity: number;
  defaultAmount: number;
  careplanAmount: number;
  defaultCost: number;
  careplanCost: number;
}

export interface CodeBreakdown {
  adjustments: SingleCodeBreakdown[];
  exams: SingleCodeBreakdown[];
  addOns: SingleCodeBreakdown[];
  therapies: SingleCodeBreakdown[];
  xrays: SingleCodeBreakdown[];
  [key: string]: SingleCodeBreakdown[];
}

export const calculateCost = (plan: ICareplan, insurance: IInsurance) => {
  const {
    company,
    allowed_percentage,
    x_ray_percent_coverage,
    x_rays_subject_to_deductable,
  } = insurance;
  const deductLeft =
    insurance.individual_deductable - insurance.individual_deductable_Met;
  const coveredVisits = insurance.visits_allowed - insurance.visits_used;
  const uncoveredVisits = plan.adjustments.qty - coveredVisits;

  const coveredVisitsCost =
    company in (plan.adjustments.feeSchedule.companyCost || {})
      ? coveredVisits * plan.adjustments.feeSchedule.companyCost[company]
      : coveredVisits * plan.adjustments.feeSchedule.cost;

  const coveredVisitsShareCost =
    coveredVisitsCost > deductLeft
      ? ((coveredVisitsCost - deductLeft) * (100 - allowed_percentage)) / 100
      : 0;
  const uncoveredVisitsCost =
    uncoveredVisits * plan.adjustments.feeSchedule.cost;

  const examCost = Object.keys(plan.exams)
    ?.map((ex) => plan.exams[ex].item.cost * plan.exams[ex].qty)
    .reduce((sum, cur) => sum + cur, 0);

  const xrayCost = Object.keys(plan.xrays)
    ?.map((x) => plan.xrays[x].item.cost * plan.xrays[x].qty)
    .reduce((sum, cur) => sum + cur, 0);
  const xrayCostCoverage =
    x_ray_percent_coverage > 0
      ? (xrayCost * (x_ray_percent_coverage || 0)) / 100
      : 0;
  const xrayCostUser = xrayCost - xrayCostCoverage;
  const addonsCost = Object.keys(plan.addons)
    ?.map((ex) => plan.addons[ex].item.cost * plan.addons[ex].qty)
    .reduce((sum, cur) => sum + cur, 0);
  const therapyCost = Object.keys(plan.therapies || {})
    .map((ex) => plan.therapies[ex].item.cost * plan.therapies[ex].qty)
    .reduce((sum, cur) => sum + cur, 0);
  const insuranceCost =
    coveredVisitsCost - coveredVisitsShareCost + xrayCostCoverage;

  const userCost =
    coveredVisitsShareCost +
    uncoveredVisitsCost +
    examCost +
    xrayCostUser +
    therapyCost +
    addonsCost;
  return { insuranceCost, userCost };
};

export const carePlanCalculation = (
  codeList: codeStruct[],
  clientPlan: any,
  defaultFS: any
) => {
  if (clientPlan.caseType !== "Insurance") {
    return latestCalculations(codeList, clientPlan, defaultFS);
  } else {
    // return insuranceCalculationFix(codeList, clientPlan, defaultFS);
    return insuranceCalculation(codeList, clientPlan, defaultFS);
  }
};

// calculation for without insurance

export const latestCalculations = (
  codeList: codeStruct[],
  clientPlan: any,
  defaultFS: any
) => {
  // console.log("clie",clientPlan);
  const placeHolderData: Data = {} as Data;
  const codesBreakdown: any = {
    adjustments: [],
    exams: [],
    addOns: [],
    xrays: [],
    therapies: [],
  };
  let insuranceVisits = clientPlan.insuranceVisits;
  // console.log(clientPlan, "plan");

  if (!clientPlan.carePlan)
    return {
      costSummary: {
        userCost: 0,
        totalCost: 0,
        insuranceCoverage: 0,
        monthlyCost: 0,
        defaultFeeScheduleCost: 0,
      },
      placeHolderData: {},
      codesBreakdown,
    };
  if (clientPlan.caseType !== "Insurance") insuranceVisits = 0;
  Object.values(clientPlan.carePlan.Exams).forEach((item: any) => {
    codesBreakdown.exams.push({
      code: item.code,
      quantity: item.visits.length,
    });
  });
  Object.values(clientPlan.carePlan.AddOns).forEach((item: any) => {
    codesBreakdown.addOns.push({
      code: item.code,
      quantity: item.visits.length,
    });
  });
  Object.values(clientPlan.carePlan.Adjustments).forEach((item: any) => {
    codesBreakdown.adjustments.push({
      code: item.code,
      quantity: item.visits.length,
    });
  });
  Object.values(clientPlan.carePlan.XRays).forEach((item: any) => {
    codesBreakdown.xrays.push({
      code: item.code,
      quantity: item.visits.length,
    });
  });
  Object.values(clientPlan.carePlan.Therapies).forEach((item: any) => {
    codesBreakdown.therapies.push({
      code: item.code,
      quantity: item.visits.length,
    });
  });
  const adjustments: any = Object.values(clientPlan.carePlan.Adjustments);
  const exams = Object.values(clientPlan.carePlan.Exams);
  const xrays = Object.values(clientPlan.carePlan.XRays);
  const therapies = Object.values(clientPlan.carePlan.Therapies);
  const addOns = Object.values(clientPlan.carePlan.AddOns);

  const getCodeCost2 = (items: any, name: string) => {
    let covered = 0;
    let uncovered = 0;
    let defaultCost = 0;
    let discounted = 0;


    if (!items.length) return { covered, uncovered, defaultCost, discounted };

    items.forEach((item: any) => {
      const code = codeList?.find((code) => item.code == code.code);

      console.log("new code ", code);

      const amount =
        code?.amount?.[clientPlan.feeSchedule] ||
        code?.amount?.[defaultFS._id] ||
        0;

      // discountedAmount
      const discountedAmount = code?.discountedAmount?.[clientPlan.feeSchedule] || amount ;

      console.log("diss", code?.discountedAmount?.[clientPlan.feeSchedule]);

      const defaultAmount = code?.amount?.[defaultFS?.id] || 0;
      const cost = defaultAmount * item.visits.length;
      defaultCost += cost;

      item.visits.forEach((vis: number) => {
        if (vis <= insuranceVisits) {
          covered += amount;
          // discounted += (amount -discountedAmount )
        } else {
          uncovered += amount;
          discounted += (amount -discountedAmount )
        }
      });
    });

    return { covered, uncovered, defaultCost, discounted };
  };
  const adjustmentCost = getCodeCost2(adjustments, "adjustments");
  const examsCost = getCodeCost2(exams, "exams");
  const xraysCost = getCodeCost2(xrays, "xrays");
  const therapiesCost = getCodeCost2(therapies, "therapies");
  const addonsCost = getCodeCost2(addOns, "addOns");
  // console.log("ad dis",adjustmentCost.discounted);
  // console.log("exam dis",examsCost.discounted);
  // console.log("exary dis",xraysCost.discounted);
  // console.log("therapiesCost dis",therapiesCost.discounted);
  // console.log("addonsCost dis",addonsCost.discounted);

  const insuranceCoverage = Number(
    (
      adjustmentCost.covered +
      examsCost.covered +
      therapiesCost.covered +
      xraysCost.covered +
      addonsCost.covered
    ).toFixed(2)
  );
  const userCost = Number(
    (
      adjustmentCost.uncovered +
      examsCost.uncovered +
      therapiesCost.uncovered +
      xraysCost.uncovered +
      addonsCost.uncovered
    ).toFixed(2)
  );
  const discount = Number(
    (
      Number(adjustmentCost.discounted) +
      Number(examsCost.discounted) +
      Number(therapiesCost.discounted) +
      Number(xraysCost.discounted) +
      Number(addonsCost.discounted)
    ).toFixed(2)
  );
  const discountedAmount = Number(userCost - discount).toFixed(2);

  console.log('discount amount ', discount);
  const totalCost = insuranceCoverage + userCost;
  const monthlyCost = Number(
    (userCost / clientPlan.carePlan.months).toFixed(2)
  );
  const defaultFeeScheduleCost =
    adjustmentCost.defaultCost +
    examsCost.defaultCost +
    therapiesCost.defaultCost +
    xraysCost.defaultCost +
    addonsCost.defaultCost;

  placeHolderData["{totalVisit}"] = clientPlan.carePlan.visits;
  placeHolderData["{totalCost}"] = totalCost;
  placeHolderData["{totalMonths}"] = clientPlan.carePlan.months;
  placeHolderData["{fivePerWeek}"] = clientPlan.carePlan.frequency.fiveperweek;
  placeHolderData["{fourPerWeek}"] = clientPlan.carePlan.frequency.fourperweek;
  placeHolderData["{threePerWeek}"] =
    clientPlan.carePlan.frequency.threeperweek;
  placeHolderData["{twoPerWeek}"] = clientPlan.carePlan.frequency.twoperweek;
  placeHolderData["{onePerWeek}"] = clientPlan.carePlan.frequency.oneperweek;
  placeHolderData["{everyPerWeek}"] =
    clientPlan.carePlan.frequency.everyperweek;
  placeHolderData["{stageOfCare}"] = clientPlan.stageOfCare;
  placeHolderData["{totalDefaultFeeSchedulePrice}"] = defaultFeeScheduleCost;
  placeHolderData["{totalCareplanPrice}"] = totalCost;
  placeHolderData["{outOfPocket}"] = userCost || 0;
  placeHolderData["{insuranceCoverage}"] = insuranceCoverage;
  placeHolderData["{monthlyPrice}"] = monthlyCost;
  // placeHolderData["{patientName}"] = 'john doe';
  placeHolderData["{phaseOfDegeneration}"] = clientPlan.phaseOfDegenration;
  placeHolderData["{feeSchedule}"] = clientPlan.feeScheduleName;
  placeHolderData["{careplanTemplateName}"] = clientPlan.planName;
  // need to add placeholder data for exams, xray, addons and therapies like adjustment. But they have muiltiple items.
  const costSummary = {
    totalCost,
    insuranceCoverage,
    userCost,
    monthlyCost,
    defaultFeeScheduleCost,
    discountedAmount,
  };
  return { costSummary, placeHolderData, codesBreakdown };
};

// Update calculation steps
// Return default full cost
// user cost -> new calculation
// insurance coverage -> new calculation
// insurance savings -> new

export const insuranceCalculation = (
  codeList: codeStruct[],
  clientPlan: any,
  defaultFS: any
) => {
  const storeData = store.getState();
  // console.log("store data ", { storeData });
  const insurance = storeData.patient.insurance;
  // console.log("patient", storeData.patient);
  console.log("ins" , insurance);

// insurance states


// conditions

//   allowed_percentage
//   amount_max_per_visit
//   co_insurance
//   exam_co_paystart_meeting_deductable
// visit_co_pay
// x_ray_coverage
// x_rays_subject_to_deductable

// others

//   individual_deductable
//   individual_deductable_Met

//   allowed_percentage
// :
// 7
// amount_max_per_visit
// :
// 9
// benefitsBase
// :
// {type: 'Benefit', date: '2022-07-17T14:25:38.047Z'}
// co_insurance
// :
// 1
// company
// :
// "test company"
// createdAt
// :
// "2022-07-17T14:25:58.439Z"
// effective_date
// :
// "2022-07-19T00:00:00.000Z"
// exam_co_pay
// :
// 1
// expiration_date
// :
// "2022-07-27T00:00:00.000Z"
// family_deductable
// :
// 44556
// family_deductable_Met
// :
// 1110
// id
// :
// "62d41bf699494b00161c9c30"
// individual_deductable
// :
// 1223
// individual_deductable_Met
// :
// 124
// start_meeting_deductable
// :
// "yes"
// updatedAt
// :
// "2022-07-17T14:25:58.439Z"
// visit_co_pay
// :
// 2
// visits_allowed
// :
// 3
// visits_used
// :
// 4
// x_ray_coverage
// :
// "no"
// x_rays_subject_to_deductable
// :
// "no"
// _id
// :
// "62d41bf699494b00161c9c30"

  const placeHolderData: Data = {} as Data;
  // const codesBreakdown: CodeBreakdown = {
  //   adjustments: [],
  //   exams: [],
  //   addOns: [],
  //   xrays: [],
  //   therapies: [],
  // };
  const codesBreakdown: any = {
    adjustments: [],
    exams: [],
    addOns: [],
    xrays: [],
    therapies: [],
  };

  // remaining visits
  const insuranceVisits = insurance.visits_allowed - insurance.visits_used;

  // deductableLeft

  const deductableLeft =
    insurance.individual_deductable - insurance.individual_deductable_Met;

  const co_insurance = insurance.co_insurance;
  if (!clientPlan.carePlan)
    return {
      costSummary: {
        userCost: 0,
        totalCost: 0,
        insuranceCoverage: 0,
        monthlyCost: 0,
        defaultFeeScheduleCost: 0,
        insuranceSavings: 0,
      },
      placeHolderData: {},
      codesBreakdown,
    };

  const calculations = {
    deductableMet: 0,
    insuranceCoverage: 0,
    insuranceSavings: 0,
    userCost: 0,
    // changed
    totalcost: 0,
  };

  console.log("careplan", clientPlan.carePlan);
  for (let i = 1; i <= clientPlan.carePlan.visits; i++) {

 let currentVisitCost=0

    if(insurance.amount_max_per_visit && insurance.amount_max_per_visit > -1 && (insurance.visits_allowed >= i) ){
      currentVisitCost=insurance.amount_max_per_visit
    }
 else {
  const adjustmentCost = getCodeCost(
    clientPlan.carePlan.Adjustments,
    i,
    clientPlan.feeSchedule,
    defaultFS._id,
    codeList,
    clientPlan.carePlan.visits,
    "adjustment",
    insurance
  );
  const examCost = getCodeCost(
    clientPlan.carePlan.Exams,
    i,
    clientPlan.feeSchedule,
    defaultFS._id,
    codeList,
    clientPlan.carePlan.visits,
    "exam",
    insurance
  );
  const xrayCost = getCodeCost(
    clientPlan.carePlan.XRays,
    i,
    clientPlan.feeSchedule,
    defaultFS._id,
    codeList,
    clientPlan.carePlan.visits,
    "xrays",
    insurance
  );
  const addonsCost = getCodeCost(
    clientPlan.carePlan.AddOns,
    i,
    clientPlan.feeSchedule,
    defaultFS._id,
    codeList,
    clientPlan.carePlan.visits,
    "addons",
    insurance
  );
  const therapiesCost = getCodeCost(
    clientPlan.carePlan.Therapies,
    i,
    clientPlan.feeSchedule,
    defaultFS._id,
    codeList,
    clientPlan.carePlan.visits,
    "therapies",
    insurance
  );

   currentVisitCost =
      adjustmentCost + addonsCost + examCost + xrayCost + therapiesCost;

    // calculations.totalcost +=currentVisitCost;

    if (deductableLeft > calculations.deductableMet + currentVisitCost) {
      calculations.deductableMet += currentVisitCost;
    }

    else {
      if (insurance.visits_allowed >= i) {
        // calculation deductableLeft <> insuranceVisits

        // let cost =0

        const cost = co_insurance
          ? (currentVisitCost * co_insurance) / 100
          : currentVisitCost;
        calculations.insuranceSavings += currentVisitCost - cost;
        calculations.userCost += cost;
      } else {
        calculations.userCost += currentVisitCost;
      }
    }
 }

  }
  const defaultFullCost = getDefaultFullCost(
    codeList,
    clientPlan.carePlan,
    defaultFS._id
  ); // need to calculate

  placeHolderData["{totalVisit}"] = clientPlan.carePlan.visits;
  placeHolderData["{totalCost}"] = defaultFullCost;
  placeHolderData["{totalMonths}"] = clientPlan.carePlan.months;
  placeHolderData["{fivePerWeek}"] = clientPlan.carePlan.frequency.fiveperweek;
  placeHolderData["{fourPerWeek}"] = clientPlan.carePlan.frequency.fourperweek;
  placeHolderData["{threePerWeek}"] =
    clientPlan.carePlan.frequency.threeperweek;
  placeHolderData["{twoPerWeek}"] = clientPlan.carePlan.frequency.twoperweek;
  placeHolderData["{onePerWeek}"] = clientPlan.carePlan.frequency.oneperweek;
  placeHolderData["{everyPerWeek}"] =
    clientPlan.carePlan.frequency.everyperweek;
  placeHolderData["{stageOfCare}"] = clientPlan.stageOfCare;
  placeHolderData["{totalDefaultFeeSchedulePrice}"] = defaultFullCost;
  placeHolderData["{totalCareplanPrice}"] = defaultFullCost;
  placeHolderData["{outOfPocket}"] = reducedNumberToFixed(
    calculations.userCost
  );
  placeHolderData["{insuranceCoverage}"] = reducedNumberToFixed(
    calculations.insuranceCoverage
  );
  placeHolderData["{monthlyPrice}"] = reducedNumberToFixed(
    calculations.userCost / clientPlan.carePlan.months
  );
  // placeHolderData["{patientName}"] = 'john doe';
  placeHolderData["{phaseOfDegeneration}"] = clientPlan.phaseOfDegenration;
  placeHolderData["{feeSchedule}"] = clientPlan.feeScheduleName;
  placeHolderData["{careplanTemplateName}"] = clientPlan.planName;
  Object.values(clientPlan.carePlan.Exams).forEach((item: any) => {
    codesBreakdown.exams.push({
      code: item.code,
      quantity: item.visits.length,
    });
  });
  Object.values(clientPlan.carePlan.AddOns).forEach((item: any) => {
    codesBreakdown.addOns.push({
      code: item.code,
      quantity: item.visits.length,
    });
  });
  Object.values(clientPlan.carePlan.Adjustments).forEach((item: any) => {
    codesBreakdown.adjustments.push({
      code: item.code,
      quantity: item.visits.length,
    });
  });
  Object.values(clientPlan.carePlan.XRays).forEach((item: any) => {
    codesBreakdown.xrays.push({
      code: item.code,
      quantity: item.visits.length,
    });
  });
  Object.values(clientPlan.carePlan.Therapies).forEach((item: any) => {
    codesBreakdown.therapies.push({
      code: item.code,
      quantity: item.visits.length,
    });
  });
  return {
    costSummary: {
      userCost: reducedNumberToFixed(calculations.userCost),
      totalCost: calculations.totalcost,
      insuranceCoverage: reducedNumberToFixed(calculations.deductableMet),
      insuranceSavings: reducedNumberToFixed(calculations.insuranceSavings),
      monthlyCost: reducedNumberToFixed(
        calculations.userCost / clientPlan.carePlan.months
      ),
      defaultFeeScheduleCost: defaultFullCost,
    },
    placeHolderData,
    codesBreakdown,
  };
};

const getDefaultCodeAmount = (
  codeList: codeStruct[],
  codeId: number,
  defaultFS: string
) => {
  const code = codeList?.find((item) => item.code == codeId);
  const amount = code?.amount[defaultFS] || 0;
  return amount;
};

const getDefaultFullCost = (
  codeList: codeStruct[],
  carePlan: any,
  defaultFS: string
) => {
  const adjustmentCost = Object.values(carePlan.Adjustments)
    .map((codeItem: any) => {
      return (
        getDefaultCodeAmount(codeList, codeItem.code, defaultFS) *
        codeItem.visits.length
      );
    })
    .reduce((total, current) => total + current, 0);
  const examsCost = Object.values(carePlan.Exams)
    .map((codeItem: any) => {
      return (
        getDefaultCodeAmount(codeList, codeItem.code, defaultFS) *
        codeItem.visits.length
      );
    })
    .reduce((total, current) => total + current, 0);
  const therapyCost = Object.values(carePlan.Therapies)
    .map((codeItem: any) => {
      return (
        getDefaultCodeAmount(codeList, codeItem.code, defaultFS) *
        codeItem.visits.length
      );
    })
    .reduce((total, current) => total + current, 0);
  const addonsCost = Object.values(carePlan.AddOns)
    .map((codeItem: any) => {
      return (
        getDefaultCodeAmount(codeList, codeItem.code, defaultFS) *
        codeItem.visits.length
      );
    })
    .reduce((total, current) => total + current, 0);
  const xraysCost = Object.values(carePlan.XRays)
    .map((codeItem: any) => {
      return (
        getDefaultCodeAmount(codeList, codeItem.code, defaultFS) *
        codeItem.visits.length
      );
    })
    .reduce((total, current) => total + current, 0);
  return xraysCost + addonsCost + therapyCost + examsCost + adjustmentCost;
};

// conditions

//   allowed_percentage took .......
//   amount_max_per_visit -took ......
//   co_insurance-took.........
//   exam_co_paystart_meeting_deductable
// visit_co_pay
// x_ray_coverage
// x_rays_subject_to_deductable

const getCodeCost = (
  planItem: any,
  i: number,
  feeSchedule: string,
  defaultFS: string,
  codeList: codeStruct[],
  visits:any,
  itemName:string,
  insurance:any
) => {

  const cost = Object.values(planItem)
    .map((codeItem: any) => {
      if(itemName=="exam"){
        const examDistance=visits / codeItem.visits.length
        if(i%examDistance==0){
          const code = codeList?.find((item) => item.code == codeItem.code);

          const amount =
            code?.amount[feeSchedule] || code?.amount[defaultFS] || 0;
          return amount;
        }

      }
     else if(itemName=="xrays"){

        if(i == visits){
          const code = codeList?.find((item) => item.code == codeItem.code);
          const amount =
            code?.amount[feeSchedule] || code?.amount[defaultFS] || 0;
          return amount;
        }

      }
     else if(itemName=="addons"){

        if(i == visits){
          const code = codeList?.find((item) => item.code == codeItem.code);
          const amount =
            code?.amount[feeSchedule] || code?.amount[defaultFS] || 0;
          return amount;
        }

      }
     else if(itemName=="therapies"){

        if(i == visits){
          const code = codeList?.find((item) => item.code == codeItem.code);
          const amount =
            code?.amount[feeSchedule] || code?.amount[defaultFS] || 0;
          return amount;
        }

      }
     else if (codeItem.visits.includes(i) || itemName=="adjustment") {
        const code = codeList?.find((item) => item.code == codeItem.code);
        const amount =
          code?.amount[feeSchedule] || code?.amount[defaultFS] || 0;
        return amount;
      }
      return 0;
    })
    .reduce((total, current) => total + current, 0);
  return cost;
};

export const reducedNumberToFixed = (num: number, fix = 2) => {
  return Number(num.toFixed(fix));
};

// strategy
/*
    deductableLeft = 1740
    userPay = 0
    insuranceCoverage = 0;
    insuranceSavings = 0;
    visit left = 19
    deductableMet = 0;

  * add current visit cost to deductable met until it remain less then deductable left
  * if it is going above deductable left, add to user cost
  * if visit number is less then visit left, calculate with user co insurance %
  * add cost to user cost
  * add savings to insurance savings
  * return calculation

*/
