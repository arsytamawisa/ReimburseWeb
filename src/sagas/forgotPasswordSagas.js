import { put, takeLatest } from 'redux-saga/effects'
// import axios from 'axios'
import axios from './../configs/api';

import {
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE
} from '../constants/actionConstant'


function* forgotPassword(action) {
    console.log("action type",action.type);
    console.log("action data",action.data);
    let result = yield axios     
        .post('/forgot-password', action.data)
        .then(response => {
            console.log("response from saga", response);
            return {
                type: FORGOT_PASSWORD_SUCCESS,
                data: response
            }
        })
        .catch(error => {
            return {
                type: FORGOT_PASSWORD_FAILURE,
                error
            }
        });
    yield put(result)
}


export function* watchForgotPassword() {
    yield takeLatest(FORGOT_PASSWORD, forgotPassword)
}