import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import * as Constants from '../common/constants';
import * as Strings from '../common/strings';

export default class CommentListItemBody extends React.PureComponent {
  static propTypes = {
    username: PropTypes.string,
    createdAt: PropTypes.string,
    content: PropTypes.string,
    onDelete: PropTypes.func,
    isYourReply: PropTypes.bool,
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            <Text style={styles.bold}>{this.props.username}</Text>
            {' · '}
            {Strings.toDate(this.props.createdAt)}
            {this.props.onDelete && this.props.isYourReply
              ? <Text style={styles.bold} onPress={this.props.onDelete}>
                  {' · '}Remove reply
                </Text>
              : undefined}
          </Text>
        </View>
        <View>
          <Text style={styles.content}>
            {this.props.content}
          </Text>
          <View>
            {this.props.children}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: { fontSize: 12, color: Constants.colors.gray },
  bold: { fontWeight: '600' },
  container: { paddingTop: 8, paddingBottom: 8 },
  content: { fontSize: 16, marginTop: 4 },
});
