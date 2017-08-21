import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import SwipeOut from 'react-native-swipeout';
import CommentListItemBody from '../components/CommentListItemBody';

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
            await HTTP.deleteComment({ commentId, postId });
            await this.props.onRefresh();
          },
        },
      ]
    );
  };

  render() {
    const { isOnPost, isAuthenticated, isLast, comment, viewer } = this.props;
    const isYours = isAuthenticated && comment.user.id === viewer.id;

    return (
      <View style={isLast ? styles.itemBorderless : styles.item}>
        <View style={styles.content}>
          <CommentListItemBody
            onPress={
              !isOnPost ? () => this._handleViewPost(c.postId) : undefined
            }
            content={comment.content}
            createdAt={comment.createdAt}
            username={comment.user.username}
          />

          {comment.replies.length > 1
            ? <View style={styles.reply}>
                {comment.replies.map((c, index) => {
                  const isYourReply =
                    isAuthenticated && c.user.id === viewer.id;
                  return (
                    <View
                      style={styles.replyItem}
                      key={`${c.content}-${index}`}>
                      <CommentListItemBody
                        isYourReply={isYourReply}
                        content={c.content}
                        createdAt={c.createdAt}
                        username={c.user.username}
                        onPress={
                          !isOnPost
                            ? () => this._handleViewPost(comment.postId)
                            : undefined
                        }
                        onDelete={() =>
                          this._handleDeleteComment({
                            commentId: c.id,
                            postId: c.postId,
                          })}
                      />
                    </View>
                  );
                })}
              </View>
            : undefined}

          {isAuthenticated
            ? <View style={styles.action}>
                {isYours
                  ? <Text
                      style={styles.actionItem}
                      onPress={() =>
                        this._handleDeleteComment({
                          commentId: comment.id,
                          postId: comment.postId,
                        })}>
                      Delete
                    </Text>
                  : undefined}

                {!comment.commentId
                  ? <Text
                      style={styles.actionItem}
                      onPress={() =>
                        this._handleReply(
                          comment.replies.length > 1
                            ? comment.replies[comment.replies.length - 1]
                            : comment
                        )}>
                      Reply
                    </Text>
                  : undefined}
              </View>
            : undefined}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderColor: Constants.colors.border,
    borderBottomWidth: 1,
  },
  itemBorderless: {},
  content: {
    backgroundColor: Constants.colors.background,
    padding: 16,
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
  action: {
    flex: 1,
    marginTop: 16,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  actionItem: {
    color: Constants.colors.gray,
    marginLeft: 16,
    fontWeight: '600',
  },
  reply: { paddingTop: 16 },
  replyItem: {
    paddingLeft: 16,
    paddingTop: 6,
    paddingBottom: 6,
    borderLeftWidth: 1,
    borderColor: Constants.colors.border,
  },
});
