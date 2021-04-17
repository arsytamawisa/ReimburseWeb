import { put, takeLatest } from "redux-saga/effects";
import {
    FIND_ALL_GRADE,
    FIND_ALL_GRADE_FAILURE,
    FIND_ALL_GRADE_SUCCESS,
    FIND_GRADE_BY_ID,
    FIND_GRADE_BY_ID_FAILURE,
    FIND_GRADE_BY_ID_SUCCESS,
    SAVE_GRADE, SAVE_GRADE_FAILURE,
    SAVE_GRADE_SUCCESS,
} from "../constants/actionConstant";
// import axios from 'axios'
import axios from '../configs/api'


function* findAllGrade() {
    let result = yield axios
        .get('/grades')
        .then(response => {
            console.log("grade response", response);
            return {
                type: FIND_ALL_GRADE_SUCCESS,
                data: response.data
            }
        })
        .catch(error => {
            console.log("grade error", error);
            return {
                type: FIND_ALL_GRADE_FAILURE,
                error
            }
        });
    yield put(result)
}


function* findGradeById(action) {
    let result = yield axios.get(`/grades/${action.id}`)
        .then(response => {
            return ({
                type: FIND_GRADE_BY_ID_SUCCESS,
                data: response.data
            })
        })
        .catch(error => {
            return ({
                type: FIND_GRADE_BY_ID_FAILURE,
                error
            })
        })
    yield put(result)
}


function* saveGrade(action) {

    console.log("action id",action.model.id);
    console.log("action model",action.model);
    console.log("action",action);
    let result = yield axios
        .put(`/grades/${action.model.id}`, action.model)
        .then(response => {
            return {
                type: SAVE_GRADE_SUCCESS,
                data: response.data
            };
        })
        .catch(error => {
            return {
                type: SAVE_GRADE_FAILURE,
                error

            }
        })
    yield put(result)
}


export function* watchFindAllGrade() {
    yield takeLatest(FIND_ALL_GRADE, findAllGrade)
}
export function* watchFindGradeById() {
    yield takeLatest(FIND_GRADE_BY_ID, findGradeById)
}
export function* watchSaveGrade() {
    yield takeLatest(SAVE_GRADE, saveGrade)
}