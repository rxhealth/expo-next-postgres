import React from 'react';
import { connect } from 'react-redux';
import * as HTTP from '../common/http';

const mapStateToAuthProps = state => {
  return { viewer: state.viewer };
};

// TODO: You could add session management code here.
export const withAuth = options => TargetComponent => {
  class withAuthComponent extends React.Component {
    static navigationOptions = TargetComponent.navigationOptions;

    state = {
      isAuthenticated: !!this.props.viewer,
    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.viewer && this.state.isAuthenticated) {
        return;
      }

      this.setState({
        isAuthenticated: !!nextProps.viewer,
      });
    }

    render() {
      return React.createElement(TargetComponent, {
        ...this.props,
        isAuthenticated: this.state.isAuthenticated,
      });
    }
  }

  return connect(mapStateToAuthProps)(withAuthComponent);
};
