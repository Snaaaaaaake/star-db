import noPhotoImg from '../images/no-photo.png';
import entityTypes from '../constants/entityTypes';

const fetchImage = (item, service, dispatch, action) => {
    let newDispatch;
    if (dispatch) {
        newDispatch = (newItem) => {
            dispatch(action(newItem))
            return newItem;
        };
    } else {
        // если нет dispatch на входе, то возвращаем просто item,
        // т.к. диспетчить его будут дальше
        newDispatch = (newItem) => newItem;
    }

    return service(item.id)
        .then((blob) => {
            const img = URL.createObjectURL(blob);
            const newItem = {
                ...item,
                img, 
            };
            return newDispatch(newItem);
        })
        .catch(err => {
            console.log(err);
            const newItem = {
                ...item,
                img: noPhotoImg, 
            };
            return newDispatch(newItem);
        });
}

const fetchSingleItem = (fetchRequestAction, fetchSuccessAction, fetchErrorAction, entityType) => (dispatch, ownProps) => (id) => {
    const { getItemMethod, getImageMethod } = ownProps.swapiService[entityType];
    dispatch(fetchRequestAction());
    getItemMethod(id)
        .then(item => {
            dispatch(fetchSuccessAction(item));
            return fetchImage(item, getImageMethod, dispatch, fetchSuccessAction);
        })
        .then(item => {
            if (item.relations) {
                fetchAllRelations(item, ownProps.swapiService, dispatch, fetchSuccessAction)
            }
        })
        .catch(err => dispatch(fetchErrorAction(err)));
}

const fetchListItems = (fetchRequestAction, fetchSuccessAction, fetchErrorAction, entityType) => (dispatch, ownProps) => (page) => {
    const { getImageMethod, getListMethod } = ownProps.swapiService[entityType];
    dispatch(fetchRequestAction());
    getListMethod(page)
            .then(data => {
                dispatch(fetchSuccessAction(data))
                const updatedListPromiseArray = data.results.map(item => 
                    fetchImage(item, getImageMethod)
                );
                Promise.all(updatedListPromiseArray).then(newList => {
                    data.results = newList;
                    dispatch(fetchSuccessAction(data));
                });
            })    
            .catch(err => dispatch(fetchErrorAction(err)));
}

const fetchRelation = (relations, service) => {
    const { getItemMethod, getImageMethod } = service[relations.type];
    const newRelationsPromiseArray = relations.data.map(relationId => {
        return getItemMethod(relationId, true);
    });
    return Promise.all(newRelationsPromiseArray)
        .then(newRelations => newRelations.map(relation => fetchImage(relation, getImageMethod)))
        .then(newRelationsWithImgPromiseArray => Promise.all(newRelationsWithImgPromiseArray))
        .then(itemList => {
            const newRelations = {
                ...relations,
                loading: false,
                data: itemList,
            }
           return newRelations;
        })
        .catch(err => {
            console.log(err);
            return undefined;
        });   
}

const fetchAllRelations = (item, service, dispatch, fetchSuccessAction) => {
    const updatedRelationsPromiseArray = item.relations.map(relation => fetchRelation(relation, service));
    Promise.all(updatedRelationsPromiseArray)
        .then(updatedRelations => {
            const updatedItem = {
                ...item,
                relations: updatedRelations,
            };
            dispatch(fetchSuccessAction(updatedItem));
        });
}

const fetchRandomPlanetRequest = () => {
    return {
        type: "FETCH_RANDOM_PLANET_REQUEST",
    }
};
const fetchRandomPlanetSuccess = (data) => {
    return {
        type: "FETCH_RANDOM_PLANET_SUCCESS",
        payload: data,
    }
};
const fetchRandomPlanetFailure = (error) => {
    return {
        type: "FETCH_RANDOM_PLANET_FAILURE",
        payload: error,
    }
};
const fetchRandomPlanet = fetchSingleItem(
    fetchRandomPlanetRequest,
    fetchRandomPlanetSuccess,
    fetchRandomPlanetFailure,
    entityTypes.planet,
);

const fetchPersonMiniListRequest = () => {
    return {
        type: "FETCH_PERSON_MINI_LIST_REQUEST",
    }
};
const fetchPersonMiniListSuccess = (data) => {
    return {
        type: "FETCH_PERSON_MINI_LIST_SUCCESS",
        payload: data,
    }
};
const fetchPersonMiniListFailure = (error) => {
    return {
        type: "FETCH_PERSON_MINI_LIST_FAILURE",
        payload: error,
    }
};
const selectPersonFromList = (data) => {
    return {
        type: "SELECT_PERSON_FROM_MINI_LIST",
        payload: data,
    }
};
const fetchPersonMiniList = (dispatch, ownProps) => () => {
    const { swapiService } = ownProps;
    dispatch(fetchPersonMiniListRequest());
        swapiService.getAllPersonsMini()
            .then(list => {
                dispatch(fetchPersonMiniListSuccess(list));
                const person = list[Math.floor(Math.random()*10)];
                selectPerson(dispatch, ownProps)(person)();
            })
            .catch(err => dispatch(fetchPersonMiniListFailure(err)));
}

const selectPerson = (dispatch, ownProps) => (person) => () => {
    const { swapiService } = ownProps;
    dispatch(selectPersonFromList(person));
    fetchImage(person, swapiService.getPersonPhoto, dispatch, selectPersonFromList);
}

const fetchPersonListRequest = () => {
    return {
        type: "FETCH_PERSON_LIST_REQUEST",
    }
};
const fetchPersonListSuccess = (data) => {
    return {
        type: "FETCH_PERSON_LIST_SUCCESS",
        payload: data,
    }
};
const fetchPersonListFailure = (error) => {
    return {
        type: "FETCH_PERSON_LIST_FAILURE",
        payload: error,
    }
};

const fetchPersonList = fetchListItems(
    fetchPersonListRequest,
    fetchPersonListSuccess,
    fetchPersonListFailure,
    entityTypes.person
);

const fetchPersonRequest = () => {
    return {
        type: "FETCH_PERSON_REQUEST",
    }
};
const fetchPersonSuccess = (data) => {
    return {
        type: "FETCH_PERSON_SUCCESS",
        payload: data,
    }
};
const fetchPersonFailure = (error) => {
    return {
        type: "FETCH_PERSON_FAILURE",
        payload: error,
    }
};
const fetchPerson = fetchSingleItem(
    fetchPersonRequest,
    fetchPersonSuccess,
    fetchPersonFailure,
    entityTypes.person,
);

const fetchPlanetListRequest = () => {
    return {
        type: "FETCH_PLANET_LIST_REQUEST",
    }
};
const fetchPlanetListSuccess = (data) => {
    return {
        type: "FETCH_PLANET_LIST_SUCCESS",
        payload: data,
    }
};
const fetchPlanetListFailure = (error) => {
    return {
        type: "FETCH_PLANET_LIST_FAILURE",
        payload: error,
    }
};
const fetchPlanetList = fetchListItems(
    fetchPlanetListRequest,
    fetchPlanetListSuccess,
    fetchPlanetListFailure,
    entityTypes.planet
);

const fetchPlanetRequest = () => {
    return {
        type: "FETCH_PLANET_REQUEST",
    }
};
const fetchPlanetSuccess = (data) => {
    return {
        type: "FETCH_PLANET_SUCCESS",
        payload: data,
    }
};
const fetchPlanetFailure = (error) => {
    return {
        type: "FETCH_PLANET_FAILURE",
        payload: error,
    }
};
const fetchPlanet = fetchSingleItem(
    fetchPlanetRequest,
    fetchPlanetSuccess,
    fetchPlanetFailure,
    entityTypes.planet,
);

const fetchStarshipListRequest = () => {
    return {
        type: "FETCH_STARSHIP_LIST_REQUEST",
    }
};
const fetchStarshipListSuccess = (data) => {
    return {
        type: "FETCH_STARSHIP_LIST_SUCCESS",
        payload: data,
    }
};
const fetchStarshipListFailure = (error) => {
    return {
        type: "FETCH_STARSHIP_LIST_FAILURE",
        payload: error,
    }
};
const fetchStarshipList = fetchListItems(
    fetchStarshipListRequest,
    fetchStarshipListSuccess,
    fetchStarshipListFailure,
    entityTypes.starship
);

const fetchStarshipRequest = () => {
    return {
        type: "FETCH_STARSHIP_REQUEST",
    }
};
const fetchStarshipSuccess = (data) => {
    return {
        type: "FETCH_STARSHIP_SUCCESS",
        payload: data,
    }
};
const fetchStarshipFailure = (error) => {
    return {
        type: "FETCH_STARSHIP_FAILURE",
        payload: error,
    }
};
const fetchStarship = fetchSingleItem(
    fetchStarshipRequest,
    fetchStarshipSuccess,
    fetchStarshipFailure,
    entityTypes.starship,
);

export { 
    fetchRandomPlanet,
    fetchPersonMiniList,
    selectPerson,
    fetchPerson,
    fetchPersonList,
    fetchPlanet,
    fetchPlanetList,
    fetchStarship,
    fetchStarshipList,
};