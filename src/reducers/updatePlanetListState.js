export default function updatePlanetListState(state, action) {
    const { planetListState } = state;
    switch(action.type) {
        case 'FETCH_PLANET_LIST_REQUEST':
            return {
                pages: {},
                list:[],
                loading: true,
                error: null,
            };
        case 'FETCH_PLANET_LIST_SUCCESS':
            return {
                pages: action.payload.pages,
                list: action.payload.results,
                loading: false,
                error: null,
            };
        case 'FETCH_PLANET_LIST_FAILURE':
            return {
                pages: {},
                list: {},
                loading: false,
                error: action.payload,
            };
        default: return planetListState;
    }
}