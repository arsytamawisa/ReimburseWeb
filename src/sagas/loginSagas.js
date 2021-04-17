// import axios from "axios";
import axios from '../configs/api'

import { put, takeLatest } from 'redux-saga/effects'
import {
    LOGIN_EMPLOYEE,
    LOGIN_EMPLOYEE_FAILURE,
    LOGIN_EMPLOYEE_SUCCESS,
} from "../constants/actionConstant";

function* loginEmployee(action) {
    let data = action.data
    let result = yield axios
        .post('/login', data)
        .then(response => {
            console.log("saga data", response)
            return{
                type : LOGIN_EMPLOYEE_SUCCESS,
                data: response
            }
        })
        .catch(error => {
            console.log("LOGIN EMPLOYEE", error);
            return {
                type: LOGIN_EMPLOYEE_FAILURE,
                error
            }
        });
    yield put (result)
}

export function* watchLoginEmployee() {
    yield takeLatest(LOGIN_EMPLOYEE, loginEmployee)
}