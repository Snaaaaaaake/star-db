import React from 'react';
import { connect as connectWithStore } from 'react-redux';
import { withRouter as connectWithcRouter } from 'react-router-dom';
import connectWithSwapiService from '../hoc/connectWithSwapiService';
import { fetchStarship } from '../../actions/actions';
import ItemPage from '../ItemPage/itemPage';

const StarshipPage = (props) => <ItemPage {...props} />

const mapStateToProps = (state) => {
    return {
        state: state.starshipState,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchItem: fetchStarship(dispatch, ownProps),
    }
}

export default 
    connectWithcRouter(
        connectWithSwapiService(
            connectWithStore(mapStateToProps, mapDispatchToProps)(StarshipPage)
        )
    );