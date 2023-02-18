import userActionTypes from "./user.action.types";

export const removeUser = () => ({type: userActionTypes.REMOVE_USER})
export const setUser = (user: any) => ({type: userActionTypes.SET_USER, payload: user})