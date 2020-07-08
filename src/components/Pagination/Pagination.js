import React from 'react';
import classnames from 'classnames';

const Pagination = (props) => {
    const { currentPage, countPages } = props.pages;
    const { eventListener } = props;
    const pageQuantity = [...new Array(Math.ceil(countPages/10))];

    const prevClass = classnames({
        'page-item': true,
        disabled: currentPage === 1,
    });
    const nextClass = classnames({
        'page-item': true,
        disabled: currentPage === pageQuantity.length,
    });

    return (
        <nav>
            <ul className="pagination">
                <li className={prevClass}>
                    <button onClick={eventListener(currentPage -1)} className="page-link">Предыдущая</button>
                </li>

                {pageQuantity.map((i, number) => {
                    const pageNumber = number + 1;
                    const classes = classnames({
                        'page-item': true,
                        active: pageNumber === currentPage,
                    });
                    return (
                        <li key={`page${pageNumber}`} className={classes}>
                            <button onClick={eventListener(pageNumber)} className="page-link">{pageNumber}</button>
                        </li>
                    );
                })}

                <li className={nextClass}>
                    <button onClick={eventListener(currentPage + 1)} className="page-link" >Следующая</button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;