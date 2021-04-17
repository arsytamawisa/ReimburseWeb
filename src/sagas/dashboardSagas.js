// import axios from "axios";
import axios from '../configs/api'

import {
    FIND_ALL_COUNT,
    FIND_ALL_COUNT_FAILURE,
    FIND_ALL_COUNT_SUCCESS
} from "../constants/actionConstant";
import {put, takeLatest} from "redux-saga/effects";

function* findAllCount() {
    let result = yield axios
        .get('/dashboard')
        .then(response => {
            console.log("INI SAGAS YAA", response)
            return {
                type: FIND_ALL_COUNT_SUCCESS,
                data: response.data
            }
        })
        .catch(error => {
            console.log("INI ERROR SAGAS",error)
            return{
                type: FIND_ALL_COUNT_FAILURE,
                error
            }
        })
    yield put(result)
}
export function* watchFindAllCount() {
    yield takeLatest(FIND_ALL_COUNT,findAllCount)
}