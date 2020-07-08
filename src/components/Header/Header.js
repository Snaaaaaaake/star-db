import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter as connectWithcRouter } from 'react-router-dom';
import classnames from 'classnames';
import entityTypes from '../../constants/entityTypes';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.currentMenuIndex = 0;
        this.menuItems = [
            { 
                name: 'Главная',
                link: '/',
                type: 'main',
            },
            { 
                name: 'Персонажи',
                link: `/${entityTypes.person}/all`,
                type: entityTypes.person,
            },
            { 
                name: 'Планеты',
                link: `/${entityTypes.planet}/all`,
                type: entityTypes.planet,
            },
            { 
                name: 'Корабли',
                link: `/starship/all`,
                type: entityTypes.starship,
            },
        ];
    }

    componentDidUpdate() {

    }

    render() {
        const { pathname } = this.props.location;
        let newMenuIndex = null;
        this.menuItems.forEach((item, index) => {
            const regexp = new RegExp(`^/${item.type}`);
            if(regexp.test(pathname)) {
                newMenuIndex = index;
            }
        });
        this.currentMenuIndex = newMenuIndex || 0;

        return (
            <header>
                <h1>StarDB</h1>
                <p>База данных по вселенной Звёздный Войн</p>
                <ul className="nav nav-tabs mb-3">
                    {this.menuItems.map((item, index) => {
                        const classes = classnames({ 'nav-link': true, active: this.currentMenuIndex === index });
                        return (
                            <li key={`menuItem${index}`} className="nav-item">
                                <Link to={item.link} className={classes}>{item.name}</Link>
                            </li>
                        );
                    })}
                </ul>
            </header>
        );
    }
}

export default connectWithcRouter(Header);
