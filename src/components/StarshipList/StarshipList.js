import React from 'react';
import { connect as connectWithStore } from 'react-redux';
import { withRouter as connectWithcRouter } from 'react-router-dom';
import connectWithSwapiService from '../hoc/connectWithSwapiService';
import ItemList from '../ItemList/ItemList';
import { fetchStarshipList } from '../../actions/actions';
import entityTypes from '../../constants/entityTypes';

const StarshipList = (props) => <ItemList {...props} type={entityTypes.starship} />

const mapStateToProps = (state) => {
    return {
        state: state.starshipListState,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchList: fetchStarshipList(dispatch, ownProps),
    }
}

export default 
    connectWithcRouter(
        connectWithSwapiService(
            connectWithStore(mapStateToProps, mapDispatchToProps)(StarshipList)
        )
    );