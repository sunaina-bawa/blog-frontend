import { LOGIN_SUCCESS,LOGOUT_SUCCESS } from "./actionType";
const initialState={
    isLoading:false,
    user:localStorage.getItem("userName") || null
}
export const reducer = (state=initialState,{type,payload}) => {
 switch (type) {
    case  LOGIN_SUCCESS:
        return {...state,user:payload}
    case LOGOUT_SUCCESS:
        localStorage.clear()
        return {...state,user:null}    
    default:
    return state
 }
}
