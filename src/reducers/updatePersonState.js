export default function updatePersonState(state, action) {
    const { personState } = state;
    switch(action.type) {
        case 'FETCH_PERSON_REQUEST':
            return {
                item: {},
                loading: true,
                error: null,
            };
        case 'FETCH_PERSON_SUCCESS':
            return {
                item: action.payload,
                loading: false,
                error: null,
            };
        case 'FETCH_PERSON_FAILURE':
            return {
                item: {},
                loading: false,
                error: action.payload,
            };
        default: 
            return personState;
    }
}