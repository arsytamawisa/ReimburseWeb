import {
    FIND_ALL_COUNT, FIND_ALL_COUNT_FAILURE, FIND_ALL_COUNT_SUCCESS
} from "../constants/actionConstant";


const initialState = {
    data: {
      labels: ['Female. Male'],
      datasets:[{
          label:"GENDER",
          data:[],
          backgroundColor: [
              '#B21F00',
              '#C9DE00',
          ],
          hoverBackgroundColor: [
              '#501800',
              '#4B5000',
          ],
      }]
    },
    error: null,
    isLoading: false
}

export function findAllCount(state = initialState, data) {
    switch (data.type) {
        case FIND_ALL_COUNT:
            return {
                ...state,
                isLoading: true
            }
        case FIND_ALL_COUNT_SUCCESS:
            return {
                data: data,
                error: null,
                isLoading: false
            }
        case FIND_ALL_COUNT_FAILURE:
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