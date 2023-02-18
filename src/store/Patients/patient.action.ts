import { IInsurance, IUser } from '../../types';
import patientActionTypes from './patient.action.types';

export const loadPatients = (patients: IUser[]) =>{
  return {type: patientActionTypes.LOAD_PATIENTS , payload: patients};
}

export const selectPatient = (patient: IUser) => {
  return {type: patientActionTypes.SELECT_PATIENT, payload: patient};
}

export const setInsuranceToStore = (insurance: IInsurance) => {
  return {type: patientActionTypes.SET_INSURANCE, payload: insurance};
}