import {FIND_ALL_GRADE, FIND_GRADE_BY_ID, SAVE_GRADE, UPDATE_GRADE} from "../constants/actionConstant";


export function findAll() {
    return {
        type: FIND_ALL_GRADE
    }
}

export function findById(id) {
    return {
        type:FIND_GRADE_BY_ID,
        id
    }
}

export function save(model) {
    return {
        type: SAVE_GRADE,
        model
    }
}

export function update(payload) {
    return {
        type: UPDATE_GRADE,
        payload
    }
}