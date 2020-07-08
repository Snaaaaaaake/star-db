import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Header from '../Header/Header';
import MainPage from '../MainPage/MainPage';
import PersonList from '../PersonList/PersonList';
import PersonPage from '../PersonPage/PersonPage';
import PlanetList from '../PlanetList/PlanetList';
import PageNotFound from '../PageNotFound/PageNotFound';
import PlanetPage from '../PlanetPage/PlanetPage';
import StarshipList from '../StarshipList/StarshipList';
import StarshipPage from '../StarshipPage/StarshipPage';

const App = () => {
    return (
        <div className="container mt-5">
            <ErrorBoundary>
                <Header/>
            </ErrorBoundary>
            <ErrorBoundary>
                <Switch>
                    <Route path='/' exact component={MainPage} />
                    <Route path='/person/all/:page?' component={PersonList} />
                    <Route path='/person/:id' component={PersonPage} />
                    <Route path='/planet/all/:page?' component={PlanetList} />
                    <Route path='/planet/:id' component={PlanetPage} />
                    <Route path='/starship/all/:page?' component={StarshipList} />
                    <Route path='/starship/:id' component={StarshipPage} />
                    <Route component={PageNotFound} />
                </Switch>
            </ErrorBoundary>
        </div>
    );
}

export default App;