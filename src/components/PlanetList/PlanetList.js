import React from 'react';
import { connect as connectWithStore } from 'react-redux';
import { withRouter as connectWithcRouter } from 'react-router-dom';
import connectWithSwapiService from '../hoc/connectWithSwapiService';
import ItemList from '../ItemList/ItemList';
import { fetchPlanetList } from '../../actions/actions';
import entityTypes from '../../constants/entityTypes';

const PlanetList = (props) => <ItemList {...props} type={entityTypes.planet} />

const mapStateToProps = (state) => {
    return {
        state: state.planetListState,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchList: fetchPlanetList(dispatch, ownProps),
    }
}

export default 
    connectWithcRouter(
        connectWithSwapiService(
            connectWithStore(mapStateToProps, mapDispatchToProps)(PlanetList)
        )
    );