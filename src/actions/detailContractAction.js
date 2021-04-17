import {
    FIND_ALL_CONTRACT,
    FIND_CONTRACT_BY_ID,
    FIND_CONTRACT_BY_NAME,
    SAVE_CONTRACT,
    UPDATE_CONTRACT
} from "../constants/actionConstant";

export function findAll(page) {
    return {
        type: FIND_ALL_CONTRACT,
        page:page

    }
}

export function findById(id) {
    console.log("ini action", id)
    return {
        type: FIND_CONTRACT_BY_ID,
        id
    }
}

export function save(model) {
    console.log("save action model", model)
    return {
        type: SAVE_CONTRACT,
        model
    }
}

export function update(payload) {
    console.log("update contract action")
    return {
        type: UPDATE_CONTRACT,
        payload
    }
}

export function findByName(model) {
    return {
        type: FIND_CONTRACT_BY_NAME,
        model
    }
}