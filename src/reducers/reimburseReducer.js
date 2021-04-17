import {
    FIND_ALL_REIMBURSE, FIND_ALL_REIMBURSE_FAILURE, FIND_ALL_REIMBURSE_SUCCESS,
    UPDATE_REIMBURSE, UPDATE_REIMBURSE_SUCCESS, UPDATE_REIMBURSE_FAILURE,
    FIND_REIMBURSE_BY_ID, FIND_REIMBURSE_BY_ID_SUCCESS, FIND_REIMBURSE_BY_ID_FAILURE, 
    FIND_REIMBURSE_BY_CATEGORY, FIND_REIMBURSE_BY_CATEGORY_SUCCESS, FIND_REIMBURSE_BY_CATEGORY_FAILURE
} from "../constants/actionConstant";

const initialState = {
    data: null,
    error: null,
    isLoading: false
}

export function findAllReimburse(state = initialState, data) {
    switch (data.type) {
        case FIND_ALL_REIMBURSE:
            return {
                ...state,
                isLoading: true
            }
        case FIND_ALL_REIMBURSE_SUCCESS:
            return {
                data: data,
                error: null,
                isLoading: false
            }
        case FIND_ALL_REIMBURSE_FAILURE:
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


export const findReimburseByCategory = (state = initialState, action) => {
    switch (action.type) {
        case FIND_REIMBURSE_BY_CATEGORY:
            return {
                ...state,
                isLoading: true
            };
        case FIND_REIMBURSE_BY_CATEGORY_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case FIND_REIMBURSE_BY_CATEGORY_FAILURE:
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


export const findReimburseById = (state = initialState, action) => {
    switch (action.type) {
        case FIND_REIMBURSE_BY_ID:
            return {
                ...state,
                isLoading: true
            };
        case FIND_REIMBURSE_BY_ID_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case FIND_REIMBURSE_BY_ID_FAILURE:
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


export const updateReimburse = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_REIMBURSE:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case UPDATE_REIMBURSE_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            };
        case UPDATE_REIMBURSE_FAILURE:
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

