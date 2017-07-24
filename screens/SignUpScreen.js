import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  WebView,
  Keyboard,
} from 'react-native';

import FormInput from '../components/FormInput';
import FluidButton from '../components/FluidButton';

import { withAuth } from '../higher-order/withAuth';

import * as Constants from '../common/constants';
import * as Actions from '../common/actions';

const DEFAULT_SIGNUP_STATE = {
  username: '',
  password: '',
  confirm: '',
};

class SignUpScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;

    return {
      title: '👥 Create account',
    };
  };

  state = {
    signup: DEFAULT_SIGNUP_STATE,
    error: undefined,
  };

  _handleSignUp = async () => {
    Keyboard.dismiss();

    this.props.dispatch(
      Actions.signUp({
        data: {
          username: this.state.signup.username,
          password: this.state.signup.password,
          confirm: this.state.signup.confirm,
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

  _handleChangeNewUsername = username => {
    this.setState({
      error: undefined,
      signup: { ...this.state.signup, username },
    });
  };

  _handleChangeNewPassword = password => {
    this.setState({
      error: undefined,
      signup: { ...this.state.signup, password },
    });
  };

  _handleChangeConfirmPassword = confirm => {
    this.setState({
      error: undefined,
      signup: { ...this.state.signup, confirm },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          By creating an account, you can view your posts at
          {' '}
          <Text style={styles.bold}>
            {Constants.routes.base}
          </Text>
          {' '}
          and modify your posts or comments at any time.
        </Text>
        <FormInput
          value={this.state.signup.username}
          placeholder="username"
          returnKeyType="next"
          onChangeText={this._handleChangeNewUsername}
        />
        <FormInput
          value={this.state.signup.password}
          placeholder="password"
          secureTextEntry
          returnKeyType="next"
          onChangeText={this._handleChangeNewPassword}
        />
        <FormInput
          value={this.state.signup.confirm}
          placeholder="confirm password"
          secureTextEntry
          onChangeText={this._handleChangeConfirmPassword}
          onSubmitEditing={this._handleSignUp}
          blurOnSubmit
        />
        <View style={styles.subContainer}>
          <FluidButton text="Sign up" onPress={this._handleSignUp} />
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
    backgroundColor: Constants.colors.background,
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  errorText: {
    color: Constants.colors.error,
    fontSize: 14,
  },
  text: {
    padding: 16,
    fontSize: 16,
  },
  bold: {
    fontWeight: '600',
  },
  subContainer: {
    padding: 16,
  },
});

export default withAuth({})(SignUpScreen);
