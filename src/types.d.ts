export interface ICareplan {
  planName?: string;
  stageOfCare?: string;
  visits?: number;
  months?: number;
  frequency?: {
    fiveperweek: number;
    fourperweek: number;
    threeperweek: number;
    twoperweek: number;
    oneperweek: number;
    everyperweek: number;
  };
  adjustments: {
    caseType?: string;
    feeSchedule: ISchedule;
    qty: number;
  };
  exams: {
    [key: string]: {
      item: IExams;
      qty: number;
    };
  };
  xrays: {
    [key: string]: {
      item: IXrays;
      qty: number;
    };
  };
  therapies: {
    [key: string]: {
      item: ITherapy;
      qty: number;
    };
  };
  addons: {
    [key: string]: {
      item: IAddons;
      qty: number;
    };
  };
}

export interface IInsurance {
  company: string;
  effective_date?: Date;
  expiration_date?: Date;
  individual_deductable: number;
  individual_deductable_Met: number;
  family_deductable: number;
  family_deductable_Met: number;
  start_meeting_deductable: "yes" | "no" | "n/a";
  benefitsBase: {
    type?: "Calendar" | "Benefit";
    date?: Date;
  };
  visits_allowed: number;
  visits_used: number;
  allowed_percentage: number;
  amount_max_per_visit: number | undefined;
  visit_co_pay: number;
  exam_co_pay: number;

  x_ray_coverage: "yes" | "no" | "n/a";
  x_ray_percent_coverage: number;
  x_rays_subject_to_deductable: "yes" | "no";

  remaining_deductable:number;
  deductable:number;
  office_visit_992XX: "covered" | "non_covered"|"co_insurance"|"co_pay";
  office_visit_remaining:number;
  office_visit_co_pay:number;
  office_visit_co_insurance: number;
  chiro_benefit_989XX:"covered" | "non_covered"|"co_insurance"|"co_pay";
  chiro_benefit_remaining:number;
  chiro_benefit_co_insurance:number;
  chiro_benefit_co_pay:number;
  physical_therapy_97XXX:"covered" | "non_covered"|"co_insurance"|"co_pay";
  physical_therapy_remaining:number;
  physical_therapy_co_insurance:number;
  physical_therapy_co_pay:number;
  diagnostic_remaining:number;
  diagnostic_72XXX:"covered" | "non_covered"|"co_insurance"|"co_pay"
  diagnostic_co_insurance:number;
  diagnostic_co_pay:number;
}

export interface IUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  permissions?: string[];
  currentCarePlan?: ICareplan;
  previousCarePlans?: ICareplan[];
  primaryInsurence?: IInsurance;
  secondaryInsurence?: IInsurance;
  dob?: date;
  role?: string;
  cash?: string;
  schedule?: ISchedule;
}

export interface ISchedule {
  _id?: string | number;
  name?: string;
  code?: number | string;
  description?: string;
  category: string;
  discount?: number;
  caseType: "Medicare" | "Cash" | "Personal Injury" | "Insurance";
  cost: number;
  companyCost: {
    [key: string]: number;
  };
  salesTax?: boolean;
  disallow?: boolean;
}

export interface IExams {
  name: string;
  code: number | string;
  cost: number;
  companyCost: {
    [key: string]: number;
  };
}

export interface IXrays {
  name: string;
  code: number | string;
  cost: number;
  companyCost: {
    [key: string]: number;
  };
}
export interface IAddons {
  name: string;
  code: number | string;
  cost: number;
  companyCost: {
    [key: string]: number;
  };
}

export interface ITherapy {
  name: string;
  code: number | string;
  cost: number;
  companyCost: {
    [key: string]: number;
  };
}

export type ScheduleData = {
  caseType?: string;
  feeSchedule: ISchedule;
  qty: number;
  total: number;
};

export type ExamData = {
  item: IExams;
  qty: number;
};
export type XrayData = {
  item: IXrays;
  qty: number;
};
export type TherapyData = {
  item: ITherapy;
  qty: number;
};

export type AddonsData = {
  item: IAddons;
  qty: number;
};

export interface IFullCarePlan {
  schedule: ScheduleData;
  exams: ExamData;
  therapy: TherapyData;
  addons: AddonsData;
  xray: XrayData;
  stageOfCare: string;
  carePlan: ICareplan;
  phaseOfDegeneration: string;
  credit: number;
  balance: number;
  patientID: string;
}

export interface CompanyCost {
  [key: string]: number;
}

export interface IcarePlans {
  addons: AddonsData;
  adjustments: {
    caseType: string;
    feeSchedule: ISchedule;
    qty: number;
    total: number;
  };
  balance: number;
  carePlan: string;
  createdAt: string;
  credit: number;
  exams: ExamData;
  insuranceCost: number;
  monthlyPay: number;
  phaseOfDegeneration: string;
  stageOfCare: string;
  therapies: TherapyData;
  totalCost: number;
  totalPay: number;
  updatedAt: string;
  userCost: number;
  xrays: XrayData;
  _id?: string;
}

export interface Itemplate {
  data: object;
  name: string;
  type: string;
  _id?: string;
}

export interface IOptions {
  name: string;
  code: number | string;
  cost: number;
}

export interface codeStruct {
  _id?: string,
  code?: number,
  description: string,
  category: string,
  amount: {
    [key: string]: number,
  },
  discountedAmount: {
    [key: string]: number,
  },
  salesTax: {
    [key: string]: boolean,
  },
  disallow: {
    [key: string]: boolean,
  },
}

export type Codes = {
  _id: string,
  code: number;
  description: string;
  category: "adjustment" | "exam" | "addon" | "xray" | "therapy";
  amount: {
    // personalInjury: number;
    [key: string]: number; // fee schedule name or id with cost
    // feeSchedule1: number
  };
  salesTax: boolean;
  disallow: boolean;
  // more item ...
};

const adjustment1 = {
  code: 99842,
  description: "3-4 adjustment",
  category: "adjustment",
  cost: {
    personalInjury: 65.23,
    insuranceBlue: 45.23, // fee schedule name or id with cost
    // feeSchedule1: number
  },
  salesTax: false,
  disallow: false,
}

const adjustment2 = {
  code: 99843,
  description: "3-4 adjustment",
  category: "adjustment",
  cost: {
    personalInjury: 65.23,
    feeSchedule1: 23.1,
  },
  salesTax: false,
  disallow: {
    PersonalInjury: true,
    blue: false,
  },
}

const exam1 = {
  code: 99843,
  category: "Exams",
  description: "3-4 adjustment",
  cost: {
    feeSchedule2: 60,
    PersonalInjury: 60,
  },
  salesTax: false,
  disallow: {
    PersonalInjury: true,
    blue: false,
  },
}

const PersonalInjury = {
  name: "personal injury",
  scheduleKey: "PersonalInjury",
  caseType: "Personal Injury",
  discount: false,
}

export type FeeSchedule = {
  name: string;
  caseType?: string;
  discount: boolean;
  default: boolean;
};

export type CarePlanTemplate = object;
export type PatientCarePlan = object;
