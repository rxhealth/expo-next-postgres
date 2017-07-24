import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import * as Constants from '../common/constants';

export default class HeaderButton extends React.PureComponent {
  render() {
    return (
      <Text style={styles.button} onPress={this.props.onPress}>
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    color: Constants.colors.black,
    marginRight: 16,
    fontWeight: '700',
  },
});
