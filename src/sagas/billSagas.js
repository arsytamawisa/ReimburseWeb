import { put, takeLatest } from 'redux-saga/effects'
// import axios from 'axios'
import axios from './../configs/api';

import {
    UPLOAD_FILE, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILURE,
    UPDATE_BILL, UPDATE_BILL_FAILURE, UPDATE_BILL_SUCCESS,
    FIND_BILL_BY_ID, FIND_BILL_BY_ID_FAILURE, FIND_BILL_BY_ID_SUCCESS,
} from '../constants/actionConstant'


function* uploadFile(action) {

    let data = action.data.file
    let id = action.data.id
    let url = `/bill/${id}/upload/file/admin`

    let result = yield axios({
        method: 'POST',
        url: url,
        data: action.data.file,
    })
        .then(response => {
            console.log("response saga", response);
            return {
                type: UPLOAD_FILE_SUCCESS,
                data: response
            }
        })
        .catch(error => {
            console.log("error saga", error);
            return {
                type: UPLOAD_FILE_FAILURE,
                error
            }
        });
    yield put(result)
}


function* findBillById(action) {
    let result = yield axios.get(`/bill/${action.id}/file/employee`)
        .then(response => {
            return ({
                type: FIND_BILL_BY_ID_SUCCESS,
                data: response
            })
        })
        .catch(error => {
            return ({
                type: FIND_BILL_BY_ID_FAILURE,
                error
            })
        })
    yield put(result)
}


function* updateFile(action) {

    let data = action.data.file
    let id = action.data.id
    let url = `/bill/${id}/upload/file/admin`

    let result = yield axios({
        method: 'PUT',
        url: url,
        data: action.data.file,
    })
        .then(response => {
            console.log("response saga", response);
            return {
                type: UPDATE_BILL_SUCCESS,
                data: response
            }
        })
        .catch(error => {
            console.log("error saga", error);
            return {
                type: UPDATE_BILL_FAILURE,
                error
            }
        });
    yield put(result)
}


export function* watchUploadFile() {
    yield takeLatest(UPLOAD_FILE, uploadFile)
}

export function* watchBillById() {
    yield takeLatest(FIND_BILL_BY_ID, findBillById)
}

export function* watchUpdateFile() {
    yield takeLatest(UPDATE_BILL, updateFile)
}
