import React from 'react';
import { withRouter as connectWithcRouter } from 'react-router-dom';

const PageNotFound = ({ history }) => {
    return (<div className="text-center mt-5">
        <h2>Ошибка 404: нет такой страницы!</h2>
        <div>Вы можете вернуться на<button className="btn btn-link" onClick={() => history.goBack()}>предыдущую страницу</button></div>
    </div>);
};

export default connectWithcRouter(PageNotFound);