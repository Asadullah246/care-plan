import { codeStruct } from "../../types"
import codeActionTypes from "./code.action.types"

export const loadAllCodes = async() => {
  // load codes
  // return codes
  return {
    type: codeActionTypes.LOAD_ALL_CODES,
    payload: [],
  }
}

export const selectCode = (code: codeStruct) => ({
  type: codeActionTypes.SELECT_CODE,
  payload: code,
})

export const updateCode = async(updatedCode: codeStruct) => {
  // post updated code
  return {
    type: codeActionTypes.UPDATE_CURRENT_CODE,
    payload: updatedCode
  }
}