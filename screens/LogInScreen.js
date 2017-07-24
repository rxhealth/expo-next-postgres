import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  WebView,
  Keyboard,
} from 'react-native';

import FluidButton from '../components/FluidButton';
import FormInput from '../components/FormInput';

import { withAuth } from '../higher-order/withAuth';

import * as Actions from '../common/actions';
import * as Constants from '../common/constants';

const DEFAULT_LOGIN_STATE = {
  username: '',
  password: '',
};

class LogInScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;

    return {
      title: '🔐 Login',
    };
  };

  state = {
    login: DEFAULT_LOGIN_STATE,
    error: undefined,
  };

  _handleLogIn = async () => {
    Keyboard.dismiss();

    this.props.dispatch(
      Actions.logIn({
        data: {
          username: this.state.login.username,
          password: this.state.login.password,
        },
        navigation: this.props.navigation,
        onFailure: () => {
          this.setState({
            error: 'This is a placeholder error message that will be replaced with a real error message someday. You should just make sure your fields all make sense.',
          });
        },
      })
    );
  };

  _handleChangeUsername = username => {
    this.setState({
      error: undefined,
      login: { ...this.state.login, username },
    });
  };

  _handleChangePassword = password => {
    this.setState({
      error: undefined,
      login: { ...this.state.login, password },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Log in to your account to write posts and comments. Your credentials can also be used at
          {' '}
          <Text style={styles.bold}>
            {Constants.routes.base}
          </Text>.
        </Text>

        <FormInput
          ref="username"
          value={this.state.login.username}
          placeholder="username"
          returnKeyType="next"
          onChangeText={this._handleChangeUsername}
        />

        <FormInput
          ref="password"
          value={this.state.login.password}
          placeholder="password"
          secureTextEntry
          onChangeText={this._handleChangePassword}
          onSubmitEditing={this._handleLogIn}
          blurOnSubmit
        />

        <View style={styles.subContainer}>
          <FluidButton text="Log in" onPress={this._handleLogIn} />
        </View>

        {this.state.error
          ? <View style={styles.subContainer}>
              <Text style={styles.errorText}>
                <Text style={styles.bold}>Something went wrong:</Text>
                {' '}
                {this.state.error}
              </Text>
            </View>
          : undefined}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.colors.white,
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  text: {
    padding: 16,
    fontSize: 16,
  },
  errorText: {
    color: Constants.colors.error,
    fontSize: 14,
  },
  subContainer: {
    padding: 16,
  },
  bold: {
    fontWeight: '600',
  },
});

export default withAuth({})(LogInScreen);
