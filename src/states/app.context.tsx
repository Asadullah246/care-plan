import { createContext, useEffect, useState } from "react";

import { findPatient, getCodeList, getDefaultFeeSchedule, getTemplateList, refreshUser } from "../api";
import { AddonsData, codeStruct, ExamData, ISchedule, Itemplate, ScheduleData, TherapyData, XrayData } from "../types";
import { carePlanCalculation, CodeBreakdown } from "../utils/calculatePay";
import { Data } from "../utils/interface";
import { caseType } from "./demoDb";

export const AppContext = createContext<any>({});
export const AppContextProvider = ({ children }: any) => {
  const [visit, setVisit] = useState(0);
  const [placeHolderData, setPlaceHolderData] = useState<Data>({} as Data);
  const [codesBreakdown, setCodesBreakdown] = useState<CodeBreakdown>({} as CodeBreakdown);
  const [user, setUser] = useState<any>({});
  const [patient, setPatient] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [checkIns, setCheckIns]=useState(true)
  const [cost, setCost] = useState<any>({
    totalCost: 0,
    insuranceCoverage: 0,
    userCost: 0,
    monthlyCost: 0,
    defaultFeeScheduleCost: 0,
  });
  const [feeSchedule, setFeeSchedule] = useState("");
  const [defaultFS, setDefaultFS] = useState();
  const [carePlan, setCarePlan] = useState();
  const [codeList, setCodeList] = useState<codeStruct[]>([]);
  const [selectedCode, setSelectedCode] = useState({
    Adjustments: {},
    Exams: {},
    XRays: {},
    Therapies: {},
    AddOns: {},
  });
  const [selectedData, setSelectedData] = useState<ScheduleData>({
    caseType: caseType[0],
    qty: 0,
    total: 0,
    feeSchedule: {} as ISchedule,
  });
  const [selectedExam, setSelectedExam] = useState<{ [key: string]: ExamData }>({});
  const [selectedXray, setSelectedXray] = useState<{ [key: string]: XrayData }>({});
  const [selectedTherapy, setSelectedTherapy] = useState<{
    [key: string]: TherapyData;
  }>({});
  const [selectedAddons, setSelectedAddons] = useState<{
    [key: string]: AddonsData;
  }>({});
  const [templateList, setTemplateList] = useState<Itemplate[]>([]);

  const [clientPlan, setClientPlan] = useState<any>({ insuranceVisits: 0 });
  const [gettingPatient, setGettingPatient]=useState<any>(true)
  const [clientPlanUpdate, setClientPlanUpdate]=useState<any>(false)

  const gettingTemplateBuilderList = async () => {
    const res = await getTemplateList();
    if (res) setTemplateList(res);
  };
  const getCarePlan = () => {
    return {
      adjustments: selectedData,
      exams: selectedExam,
      xrays: selectedXray,
      addons: selectedAddons,
      therapies: selectedTherapy,
    };
  };
  const gettingCodeList = async () => {
    const res = await getCodeList();
    const defaultRes = await getDefaultFeeSchedule();
    const resArray = res?.data?.codeList;
    setCodeList(resArray);
    setDefaultFS(defaultRes?.data?.schedule);
  };
  const getPatient = async (id: string) => {

    const res = await findPatient(id);
    setPatient(res.data.patient);
    return res.data.patient;
  }

  const context = {
    user,
    setUser,
    loading,
    selectedData,
    setSelectedData,
    selectedExam,
    setSelectedExam,
    selectedXray,
    setSelectedXray,
    selectedTherapy,
    setSelectedTherapy,
    selectedAddons,
    setSelectedAddons,
    getCarePlan,
    cost,
    templateList,
    gettingTemplateBuilderList,
    selectedCode,
    setSelectedCode,
    feeSchedule,
    setFeeSchedule,
    carePlan,
    setCarePlan,
    defaultFS,
    clientPlan,
    setClientPlan,
    codeList,
    setCodeList,
    gettingCodeList,
    visit,
    setVisit,
    getPatient,
    patient,
    placeHolderData,
    codesBreakdown,
    checkIns,
    setCheckIns,
    gettingPatient,
    setGettingPatient,
    clientPlanUpdate,
    setClientPlanUpdate
  };

  const getUser = async (refresh: string) => {
    const res = await refreshUser(refresh);
    setUser(res.user);
    setLoading(false);
  };

  const gettingDefaultFS = async () => {
    const res = await getDefaultFeeSchedule();
    setDefaultFS(res?.data?.schedule);
  };

  useEffect(() => {
    const plan = getCarePlan();
    if (!plan) return;
  }, [selectedAddons, selectedData, selectedExam, selectedTherapy, selectedXray]);

  const handleCost = () => {
    // const costResult = latestCalculations(codeList, clientPlan, defaultFS);
    const costResult = carePlanCalculation(codeList, clientPlan, defaultFS);
    // console.log(costResult, "result");
    setCost(costResult?.costSummary);
    setPlaceHolderData(costResult?.placeHolderData as Data);
    setCodesBreakdown(costResult?.codesBreakdown);
  };
  useEffect(() => {
    handleCost();
  }, [clientPlan, selectedCode]);

  useEffect(() => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) {
      setLoading(false);
      return;
    }
    getUser(refresh);
    gettingCodeList();
  }, []);

  useEffect(() => {
    if (user) {
      gettingDefaultFS();
    }
  }, [user])



  useEffect(() => {
    if(clientPlan?.carePlan?.frequency){ 
      setClientPlan({ ...clientPlan, carePlan: { ...clientPlan.carePlan, ...selectedCode } })
      console.log("clientttttttt", clientPlan)
    }
}, [clientPlanUpdate])


  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
