import {
    FIND_ALL_CATEGORY,
    FIND_ALL_CATEGORY_FAILURE,
    FIND_ALL_CATEGORY_SUCCESS,
} from "../constants/actionConstant";

const initialState = {
    data: null,
    error: null,
    isLoading: false
}

export function findAllCategory(state = initialState, data) {
    switch (data.type) {
        case FIND_ALL_CATEGORY:
            return {
                ...state,
                isLoading: true
            }
        case FIND_ALL_CATEGORY_SUCCESS:
            return {
                data: data,
                error: null,
                isLoading: false
            }
        case FIND_ALL_CATEGORY_FAILURE:
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