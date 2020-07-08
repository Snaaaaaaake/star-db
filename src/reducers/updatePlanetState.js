export default function updatePersonState(state, action) {
    const { planetState } = state;
    switch(action.type) {
        case 'FETCH_PLANET_REQUEST':
            return {
                item: {},
                loading: true,
                error: null,
            };
        case 'FETCH_PLANET_SUCCESS':
            return {
                item: action.payload,
                loading: false,
                error: null,
            };
        case 'FETCH_PLANET_FAILURE':
            return {
                item: {},
                loading: false,
                error: action.payload,
            };
        default: 
            return planetState;
    }
}