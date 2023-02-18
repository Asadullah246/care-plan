import { codeStruct } from "../../types"
import { AnyAction } from "redux"
import codeActionTypes from "./code.action.types"

interface codeReducerState {
  all: codeStruct[],
  selectedCode: codeStruct
}

const initialState: codeReducerState = {
  all: [],
  selectedCode: {} as codeStruct
}

const codeReducers = (state = initialState, action: AnyAction) => {
  switch(action.type){
    case codeActionTypes.LOAD_ALL_CODES:
      return {...state, all: action.payload};
    case codeActionTypes.SELECT_CODE:
      return {...state, selectedCode: action.payload};
    default:
      return state;
  }
}

export default codeReducers;