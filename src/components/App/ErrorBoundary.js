import React, { Component, Fragment } from 'react';

class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null
  };
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }
  render() {
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      return (
        <Fragment>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </Fragment>
      );
    }
    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

export default ErrorBoundary;
