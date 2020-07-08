import React from 'react';
import { connect as connectWithStore } from 'react-redux';
import { withRouter as connectWithcRouter } from 'react-router-dom';
import connectWithSwapiService from '../hoc/connectWithSwapiService';
import { fetchPlanet } from '../../actions/actions';
import ItemPage from '../ItemPage/itemPage';

const PlanetPage = (props) => <ItemPage {...props} />

const mapStateToProps = (state) => {
    return {
        state: state.planetState,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchItem: fetchPlanet(dispatch, ownProps),
    }
}

export default 
    connectWithcRouter(
        connectWithSwapiService(
            connectWithStore(mapStateToProps, mapDispatchToProps)(PlanetPage)
        )
    );