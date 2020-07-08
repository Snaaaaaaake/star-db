import React from 'react';
import { connect as connectWithStore } from 'react-redux';
import { withRouter as connectWithcRouter } from 'react-router-dom';
import connectWithSwapiService from '../hoc/connectWithSwapiService';
import { fetchPerson } from '../../actions/actions';
import ItemPage from '../ItemPage/itemPage';

const PersonPage = (props) => <ItemPage {...props} />

const mapStateToProps = (state) => {
    return {
        state: state.personState,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchItem: fetchPerson(dispatch, ownProps),
    }
}

export default 
    connectWithcRouter(
        connectWithSwapiService(
            connectWithStore(mapStateToProps, mapDispatchToProps)(PersonPage)
        )
    );