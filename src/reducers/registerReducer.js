import {
    REGISTER_EMPLOYEE,
    REGISTER_EMPLOYEE_SUCCESS,
    REGISTER_EMPLOYEE_FAILURE
} from '../constants/actionConstant'


const initialState = {
    data: null,
    error: null,
    isLoading: false
}

export function registerEmployees(state = initialState, data) {
    switch (data.type) {
        case REGISTER_EMPLOYEE:
            return {
                ...state,
                isLoading: true
            }
        case REGISTER_EMPLOYEE_SUCCESS:
            return {
                data: data,
                error: null,
                isLoading: false
            }
        case REGISTER_EMPLOYEE_FAILURE:
            return {
                data: null,
                isLoading: false,
                error: data.error
            }
        default:
            return state
    }
}