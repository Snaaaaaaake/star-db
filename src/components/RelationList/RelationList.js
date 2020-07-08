import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const RelationList = ({ relations }) => {
    return relations.map((relation, index) => {

        const { name, data, type } = relation;

        if (relation.loading) {
            return <div key={`relation${name}${index}IsLoading`} className="mb-3">
                <h6 className="card-title">{name}</h6>
                <Spinner />
            </div>
        }
        return <div key={`relationBlock${type}${index}`} className="mb-3">
            <h6 className="card-title">{name}</h6>
            <div className="d-flex flex-row flex-wrap justify-content-around">
                {data.map((item, number) => 
                    <div key={`relation${type}${number}`} className="card mb-3" style={{width: '100px'}}>
                        <img src={item.img} className="card-img-top" alt={item.name} />
                        <div className="card-body px-2 py-1">
                            <p className="card-text mb-1">{item.name}</p>
                            <Link to={`/${type}/${item.id}`} className="btn btn-link px-0 py-0">Подробнее</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    })
}

export default RelationList;