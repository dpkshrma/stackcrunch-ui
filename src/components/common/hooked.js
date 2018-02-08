import React from 'react';

export default (WrappedComponent, hook) =>
  class Hook extends React.Component {
    componentWillMount() {
      const { onEnter = () => {} } = hook || {};
      onEnter(this.props);
    }
    componentWillUnmount() {
      const { onLeave = () => {} } = hook || {};
      onLeave(this.props);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
