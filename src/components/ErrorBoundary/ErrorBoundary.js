import React from 'react';
import ErrorElement from '../ErrorElement/ErrorElement'

export default class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: error };
    }

    render() {
        return this.state.hasError ? 
        <ErrorElement error={this.state.hasError} /> :
        this.props.children;
    }
}
