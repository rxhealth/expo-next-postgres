import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import SwipeOut from 'react-native-swipeout';

import * as HTTP from '../common/http';
import * as Strings from '../common/strings';
import * as Constants from '../common/constants';

export default class CommentListItem extends React.PureComponent {
  _handleViewPost = postId => {
    this.props.navigation.navigate('post', { id: postId });
  };

  _handleReply = comment => {
    this.props.navigation.navigate('reply', { comment });
  };

  _handleDeleteComment = async ({ commentId, postId }) => {
    Alert.alert(
      'Are you sure?',
      'By selecting OK you are deleting this comment forever.',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'OK',
          onPress: async () => {
            await HTTP.commentDelete({ commentId, postId });
            await this.props.onRefresh();
          },
        },
      ]
    );
  };

  render() {
    const { isYours, isOnPost, isLast, comment } = this.props;
    const buttons = [];
    console.log(comment.replies);

    if (!isOnPost) {
      buttons.push({
        autoClose: true,
        backgroundColor: Constants.colors.blue,
        onPress: () => this._handleViewPost(comment.postId),
        component: (
          <View style={styles.button}>
            <Text style={styles.buttonText}>View 📝</Text>
          </View>
        ),
      });
    }

    if (isYours) {
      buttons.push({
        autoClose: true,
        backgroundColor: Constants.colors.red,
        component: (
          <View style={styles.button}>
            <Text style={styles.buttonText}>Delete 💬</Text>
          </View>
        ),
        onPress: () =>
          this._handleDeleteComment({
            commentId: comment.id,
            postId: comment.postId,
          }),
      });
    }

    return (
      <SwipeOut
        backgroundColor={Constants.colors.black}
        right={buttons.length ? buttons : undefined}>
        <View style={isLast ? styles.itemBorderless : styles.item}>
          <Text style={styles.content}>
            {comment.content}
          </Text>

          {comment.replies.map((c, index) => {
            return (
              <View key={`${c.content}-${index}`}>
                <Text>{c.user.username} {Strings.toDate(c.createdAt)}</Text>
                <Text>{c.content}</Text>
              </View>
            );
          })}

          <View style={styles.action}>
            <Text onPress={() => this._handleReply(comment)}>Reply</Text>
          </View>

          <Text style={styles.lockup}>
            💬 by
            {' '}
            <Text style={styles.bold}>{comment.user.username}</Text>
            {' '}
            written on
            {' '}
            <Text style={styles.bold}>{Strings.toDate(comment.createdAt)}</Text>
          </Text>
          <Text style={styles.response}>
            📮 in response to
            {' '}
            <Text style={styles.bold}>{comment.post.title}</Text>
          </Text>
        </View>
      </SwipeOut>
    );
  }
}

const commentItemBaseStyles = {
  backgroundColor: Constants.colors.background,
  flex: 1,
  padding: 16,
};

const styles = StyleSheet.create({
  item: {
    ...commentItemBaseStyles,
    borderColor: Constants.colors.border,
    borderBottomWidth: 1,
  },
  itemBorderless: {
    ...commentItemBaseStyles,
  },
  action: {
    padding: 16,
    justifyContent: 'flex-end',
  },
  button: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Constants.colors.background,
    fontWeight: '600',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  content: {
    fontSize: 18,
  },
  bold: {
    fontWeight: '600',
  },
  lockup: {
    fontSize: 12,
    marginTop: 16,
  },
  response: {
    fontSize: 12,
  },
});
