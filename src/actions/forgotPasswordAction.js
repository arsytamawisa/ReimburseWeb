import {
    FORGOT_PASSWORD
} from '../constants/actionConstant';


export function forgotPassword(data) {
    return {
        type: FORGOT_PASSWORD,
        data
    }
}