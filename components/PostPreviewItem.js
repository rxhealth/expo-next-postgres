import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

import * as Strings from '../common/strings';
import * as Constants from '../common/constants';

export default class PostPreviewItem extends React.Component {
  render() {
    const { post, isLast, onNavigateToPost } = this.props;

    return (
      <TouchableOpacity
        onPress={onNavigateToPost}
        key={post.id}
        style={isLast ? styles.itemBorderless : styles.item}>
        <Text style={styles.title}>
          {Strings.isEmpty(post.title) ? 'Untitled' : post.title}
        </Text>
        <Text style={styles.lockup}>
          💬 {post.comments.length}
          {' '}
          {Strings.pluralize('comment', post.comments.length)}
          {' '}
          📝
          {' '}
          <Text style={styles.bold}>{Strings.toDate(post.createdAt)}</Text>
          {' '}
          by
          {' '}
          <Text style={styles.bold}>{post.User.username}</Text>
        </Text>
        <Text style={styles.content}>
          {Strings.elide(
            post.content,
            Constants.sizes.postPreivewCharacterLimit
          )}
        </Text>
      </TouchableOpacity>
    );
  }
}

const itemBaseStyles = {
  flex: 1,
  paddingTop: 16,
  paddingLeft: 16,
  paddingRight: 16,
  paddingBottom: 16,
};

const styles = StyleSheet.create({
  item: {
    ...itemBaseStyles,
    borderColor: Constants.colors.border,
    borderBottomWidth: 1,
  },
  itemBorderless: {
    ...itemBaseStyles,
  },
  bold: {
    fontWeight: '600',
  },
  lockup: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  content: {
    fontSize: 18,
  },
});
