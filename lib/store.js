import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../lib/features/employees/employeesSlice"
function makeStore(){
    return configureStore({
        reducer:{
            employees:employeesReducer
        }
    })
}

export default makeStore