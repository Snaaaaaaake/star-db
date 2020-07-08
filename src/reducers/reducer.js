import updateRandomPlanetState from './updateRandomPlanetState';
import updatePersonMiniListState from './updatePersonMiniListState';
import updatePersonListState from './updatePersonListState';
import updatePersonState from './updatePersonState';
import updatePlanetListState from './updatePlanetListState';
import updatePlanetState from './updatePlanetState';
import updateStarshipListState from './updateStarshipListState';
import updateStarshipState from './updateStarshipState';

const initialState = {
    randomPlanetState: {
        planet: {},
        loading: true,
        error: null,
    },
    personMiniListState: {
        person: null,
        list:[],
        loading: true,
        error: null,
    },
    personState: {
        item: {},
        loading: true,
        error: null,
    },
    personListState: {
        pages: {},
        list: [],
        loading: true,
        error: null,
    },
    planetState: {
        item: {},
        loading: true,
        error: null,
    },
    planetListState: {
        pages: {},
        list: [],
        loading: true,
        error: null,
    },
    starshipState: {
        item: {},
        loading: true,
        error: null,
    },
    starshipListState: {
        pages: {},
        list: [],
        loading: true,
        error: null,
    },
};

const reducer = (state = initialState, action) => {
    console.log(action.type);
    return {
        ...state,
        randomPlanetState: updateRandomPlanetState(state, action),
        personMiniListState: updatePersonMiniListState(state, action),
        personState: updatePersonState(state, action),
        personListState: updatePersonListState(state, action),
        planetState: updatePlanetState(state, action),
        planetListState: updatePlanetListState(state, action),
        starshipListState: updateStarshipListState(state, action),
        starshipState: updateStarshipState(state, action),
    };
};

export default reducer;
