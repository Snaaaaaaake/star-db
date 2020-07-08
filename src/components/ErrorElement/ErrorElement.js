import React from 'react';

const ErrorElement = (props) => {
    return (
        <div className="text-center my-4 w-100">
            {`Ошибка: ${props.error}`}
        </div>
    );
}
export default ErrorElement;