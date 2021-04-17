import {
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE
} from '../constants/actionConstant'


const initialState = {
    data: null,
    error: null,
    isLoading: false
}

export function resetPassword(state = initialState, data) {

    console.log("reducer", data);

    switch (data.type) {
        case RESET_PASSWORD:
            return {
                ...state,
                isLoading: true
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                data: data,
                error: null,
                isLoading: false
            }
        case RESET_PASSWORD_FAILURE:
            return {
                data: null,
                isLoading: false,
                error: data.error
            }
        default:
            return state
    }
}