import { put, takeLatest } from "redux-saga/effects";
// import axios from "axios";
import axios from '../configs/api'

import {
    UPDATE_REIMBURSE_SUCCESS, UPDATE_REIMBURSE_FAILURE, UPDATE_REIMBURSE,
    FIND_ALL_REIMBURSE, FIND_ALL_REIMBURSE_FAILURE, FIND_ALL_REIMBURSE_SUCCESS,
    FIND_REIMBURSE_BY_CATEGORY, FIND_REIMBURSE_BY_CATEGORY_SUCCESS,  FIND_REIMBURSE_BY_CATEGORY_FAILURE,
    FIND_REIMBURSE_BY_ID, FIND_REIMBURSE_BY_ID_SUCCESS, FIND_REIMBURSE_BY_ID_FAILURE
} from "../constants/actionConstant";


function* findAllReimburse(action) {
    action.page -= 1
    let result = yield axios
        .get('/reimburse?page='+ action.page)
        .then(response => {
            return {
                type: FIND_ALL_REIMBURSE_SUCCESS,
                data: response.data,
                total: response.data.total
            }
        })
        .catch(error => {
            console.log(error);
            return {
                type: FIND_ALL_REIMBURSE_FAILURE,
                error
            }
        });
    yield put(result)
}


function* findReimburseById(action) {
    console.log("action saga", action);
    let result = yield axios.get(`/reimburse/${action.id}`)
        .then(response => {
            return ({
                type: FIND_REIMBURSE_BY_ID_SUCCESS,
                data: response.data
            })
        })
        .catch(error => {
            return ({
                type: FIND_REIMBURSE_BY_ID_FAILURE,
                error
            })
        })
    yield put(result)
}


function* findReimburseByCategory(action) {
    let result = yield axios
        .post(`/reimburse/filter-category`, action.data)
        .then(response => {
            return ({
                type: FIND_REIMBURSE_BY_CATEGORY_SUCCESS,
                data: response.data
            })
        })
        .catch(error => {
            return ({
                type: FIND_REIMBURSE_BY_CATEGORY_FAILURE,
                error
            })
        })
    yield put(result)
}


function* updateReimburse(action) {
    console.log("update reimburse action", action);
    let model = action.model;
    let result = yield axios({
        url: `/reimburse/${model.id}/hc`,
        method: 'PUT',
        data: model
    }).then(response => {
        console.log("update reimburse response", response);
        return {
            type: UPDATE_REIMBURSE_SUCCESS,
            data: response
        };
    }).catch(err => {
        return {
            type: UPDATE_REIMBURSE_FAILURE,
            error: err

        }
    })
    yield put(result)
}


export function* watchFindAllReimburse() {
    yield takeLatest(FIND_ALL_REIMBURSE, findAllReimburse)
}

export function* watchFindReimburseById() {
    yield takeLatest(FIND_REIMBURSE_BY_ID, findReimburseById)
}

export function* watchFindReimburseByCategory() {
    yield takeLatest(FIND_REIMBURSE_BY_CATEGORY, findReimburseByCategory)
}

export function* watchUpdateReimburse() {
    yield takeLatest(UPDATE_REIMBURSE, updateReimburse)
}

