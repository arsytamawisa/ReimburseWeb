import { put, takeLatest } from 'redux-saga/effects'
// import axios from 'axios'
import axios from './../configs/api';

import {
    REGISTER_EMPLOYEE,
    REGISTER_EMPLOYEE_SUCCESS,
    REGISTER_EMPLOYEE_FAILURE
} from '../constants/actionConstant'


function* registerEmployee(action) {
    let data = action.data
    let result = yield axios
        .post('/register/admin', data)
        .then(response => {
            return {
                type: REGISTER_EMPLOYEE_SUCCESS,
                data: response.data
            }
        })
        .catch(error => {
            console.log(error);
            return {
                type: REGISTER_EMPLOYEE_FAILURE,
                error
            }
        });
    yield put(result)
}


export function* watchRegisterEmployee() {
    yield takeLatest(REGISTER_EMPLOYEE, registerEmployee)
}