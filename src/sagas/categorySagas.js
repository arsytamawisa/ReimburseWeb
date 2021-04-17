// import axios from "axios";
import axios from '../configs/api'
import {put, takeLatest} from "redux-saga/effects";
import { FIND_ALL_EMPLOYEE_FAILURE, FIND_ALL_CATEGORY_SUCCESS, FIND_ALL_CATEGORY } from './../constants/actionConstant';

function* findAllCategory() {
    let result = yield axios
        .get('/categories')
        .then(response => {
            return {
                type: FIND_ALL_CATEGORY_SUCCESS,
                data: response.data
            }
        })
        .catch(error => {
            console.log(error);
            return {
                type: FIND_ALL_EMPLOYEE_FAILURE,
                error
            }
        });
    yield put(result)
}

export function* watchFindAllCategory() {
    yield takeLatest(FIND_ALL_CATEGORY,findAllCategory)
}