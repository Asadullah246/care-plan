import { AnyAction } from "redux"
import patientActionTypes from "./patient.action.types"
import {IInsurance, IUser} from '../../types';

const initialState = {
  all: <IUser[]>[],
  selected: <IUser>{},
  insurance: <IInsurance>{}
}

const patientReducer = (state = initialState, action: AnyAction) => {
  switch(action.type){
    case patientActionTypes.LOAD_PATIENTS:
      return {...state, all: action.payload, selected: {}};
    case patientActionTypes.SELECT_PATIENT:
      return {...state, selected: action.payload};
    case patientActionTypes.SET_INSURANCE:
      return {...state, insurance: action.payload};
    default:
      return state;
  }
}

export default patientReducer;