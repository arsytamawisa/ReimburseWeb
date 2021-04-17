import { LOGIN_EMPLOYEE } from "../constants/actionConstant";
import { FIND_BY_EMAIL } from '../constants/actionConstant';

export function loginEmployee(data) {
    return {
        type: LOGIN_EMPLOYEE,
        data
    }
}

export function findByEmail(data) {
    return {
        type: FIND_BY_EMAIL,
        data
    }
}