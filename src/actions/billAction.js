import {
    UPLOAD_FILE, FIND_BILL_BY_ID, UPDATE_BILL
} from '../constants/actionConstant';


export function uploadFile(data) {
    return {
        type: UPLOAD_FILE,
        data
    }
}


export function findBillById(id) {
    return {
        type: FIND_BILL_BY_ID,
        id
    }
}

export function updateFile(data) {
    return {
        type: UPDATE_BILL,
        data
    }
}
