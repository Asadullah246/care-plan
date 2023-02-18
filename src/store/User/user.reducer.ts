import { AnyAction } from "redux"
import userAction from "./user.action.types";

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  permissions: []

}
const userReducer = (state = initialState, action: AnyAction) => {
  switch(action.type){
    case userAction.REMOVE_USER:
      return initialState;
    case userAction.SET_USER:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;