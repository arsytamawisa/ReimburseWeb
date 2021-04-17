import {
    FIND_ALL_REIMBURSE_FINANCE,
    FIND_ALL_REIMBURSE_FINANCE_FAILURE,
    FIND_ALL_REIMBURSE_FINANCE_SUCCESS,
    FIND_REIMBURSE_FINANCE_BY_ID,
    FIND_REIMBURSE_FINANCE_BY_ID_SUCCESS,
    FIND_REIMBURSE_FINANCE_BY_ID_FAILURE,
    UPDATE_REIMBURSE_FINANCE,
    UPDATE_REIMBURSE_FINANCE_SUCCESS,
    UPDATE_REIMBURSE_FINANCE_FAILURE,
    FIND_REIMBURSE_FINANCE_BY_CATEGORY,
    FIND_REIMBURSE_FINANCE_BY_CATEGORY_SUCCESS,
    FIND_REIMBURSE_FINANCE_BY_CATEGORY_FAILURE,
} from "../constants/actionConstant";

const initialState = {
    data: null,
    error: null,
    isLoading: false
}

export function findAllReimburseFinance(state = initialState, data) {
    switch (data.type) {
        case FIND_ALL_REIMBURSE_FINANCE:
            return {
                ...state,
                isLoading: true
            }
        case FIND_ALL_REIMBURSE_FINANCE_SUCCESS:
            return {
                data: data,
                error: null,
                isLoading: false
            }
        case FIND_ALL_REIMBURSE_FINANCE_FAILURE:
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


export const findReimburseFinanceById = (state = initialState, action) => {
    switch (action.type) {
        case FIND_REIMBURSE_FINANCE_BY_ID:
            return {
                ...state,
                isLoading: true
            };
        case FIND_REIMBURSE_FINANCE_BY_ID_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case FIND_REIMBURSE_FINANCE_BY_ID_FAILURE:
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


export const updateReimburseFinance = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_REIMBURSE_FINANCE:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case UPDATE_REIMBURSE_FINANCE_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            };
        case UPDATE_REIMBURSE_FINANCE_FAILURE:
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


export const findReimburseFinanceByCategory = (state = initialState, action) => {
    switch (action.type) {
        case FIND_REIMBURSE_FINANCE_BY_CATEGORY:
            return {
                ...state,
                isLoading: true
            };
        case FIND_REIMBURSE_FINANCE_BY_CATEGORY_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case FIND_REIMBURSE_FINANCE_BY_CATEGORY_FAILURE:
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