import axios from '../configs/api'
// import axios from "axios";

import {
    FIND_ALL_CONTRACT,
    FIND_ALL_CONTRACT_FAILURE,
    FIND_ALL_CONTRACT_SUCCESS,
    FIND_CONTRACT_BY_ID,
    FIND_CONTRACT_BY_ID_FAILURE,
    FIND_CONTRACT_BY_ID_SUCCESS, FIND_CONTRACT_BY_NAME, FIND_CONTRACT_BY_NAME_FAILURE,
    FIND_CONTRACT_BY_NAME_SUCCESS,
    SAVE_CONTRACT,
    SAVE_CONTRACT_FAILURE,
    SAVE_CONTRACT_SUCCESS,
    UPDATE_CONTRACT,
} from "../constants/actionConstant";
import {put, takeLatest} from "redux-saga/effects";

function* findAllContract(action) {
    action.page -= 1
    let result = yield axios
        .get('/contract?page='+ action.page)
        .then(response => {
            return {
                type: FIND_ALL_CONTRACT_SUCCESS,
                data: response.data,
                total: response.data.total
            }
        })
        .catch(error => {
            console.log(error);
            return {
                type: FIND_ALL_CONTRACT_FAILURE,
                error
            }
        });
    yield put(result)
}


function* findContractById(action) {
    console.log("findemployee contract sagas", action)
    let result = yield axios.get(`/contract/${action.id}`)
        .then(response => {
            console.log("FIND BY ID", response)
            return({
                type:FIND_CONTRACT_BY_ID_SUCCESS,
                data: response.data
            })
        })
        .catch(error => {
            console.log("error find contract by id ", error)
            return({
                type:FIND_CONTRACT_BY_ID_FAILURE,
                error
            })
        })
    yield put(result)
}

function* updateContract(action) {
    let result = false
    yield put( {
        type: UPDATE_CONTRACT,
        data: result
    })
}

export function* findContractByName(action) {
    console.log("Find by name", action)
    let model = action.model;
    let result = yield axios
        .post("/contract/filter-name", model)
        .then(data=> {
            return {
                type: FIND_CONTRACT_BY_NAME_SUCCESS,
                data: data
            }
        })
        .catch(error => {
            return {
                type: FIND_CONTRACT_BY_NAME_FAILURE,
                error: error
            }
        })
    yield put(result)
}



function* saveContract(action) {
    console.log("SAGAS CONTRACT", action)
    let model = action.model;
    let result = yield axios
        .put (`/contract/${model.id}`, model)
        .then(data => {
            return {
                type: SAVE_CONTRACT_SUCCESS,
                data: data
            }
        })
        .catch(error => {
            console.log("error save sagas", error)
            return {
                type: SAVE_CONTRACT_FAILURE,
                error: error
            }
        })
    yield put(result)
}

export function* watchFindAllContract() {
    yield takeLatest(FIND_ALL_CONTRACT,findAllContract)
}
export function* watchFindContractById() {
    yield takeLatest(FIND_CONTRACT_BY_ID, findContractById)
}
export function* watchUpdateContract() {
    yield takeLatest(UPDATE_CONTRACT, updateContract)
}
export function* watchSaveContract() {
    yield takeLatest(SAVE_CONTRACT, saveContract)
}

export function* watchFindContractByName() {
    yield takeLatest(FIND_CONTRACT_BY_NAME, findContractByName)
}