import {SORT_BY_ALPHABET} from "../constants/actionConstant";

const initialState = {
    appliedFilters:[]
}

const filterStore = (state= initialState, action) => {
    switch (action.type) {
        case SORT_BY_ALPHABET :
            const sortByAlphabetState = Object.assign({}, state);
            let sortedAlphabetArr = action.payload.direction === "asc" ?
                sortAsc(state.filteredName, 'name') :
                sortDesc(state.filteredName, 'name');

            sortByAlphabetState.filteredName = sortedAlphabetArr;
            sortByAlphabetState.appliedFilters = addFilterIfNotExists(SORT_BY_ALPHABET, sortByAlphabetState.appliedFilters);
            sortByAlphabetState.appliedFilters = removeFilter(SORT_BY_ALPHABET, sortByAlphabetState.appliedFilters);
    }
}