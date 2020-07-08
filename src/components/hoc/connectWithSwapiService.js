import React from 'react';
import { SwapiServiceConsumer } from '../swapiContext/swapiContext';

export default function connectWithSwapiService(Wrapped) {
    return (props) => {
        return (
            <SwapiServiceConsumer>
                {
                    (value) => {
                        return <Wrapped {...props} swapiService={value} />
                    }
                }
            </SwapiServiceConsumer>
        );
    }
};