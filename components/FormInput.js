import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import * as Constants from '../common/constants';

export default class FormInput extends React.PureComponent {
  state = {
    focus: !!this.props.autoFocus,
  };

  _handleBlur = () => {
    this.setState({ focus: false }, this.props.onBlur);
  };

  _handleFocus = () => {
    this.setState({ focus: true }, this.props.onFocus);
  };

  render() {
    const { focus } = this.state;
    const inputStyles = focus ? styles.inputFocus : styles.input;

    return (
      <TextInput
        underlineColorAndroid="transparent"
        autoCorrect={false}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
        autoFocus={this.props.autoFocus}
        style={inputStyles}
        value={this.props.value}
        placeholder={this.props.placeholder}
        placeholderTextColor="#ACACAC"
        returnKeyType={this.props.returnKeyType}
        secureTextEntry={this.props.secureTextEntry}
        onChangeText={this.props.onChangeText}
        onSubmitEditing={this.props.onSubmitEditing}
        blurOnSubmit={this.props.blurOnSubmit}
      />
    );
  }
}

const inputBase = {
  backgroundColor: Constants.colors.background,
  color: Constants.colors.black,
  height: 48,
  fontSize: 16,
  paddingLeft: 16,
  paddingRight: 16,
  flex: 0,
  justifyContent: 'space-between',
  alignSelf: 'stretch',
};

const styles = StyleSheet.create({
  input: {
    ...inputBase,
    borderBottomColor: Constants.colors.border,
    borderBottomWidth: 1,
  },
  inputFocus: {
    ...inputBase,
    borderBottomColor: Constants.colors.active,
    borderBottomWidth: 1,
  },
});
