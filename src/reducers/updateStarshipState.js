export default function updateStarshipState(state, action) {
    const { starshipState } = state;
    switch(action.type) {
        case 'FETCH_STARSHIP_REQUEST':
            return {
                item: {},
                loading: true,
                error: null,
            };
        case 'FETCH_STARSHIP_SUCCESS':
            return {
                item: action.payload,
                loading: false,
                error: null,
            };
        case 'FETCH_STARSHIP_FAILURE':
            return {
                item: {},
                loading: false,
                error: action.payload,
            };
        default: 
            return starshipState;
    }
}