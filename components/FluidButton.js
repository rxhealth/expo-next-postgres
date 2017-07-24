import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import * as Constants from '../common/constants';

export default class FluidButton extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Constants.colors.active,
    borderRadius: 4,
    height: 48,
    flex: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Constants.colors.background,
    fontWeight: '600',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
