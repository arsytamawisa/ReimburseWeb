import axios from '../configs/api'
// import axios from "axios";
import {
    FIND_ALL_EMPLOYEE,
    FIND_ALL_EMPLOYEE_FAILURE,
    FIND_ALL_EMPLOYEE_SUCCESS,
    FIND_EMPLOYEE_BY_ID,
    FIND_EMPLOYEE_BY_ID_FAILURE,
    FIND_EMPLOYEE_BY_ID_SUCCESS,
    FIND_EMPLOYEE_BY_NAME,
    FIND_EMPLOYEE_BY_NAME_FAILURE,
    FIND_EMPLOYEE_BY_NAME_SUCCESS,
    FIND_EMPLOYEE_BY_STATUS,
    FIND_EMPLOYEE_BY_STATUS_FAILURE,
    FIND_EMPLOYEE_BY_STATUS_SUCCESS,
    SAVE_EMPLOYEE,
    SAVE_EMPLOYEE_FAILURE,
    SAVE_EMPLOYEE_SUCCESS,
    SAVE_VERIFIED,
    SAVE_VERIFIED_FAILURE,
    SAVE_VERIFIED_SUCCESS,
    UPDATE_EMPLOYEE,
} from "../constants/actionConstant";
import {put, takeLatest} from "redux-saga/effects";


function* findAllEmployee(action) {
    action.page -= 1
    let result = yield axios
        .get('/employee?page=' + action.page)
        .then(response => {
            return {
                type: FIND_ALL_EMPLOYEE_SUCCESS,
                data: response.data,
                total: response.data.total
            }
        })
        .catch(error => {
            return {
                type: FIND_ALL_EMPLOYEE_FAILURE,
                error
            }
        });
    yield put(result)
}

function* findEmployeeById(action) {
    console.log("SAGAS", action)
    let result = yield axios.get(`/employee/${action.id}`)
        .then(response => {
            console.log("FIND BY ID", response)
            return ({
                type: FIND_EMPLOYEE_BY_ID_SUCCESS,
                data: response.data
            })
        })
        .catch(error => {
            console.log("Error find employee by id sagas, error")
            return ({
                type: FIND_EMPLOYEE_BY_ID_FAILURE,
                error
            })
        })
    yield put(result)
}


function* updateEmployee(action) {
    let result = false

    yield put({
        type: UPDATE_EMPLOYEE,
        data: result
    })
}

function* saveEmployee(action) {
    let model = action.model;
    let result = yield axios
        .put(`/employee/${model.id}`, model)
        .then(data => {
        console.log("SAVE SAGAS", data)
        return {
            type: SAVE_EMPLOYEE_SUCCESS,
            data: data
        };
    })
        .catch(err => {
            console.log("error save sagas: " + err)
            return {
                type: SAVE_EMPLOYEE_FAILURE,
                error: err

            }
        })
    yield put(result)
}

export function* saveVerified(action) {
    console.log("SAVE", action)
    let model = action.model;
    let result = yield axios
        .put(`/employee/${model.id}/isVerified`, model)
        .then(data => {
            console.log("SAVE SAGAS", data)
            return {
                type: SAVE_VERIFIED_SUCCESS,
                data: data
            };
        })
        .catch(err => {
            console.log("error save sagas: " + err)
            return {
                type: SAVE_VERIFIED_FAILURE,
                error: err

            }
        })
    yield put(result)
}

export function* findEmployeeByName(action) {
    console.log("Find by name", action)
    let model = action.model;
    let result = yield axios
        .post("/employee/filter-name", model)
        .then(data=> {
            return {
                type: FIND_EMPLOYEE_BY_NAME_SUCCESS,
                data: data
            }
        })
        .catch(error => {
            return {
                type: FIND_EMPLOYEE_BY_NAME_FAILURE,
                error: error
            }
        })
    yield put(result)
}


export function* findEmployeeByStatus(action) {
    console.log("Find by name", action)
    let model = action.model;
    let result = yield axios
        .post("/filter-status-employee", model)
        .then(data=> {
            return {
                type: FIND_EMPLOYEE_BY_STATUS_SUCCESS,
                data: data
            }
        })
        .catch(error => {
            return {
                type: FIND_EMPLOYEE_BY_STATUS_FAILURE,
                error: error
            }
        })
    yield put(result)
}

export function* watchFindAllEmployee() {
    yield takeLatest(FIND_ALL_EMPLOYEE, findAllEmployee)
}

export function* watchFindEmployeeById() {
    yield takeLatest(FIND_EMPLOYEE_BY_ID, findEmployeeById)
}

export function* watchUpdateEmployee() {
    yield takeLatest(UPDATE_EMPLOYEE, updateEmployee)
}

export function* watchSaveEmployee() {
    yield takeLatest(SAVE_EMPLOYEE, saveEmployee)
}

export function* watchSaveVerified() {
    yield takeLatest(SAVE_VERIFIED, saveVerified)
}

export function* watchFindEmployeeByName() {
    yield takeLatest(FIND_EMPLOYEE_BY_NAME, findEmployeeByName)
}

export function* watchFindEmployeeByStatus() {
    yield takeLatest(FIND_EMPLOYEE_BY_STATUS, findEmployeeByStatus)
}