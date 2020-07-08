import React from 'react';
import { connect as connectWithStore } from 'react-redux';
import connectWithSwapiService from '../hoc/connectWithSwapiService';
import { Link } from 'react-router-dom';
import ErrorElement from '../ErrorElement/ErrorElement';
import Spinner from '../Spinner/Spinner';
import { fetchRandomPlanet } from '../../actions/actions';
import itemSingleDataArrayToString from '../../utils/itemSingleDataArrayToString';


class RandomPlanetContainer extends React.Component {
    componentDidMount() {
        const random = Math.floor(Math.random()*25+2);
        this.props.fetchRandomPlanet(random);
    }

    render() {
        const { planet, error, loading } = this.props.randomPlanetState;
        let Content;
        if (error) {
            Content = () => <ErrorElement error={error} />;
        } else if (loading) {
            Content = () => <Spinner/>;
        } else {
            Content = () => <RandomPlanet planet={planet} />;
        }
        return (<>
            <h5>Случайная планета</h5>
            <div className="card mb-3">
                <div className="row no-gutters">
                    <Content />
                </div>
            </div>
        </>);
    }
}

const RandomPlanet = (props) => {
    const { id, name, img, data } = props.planet;
    const dataKeys = Object.keys(data)
    return (
        <div className="row no-gutters">
            <div className="col-md-4">
                <img src={img} className="card-img mx-1 my-1" alt="Случайная планета" />
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    {dataKeys.map((item, number) => 
                        <p key={`item${id}Data${number}`} className="card-text">
                            {itemSingleDataArrayToString(data[item])}
                        </p>
                    )}
                    <Link to={`/planet/${id}`} className="mt-3 btn btn-light">Подробнее</Link>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        randomPlanetState: state.randomPlanetState,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchRandomPlanet: fetchRandomPlanet(dispatch, ownProps),
    }
}

export default connectWithSwapiService(
    connectWithStore(mapStateToProps, mapDispatchToProps)(RandomPlanetContainer)
);