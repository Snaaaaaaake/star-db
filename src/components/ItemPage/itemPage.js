import React from 'react';
import ErrorElement from '../ErrorElement/ErrorElement';
import Spinner from '../Spinner/Spinner';
import itemSingleDataArrayToString from '../../utils/itemSingleDataArrayToString';
import RelationList from '../RelationList/RelationList';

export default class itemPage extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchItem(id);
    }

    render() {
        const { state } = this.props;
        const { item, loading, error } = state;

        let Content;
        if (error) {
            Content = () => <ErrorElement error={error} />;
        } else if (loading) {
            Content = () => <Spinner/>;
        } else {
            Content = () => <ItemCard item={item} />;
        }

        return <Content />;
    }
}

const ItemCard = (props) => {
    const { id, name, img, data, relations } = props.item;
    const dataKeys = Object.keys(data);

    let AditionalContent;
    if (relations) {
        AditionalContent = () => <RelationList relations={relations} />;
    } else {
        AditionalContent = () => null;
    }

    return (
        <div className="card mb-3">
            <img src={img} className="card-img-top" alt={name}/>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                {dataKeys.map((item, number) => 
                    <p key={`item${id}Data${number}`} className="card-text">
                        {itemSingleDataArrayToString(data[item])}
                    </p>
                )}
                <AditionalContent />
            </div>
        </div>
    );
};