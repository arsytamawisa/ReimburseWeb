import {SORT_BY_ALPHABET} from "../constants/actionConstant";

export function sortByName(payload) {
    return {
        type: SORT_BY_ALPHABET,
        payload
    }
}