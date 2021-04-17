import { put, takeLatest } from 'redux-saga/effects'
// import axios from 'axios'
import axios from './../configs/api';

import {
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE
} from '../constants/actionConstant'


function* resetPassword(action) {
    console.log("action type",action.type);
    console.log("action data",action.data);
    let result = yield axios
        .post('/reset-password', action.data)
        .then(response => {
            console.log("response from saga", response);
            return {
                type: RESET_PASSWORD_SUCCESS,
                data: response
            }
        })
        .catch(error => {
            return {
                type: RESET_PASSWORD_FAILURE,
                error
            }
        });
    yield put(result)
}


export function* watchResetPassword() {
    yield takeLatest(RESET_PASSWORD, resetPassword)
}