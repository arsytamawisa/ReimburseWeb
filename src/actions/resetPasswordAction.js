import {
    RESET_PASSWORD
} from '../constants/actionConstant';


export function resetPassword(data) {
    return {
        type: RESET_PASSWORD,
        data
    }
}