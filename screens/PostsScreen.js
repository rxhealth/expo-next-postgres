import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  RefreshControl,
} from 'react-native';

import PostPreviewItem from '../components/PostPreviewItem';

import * as Constants from '../common/constants';
import * as HTTP from '../common/http';

export default class PostsScreen extends React.Component {
  static navigationOptions = {
    title: 'Posts',
    headerStyle: Constants.styles.headerStyle,
  };

  state = {
    posts: [],
    refreshing: false,
  };

  componentDidMount() {
    this._handleRefresh();
  }

  _handleRefresh = async () => {
    this.setState({
      refreshing: true,
    });

    const response = await HTTP.posts();
    const posts = await response.json();

    this.setState({
      posts,
      refreshing: false,
    });
  };

  _handleNavigateToPost = ({ post }) => {
    const { navigation } = this.props;

    navigation.navigate('post', { post });
  };

  render() {
    const { posts, refreshing } = this.state;
    const { navigation } = this.props;

    const refreshControl = (
      <RefreshControl refreshing={refreshing} onRefresh={this._handleRefresh} />
    );

    return (
      <ScrollView style={styles.container} refreshControl={refreshControl}>
        {posts.map((post, index) => {
          return (
            <PostPreviewItem
              key={`post-${index}`}
              post={post}
              isLast={index === posts.length - 1}
              onNavigateToPost={() => this._handleNavigateToPost({ post })}
            />
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.colors.background,
  },
});
