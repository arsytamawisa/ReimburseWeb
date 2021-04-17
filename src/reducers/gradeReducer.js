import {
    FIND_ALL_GRADE, FIND_ALL_GRADE_FAILURE, FIND_ALL_GRADE_SUCCESS,
    FIND_GRADE_BY_ID,
    FIND_GRADE_BY_ID_FAILURE,
    FIND_GRADE_BY_ID_SUCCESS,
    SAVE_GRADE, SAVE_GRADE_FAILURE, SAVE_GRADE_SUCCESS,
    UPDATE_GRADE,
    UPDATE_GRADE_SUCCESS
} from "../constants/actionConstant";

const initialState = {
    data: null,
    error: null,
    isLoading: false
}

export function findAllGrade(state = initialState, data) {
    switch (data.type) {
        case FIND_ALL_GRADE:
            return {
                ...state,
                isLoading: true
            }
        case FIND_ALL_GRADE_SUCCESS:
            return {
                data: data,
                error: null,
                isLoading: false
            }
        case FIND_ALL_GRADE_FAILURE:
            return {
                data: null,
                isLoading: false,
                error: data.error
            }
        default:
            return {
                ...state,
                isLoading: false,
                error: null
            };
    }
}


export const findGradeById = (state = {...initialState, data: false}, action) => {
    switch (action.type) {
        case FIND_GRADE_BY_ID:
            return {
                ...state,
                data: null,
                isLoading: true
            };
        case FIND_GRADE_BY_ID_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case FIND_GRADE_BY_ID_FAILURE:
            return {
                data: false,
                isLoading: false,
                error: action.error
            }
        default:
            return {
                ...state,
                isLoading: false,
                error: null
            }
    }
}


export const updateGrade = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_GRADE:
            return true
        case UPDATE_GRADE_SUCCESS:
            return true
        default:
            return false;
    }

}


export const saveGrade = (state = {...initialState}, action) => {
    switch (action.type) {
        case SAVE_GRADE:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case SAVE_GRADE_SUCCESS:
            console.log(action.data)
            return {
                data: action.data,
                isLoading: false,
                error: null
            };
        case SAVE_GRADE_FAILURE:
            return {
                data: null,
                isLoading: false,
                error: action.error
            }
        default:
            return {
                ...state,
                data: null,
                isLoading: false,
                error: null
            }
    }
}
