import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function withAuth(ComponentToBeRendered) {
  class Authenticate extends Component {
    UNSAFE_componentWillMount() {
      if (this.props.isAuthenticated === false) {
        this.props.history.push('/login');
      }
    }
    UNSAFE_componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated === false) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ComponentToBeRendered {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { isAuthenticated: state.currentUser.isAuthenticated };
  }

  return connect(mapStateToProps)(Authenticate);
}
