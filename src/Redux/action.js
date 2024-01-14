import { LOGIN_SUCCESS,LOGOUT_SUCCESS } from "./actionType";
export const login=(payload)=>{
     return {type:LOGIN_SUCCESS,payload}
}
export const logout=()=>{
   return {type:LOGOUT_SUCCESS}
}