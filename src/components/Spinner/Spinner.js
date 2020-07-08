import React from 'react';
import loadingIcon from '../../images/loading-icon.gif';

const Spinner = () => {
    return (
        <div className="text-center my-4 w-100">
            <img src={loadingIcon} alt="Загрузка..." />
        </div>
    );
}

export default Spinner;