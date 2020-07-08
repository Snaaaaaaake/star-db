export default function updateRandomPlanetState(state, action) {
    const { randomPlanetState } = state
    switch(action.type) {
        case 'FETCH_RANDOM_PLANET_REQUEST':
            return {
                planet: {},
                loading: true,
                error: null,
            };
        case 'FETCH_RANDOM_PLANET_SUCCESS':
            return {
                planet: action.payload,
                loading: false,
                error: null,
            };
        case 'FETCH_RANDOM_PLANET_FAILURE':
            return {
                planet: {},
                loading: false,
                error: action.payload,
            };
        default: return randomPlanetState;
    }
}