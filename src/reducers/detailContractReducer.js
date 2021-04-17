import {
    FIND_ALL_CONTRACT,
    FIND_ALL_CONTRACT_FAILURE,
    FIND_ALL_CONTRACT_SUCCESS,
    FIND_CONTRACT_BY_ID,
    FIND_CONTRACT_BY_ID_FAILURE,
    FIND_CONTRACT_BY_ID_SUCCESS,
    FIND_CONTRACT_BY_NAME, FIND_CONTRACT_BY_NAME_FAILURE, FIND_CONTRACT_BY_NAME_SUCCESS,
    FIND_EMPLOYEE_BY_NAME,
    FIND_EMPLOYEE_BY_NAME_FAILURE,
    FIND_EMPLOYEE_BY_NAME_SUCCESS,
    SAVE_CONTRACT,
    SAVE_CONTRACT_FAILURE,
    SAVE_CONTRACT_SUCCESS,
    UPDATE_CONTRACT,
    UPDATE_CONTRACT_SUCCESS,
} from "../constants/actionConstant";

const initialState = {
    data: null,
    error: null,
    isLoading: false
}

export function findAllContract(state = initialState, data) {
    switch (data.type) {
        case FIND_ALL_CONTRACT:
            return {
                ...state,
                isLoading: true
            }
        case FIND_ALL_CONTRACT_SUCCESS:
            return {
                data: data,
                error: null,
                isLoading: false
            }
        case FIND_ALL_CONTRACT_FAILURE:
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
            }
    }
}

export const findContractById = (state = {...initialState, data: false}, action) => {
    console.log("ACTION", action)
    switch (action.type) {
        case FIND_CONTRACT_BY_ID:
            return {
                ...state,
                data:  null,
                isLoading: true
            };
        case FIND_CONTRACT_BY_ID_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case FIND_CONTRACT_BY_ID_FAILURE:
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

export const updateContract = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_CONTRACT:
            console.log("updateing contract in reducers")
            return true
        case UPDATE_CONTRACT_SUCCESS:
            console.log("updateing contract success in reducers")
            return true
        default:
            return false;
    }

}


export const saveContract = (state = {...initialState}, action) => {
    console.log("save contract reducer")
    switch (action.type) {
        case SAVE_CONTRACT:
            console.log("save contract reducer")
            console.log("ini reducer", action.data)
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case SAVE_CONTRACT_SUCCESS:
            console.log("SUCCESS",action.data)
            return {
                data: action.data,
                isLoading: false,
                error: null
            };
        case SAVE_CONTRACT_FAILURE:
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

export const findContractByName = (state = {...initialState}, action) => {
    switch (action.type) {
        case FIND_CONTRACT_BY_NAME:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case FIND_CONTRACT_BY_NAME_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            };
        case FIND_CONTRACT_BY_NAME_FAILURE:
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

