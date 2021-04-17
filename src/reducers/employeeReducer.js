import {
    FIND_ALL_EMPLOYEE,
    FIND_ALL_EMPLOYEE_FAILURE,
    FIND_ALL_EMPLOYEE_SUCCESS,
    FIND_EMPLOYEE_BY_ID,
    FIND_EMPLOYEE_BY_ID_SUCCESS,
    FIND_EMPLOYEE_BY_ID_FAILURE,
    UPDATE_EMPLOYEE,
    UPDATE_EMPLOYEE_SUCCESS,
    SAVE_EMPLOYEE,
    SAVE_EMPLOYEE_SUCCESS,
    SAVE_EMPLOYEE_FAILURE,
    SAVE_VERIFIED,
    SAVE_VERIFIED_FAILURE,
    SAVE_VERIFIED_SUCCESS,
    FIND_EMPLOYEE_BY_NAME,
    FIND_EMPLOYEE_BY_NAME_SUCCESS,
    FIND_EMPLOYEE_BY_NAME_FAILURE,
    FIND_EMPLOYEE_BY_STATUS,
    FIND_EMPLOYEE_BY_STATUS_SUCCESS,
    FIND_EMPLOYEE_BY_STATUS_FAILURE
} from "../constants/actionConstant";

const initialState = {
    data: null,
    error: null,
    isLoading: false
}

export function findAllEmployee(state = initialState, data) {
    switch (data.type) {
        case FIND_ALL_EMPLOYEE:
            return {
                ...state,
                isLoading: true
            }
        case FIND_ALL_EMPLOYEE_SUCCESS:
            return {
                data: data,
                error: null,
                isLoading: false
            }
        case FIND_ALL_EMPLOYEE_FAILURE:
            return {
                data: null,
                isLoading: false,
                error: data.error
            }
        default:
            return {
                ...state,
                isLoading: false,
                error: null
            };
    }
}

export const findEmployeeById = (state = {...initialState, data: false}, action) => {
    // console.log("ACTION", action)
    switch (action.type) {
        case FIND_EMPLOYEE_BY_ID:
            return {
                ...state,
                data:  null,
                isLoading: true
            };
        case FIND_EMPLOYEE_BY_ID_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case FIND_EMPLOYEE_BY_ID_FAILURE:
            return {
                data: false,
                isLoading: false,
                error: action.error
            }
        default:
            return {
                ...state,
                isLoading: false,
                error: null
            }
    }
}
export const updateEmployee = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_EMPLOYEE:
            return true
        case UPDATE_EMPLOYEE_SUCCESS:
            return true
        default:
            return false;
    }

}

export const saveEmployee = (state = {...initialState}, action) => {
    switch (action.type) {
        case SAVE_EMPLOYEE:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case SAVE_EMPLOYEE_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            };
        case SAVE_EMPLOYEE_FAILURE:
            return {
                data: null,
                isLoading: false,
                error: action.error
            }
        default:
            return {
                ...state,
                data: null,
                isLoading: false,
                error: null
            }
    }
}
export const saveVerified = (state = {...initialState}, action) => {
    switch (action.type) {
        case SAVE_VERIFIED:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case SAVE_VERIFIED_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            };
        case SAVE_VERIFIED_FAILURE:
            return {
                data: null,
                isLoading: false,
                error: action.error
            }
        default:
            return {
                ...state,
                data: null,
                isLoading: false,
                error: null
            }
    }
}


export const findEmployeeByName = (state = {...initialState}, action) => {
    switch (action.type) {
        case FIND_EMPLOYEE_BY_NAME:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case FIND_EMPLOYEE_BY_NAME_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            };
        case FIND_EMPLOYEE_BY_NAME_FAILURE:
            return {
                data: null,
                isLoading: false,
                error: action.error
            }
        default:
            return {
                ...state,
                data: null,
                isLoading: false,
                error: null
            }
    }
}

export const findEmployeeByStatus = (state = {...initialState}, action) => {
    switch (action.type) {
        case FIND_EMPLOYEE_BY_STATUS:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case FIND_EMPLOYEE_BY_STATUS_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            };
        case FIND_EMPLOYEE_BY_STATUS_FAILURE:
            return {
                data: null,
                isLoading: false,
                error: action.error
            }
        default:
            return {
                ...state,
                data: null,
                isLoading: false,
                error: null
            }
    }
}