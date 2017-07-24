import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  WebView,
} from 'react-native';

import SignInNavigator from '../navigation/SignInNavigator';

import FluidButton from '../components/FluidButton';

import { withAuth } from '../higher-order/withAuth';

import * as Constants from '../common/constants';
import * as Actions from '../common/actions';

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;

    return {
      title: `${state.params && state.params.title ? state.params.title : 'Sign in'}`,
      headerStyle: Constants.styles.headerStyle,
    };
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated === this.props.isAuthenticated) {
      return;
    }

    const title = nextProps.isAuthenticated ? 'Settings' : 'Sign in';
    this.props.navigation.setParams({ title });
  }

  _handleLogOut = async () => {
    this.props.dispatch(
      Actions.logOut({
        navigation: this.props.navigation,
      })
    );
  };

  render() {
    if (this.props.isAuthenticated) {
      return (
        <View style={styles.authContainer}>
          <Text style={styles.text}>
            You are logged as
            {' '}
            <Text style={styles.bold}>{this.props.viewer.username}</Text>
          </Text>
          <FluidButton onPress={this._handleLogOut} text="Log out" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SignInNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.colors.background,
    flex: 1,
  },
  bold: {
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
    paddingBottom: 16,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  authContainer: {
    backgroundColor: Constants.colors.background,
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withAuth({})(SettingsScreen);
