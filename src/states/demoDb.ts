import {
  IAddons,
  IExams,
  IInsurance,
  ISchedule,
  ITherapy,
  IXrays
} from "../types";

export const users = [
  {
    email: "admin@email.com",
    name: "Dr. Shane Davidson",
    role: "administrator",
    permissions: [
      "insurance-tab",
      "fee-schedules",
      "build-care-plan",
      "patient",
      "team-member",
    ],
  },
  {
    email: "test@ishtiak.com",
    name: "Ishtiak Ahmed",
    role: "management",
    permissions: ["insurance-tab", "fee-schedules"],
  },
  {
    email: "test@ishtiak.co",
    name: "Ishtiak",
    role: "management",
    permissions: ["insurance-tab"],
  },
  { email: "john@doe.com", name: "John Doe", role: "patient", permissions: [] },
  { email: "jane@doe.com", name: "Jane Doe", role: "patient", permissions: [] },
];

export const demoPlan = [
  { planName: "11.54.23", stage: "Initial Intensive Care" },
  { planName: "CC.68", stage: "Corrective Care" },
  { planName: "11.52.22", stage: "Initial Intensive Care" },
];

export const feeSchedulesData: ISchedule[] = [
  {
    _id: 1,
    name: "Personal Injury 1",
    caseType: "Cash",
    cost: 45,
    companyCost: {},
    category: "Adjustment",
    code: 99021,
    description: "Demo Schedule Description",
    disallow: false,
    discount: 0,
    salesTax: false,
  },
  {
    _id: 2,
    name: "Personal Injury 2",
    caseType: "Insurance",
    cost: 48,
    category: "New Patient",
    code: 99023,
    description: "Demo Schedule Description",
    disallow: false,
    discount: 0,
    salesTax: false,
    companyCost: {},
  },
  {
    _id: 3,
    name: "Personal Injury 3",
    caseType: "Insurance",
    cost: 43,
    category: "Adjustment",
    code: 99024,
    description: "Demo Schedule Description",
    disallow: false,
    discount: 0,
    salesTax: false,
    companyCost: {},
  },
  {
    _id: 4,
    name: "Medicare schedule 1",
    caseType: "Medicare",
    cost: 50,
    category: "New Patient",
    code: 99041,
    description: "Demo Schedule Description",
    disallow: false,
    discount: 0,
    salesTax: false,
    companyCost: {},
  },
  {
    _id: 5,
    name: "Medicare schedule 1",
    caseType: "Personal Injury",
    cost: 45.5,
    category: "New Patient",
    code: 99061,
    description: "Demo Schedule Description",
    disallow: false,
    discount: 0,
    salesTax: false,
    companyCost: {},
  },
];

export const examsDemoData: IExams[] = [
  {
    name: "Demo Exams 1",
    code: 55011,
    cost: 35,
    companyCost: { red: 30, blue: 32 },
  },
  { name: "Demo Exams 2", code: 55021, cost: 44, companyCost: { red: 30 } },
  { name: "Demo Exams 3", code: 55012, cost: 45, companyCost: { red: 30 } },
];

export const xraysDemoData: IXrays[] = [
  { name: "Demo xrays 1", code: 75011, cost: 55, companyCost: { red: 30 } },
  { name: "Demo xrays 2", code: 75021, cost: 50, companyCost: { red: 30 } },
  { name: "Demo xrays 3", code: 75012, cost: 48, companyCost: {} },
];

export const therapiesDemoData: ITherapy[] = [
  { name: "Therapy demo 1", code: 88011, cost: 24, companyCost: { red: 30 } },
  { name: "Therapy demo 2", code: 88012, cost: 30, companyCost: { red: 30 } },
];
export const addonsDemoData: IAddons[] = [
  { name: "Foam Roller", code: 33011, cost: 20, companyCost: { red: 30 } },
  { name: "Denne Roller", code: 33012, cost: 20, companyCost: { red: 30 } },
];

export const caseType = ["Personal Injury", "Insurance", "Medicare", "Cash"];

export const demoInsurance: IInsurance = {
  company: "red",
  // effective_date: new Date("1 Jan, 2022"),
  // expiration_date: new Date("31 Dec, 2022"),
  exam_co_pay: 80,
  family_deductable: 3000,
  family_deductable_Met: 1000,
  individual_deductable: 2000,
  individual_deductable_Met: 1200,
  start_meeting_deductable: "yes",
  visits_allowed: 30,
  benefitsBase: { type: "Benefit", date: new Date() },
  visits_used: 5,
  allowed_percentage: 80,
  amount_max_per_visit: 50,
  visit_co_pay: 20,
  co_insurance: 50,
  x_ray_coverage: "yes",
  x_ray_percent_coverage: 50,
  x_rays_subject_to_deductable: "yes",
  office_visit_992XX:"covered",
};
