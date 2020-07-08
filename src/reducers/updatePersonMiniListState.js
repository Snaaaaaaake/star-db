export default function updatePersonMiniListState(state, action) {
    const { personMiniListState } = state
    switch(action.type) {
        case 'FETCH_PERSON_MINI_LIST_REQUEST':
            return {
                person: null,
                list:[],
                loading: true,
                error: null,
            };
        case 'FETCH_PERSON_MINI_LIST_SUCCESS':
            return {
                person: null,
                list: action.payload,
                loading: false,
                error: null,
            };
        case 'FETCH_PERSON_MINI_LIST_FAILURE':
            return {
                person: null,
                list:[],
                loading: false,
                error: action.payload,
            };
        case 'SELECT_PERSON_FROM_MINI_LIST':
            return {
                person: action.payload,
                list: personMiniListState.list,
                loading: false,
                error: null,
            };
        default: return personMiniListState;
    }
}