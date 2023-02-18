import { AnyAction } from 'redux';

export const SET_TEAM_MEMBER = 'SET_TEAM_MEMBER'

export interface User {
  firstName: string,
  lastName: string,
  email: string,
  id: string,
  permissions: string[]
}

const initialState: User[] = [];

const teamMemberReducer = (state = initialState, action: AnyAction) => {
  switch(action.type){
    case SET_TEAM_MEMBER:
      return action.payload;
    default:
      return initialState;
  }
}

export default teamMemberReducer;