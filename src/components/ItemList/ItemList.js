import React from 'react';
import { Link } from 'react-router-dom';
import ErrorElement from '../ErrorElement/ErrorElement';
import Spinner from '../Spinner/Spinner';
import Pagination from '../Pagination/Pagination';

export default class ItemList extends React.Component {
    componentDidMount() {
        const currentPageFromHistory = this.props.match.params.page;
        this.props.fetchList(currentPageFromHistory);
    }

    componentDidUpdate(prevProps) {
        const oldPathname = prevProps.location.pathname;
        const newPathname = this.props.location.pathname;
        const isMainLink = /\/all$/.test(this.props.location.pathname);
        if (oldPathname !== newPathname && isMainLink) {
          this.changePage()();
        }
      }

    changePage = (page) => () => {
        this.props.fetchList(page);
        this.props.history.push(`/${this.props.type}/all` + (page ? `/${page}` : ''));
    }

    render() {
        const { state, type } = this.props;
        const { list, pages, loading, error } = state;

        let Content;
        if (error) {
            Content = () => <ErrorElement error={error} />;
        } else if (loading) {
            Content = () => <Spinner/>;
        } else {
            Content = () => (<>
                <div className="d-flex flex-row flex-wrap justify-content-around">
                    {list.map(item => <ItemCard key={`item${item.id}`} item={item} type={type} />)}
                </div>
                <div className="d-flex flex-row flex-wrap justify-content-around">
                    <Pagination pages={pages} eventListener={this.changePage}/>
                </div>
            </>);
        }

        return <Content />;
    }
}

const ItemCard = (props) => {
    const { item, type } = props;
    return <div className="card mb-3" style={{width: '200px'}}>
        <img src={item.img} className="card-img-top" alt={item.name} />
        <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <Link to={`/${type}/${item.id}`} className="btn btn-link">Подробнее</Link>
        </div>
    </div>
}