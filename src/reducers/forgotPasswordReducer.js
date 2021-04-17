import {
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE
} from '../constants/actionConstant'


const initialState = {
    data: null,
    error: null,
    isLoading: false
}

export function forgotPassword(state = initialState, data) {

    console.log("reducer", data);

    switch (data.type) {
        case FORGOT_PASSWORD:
            return {
                ...state,
                isLoading: true
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                data: data,
                error: null,
                isLoading: false
            }
        case FORGOT_PASSWORD_FAILURE:
            return {
                data: null,
                isLoading: false,
                error: data.error
            }
        default:
            return state
    }
}