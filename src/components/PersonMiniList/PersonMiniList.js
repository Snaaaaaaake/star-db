import React from 'react';
import { connect as connectWithStore } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import connectWithSwapiService from '../hoc/connectWithSwapiService';
import ErrorElement from '../ErrorElement/ErrorElement';
import Spinner from '../Spinner/Spinner';
import { fetchPersonMiniList, selectPerson } from '../../actions/actions';

class PersonMiniListContainer extends React.Component {
    componentDidMount() {
        this.props.fetchPersonMiniList();
    }

    render() {
        const { person, list, error, loading } = this.props.personMiniListState;

        const selectedId = person ? person.id : null;
        let ListContent;
        if (error) {
            ListContent = () => <ErrorElement error={error} />;
        } else if (loading) {
            ListContent = () => <Spinner/>;
        } else {
            ListContent = () => <PersonMiniList list={list} selectPerson={this.props.selectPerson} selectedId={selectedId} />;
        }

        let PhotoContent;
        if (!person) {
            PhotoContent = () => <Spinner/>;
        } else {
            PhotoContent = () => <PersonPhoto person={person} />;
        }

        return (<>
            <h5>Список персонажей</h5>
            <div className="row mb-3">
                <div className="col">
                    <ListContent />
                </div>
                <div className="col">
                    <PhotoContent />
                </div>
            </div>
        </>);
    }
}

const PersonMiniList = (props) => {
    return (
        props.list.map(person => {
            const classes = classnames({
                'list-group-item': true,
                'list-group-item-action': true,
                active: person.id === props.selectedId,
            });
            return <button 
                key={person.name}
                type="button"
                className={classes}
                onClick={props.selectPerson(person)}
            >{person.name}</button>
        })
    );
}
const PersonPhoto = (props) => {
    return (<>
        <img src={props.person.img} className="card-img-top" alt={props.person.name}/>
        <Link to={`/person/${props.person.id}`} className="mt-3 btn btn-light">Страница персонажа</Link>
    </>);
}

const mapStateToProps = (state) => {
    return {
        personMiniListState: state.personMiniListState,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchPersonMiniList: fetchPersonMiniList(dispatch, ownProps),
        selectPerson: selectPerson(dispatch, ownProps),
    }
}

export default connectWithSwapiService(
    connectWithStore(mapStateToProps, mapDispatchToProps)(PersonMiniListContainer)
);