import {LOGIN_EMPLOYEE, LOGIN_EMPLOYEE_FAILURE, LOGIN_EMPLOYEE_SUCCESS} from "../constants/actionConstant";

const initialState = {
    data: null,
    error: null,
    isLoading: false
}

export function loginEmployee(state = initialState, data) {
    switch (data.type) {
        case LOGIN_EMPLOYEE:
            return {
                ...state,
                isLoading: true
            }
        case LOGIN_EMPLOYEE_SUCCESS:
            return {
                data: data,
                error: null,
                isLoading: false
            }
        case LOGIN_EMPLOYEE_FAILURE:
            return {
                data: null,
                error: data.error,
                isLoading: false
            }
        default:
            return state
    }
}