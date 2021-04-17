import {
    REGISTER_EMPLOYEE
} from '../constants/actionConstant';


export function registerEmployee(data) {
    return {
        type: REGISTER_EMPLOYEE,
        data
    }
}