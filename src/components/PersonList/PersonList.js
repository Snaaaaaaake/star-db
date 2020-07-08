import React from 'react';
import { connect as connectWithStore } from 'react-redux';
import { withRouter as connectWithcRouter } from 'react-router-dom';
import connectWithSwapiService from '../hoc/connectWithSwapiService';
import ItemList from '../ItemList/ItemList';
import { fetchPersonList } from '../../actions/actions';
import entityTypes from '../../constants/entityTypes';

const PersonList = (props) => <ItemList {...props} type={entityTypes.person} />

const mapStateToProps = (state) => {
    return {
        state: state.personListState,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchList: fetchPersonList(dispatch, ownProps),
    }
}

export default 
    connectWithcRouter(
        connectWithSwapiService(
            connectWithStore(mapStateToProps, mapDispatchToProps)(PersonList)
        )
    );