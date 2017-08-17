import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  RefreshControl,
} from 'react-native';

import CommentListItem from '../components/CommentListItem';
import HeaderButton from '../components/HeaderButton';
import FluidButton from '../components/FluidButton';

import { withAuth } from '../higher-order/withAuth';

import * as Constants from '../common/constants';
import * as Strings from '../common/strings';
import * as HTTP from '../common/http';

class PostScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: 'Post',
      headerStyle: Constants.styles.headerStyle,
      headerRight: params.handleDelete
        ? <HeaderButton
            onPress={() => {
              params.handleDelete();
            }}>
            ✂️ Delete
          </HeaderButton>
        : undefined,
    };
  };

  state = {
    post: this.props.navigation.state.params.post,
    comment: '',
    refreshing: false,
  };

  componentDidMount() {
    if (!this.state.post) {
      this._handleGetData();
      return;
    }

    const { isAuthenticated } = this.props;
    if (
      isAuthenticated &&
      this.props.viewer &&
      this.state.post.user.id === this.props.viewer.id
    ) {
      this.props.navigation.setParams({
        handleDelete: () => this._handleDeletePost(this.state.post.id),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated } = this.props;

    if (nextProps.isAuthenticated === isAuthenticated) {
      return;
    }

    const isYou =
      nextProps.isAuthenticated &&
      nextProps.viewer &&
      this.state.post.user.id === nextProps.viewer.id;
    const handleDelete = nextProps.isAuthenticated && isYou
      ? () => this._handleDeletePost(this.state.post.id)
      : undefined;
    this.props.navigation.setParams({ handleDelete });
  }

  _handleDeletePost = async postId => {
    Alert.alert(
      'Are you sure?',
      'By selecting OK you are deleting this post forever.',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'OK',
          onPress: async () => {
            await HTTP.postDelete({ postId });
            this.props.navigation.navigate('posts');
          },
        },
      ]
    );
  };

  _handleGetData = async () => {
    this.setState({
      refreshing: true,
    });

    let id = this.state.post
      ? this.state.post.id
      : this.props.navigation.state.params.id;

    const response = await HTTP.postById({ id });
    const post = await response.json();

    this.setState({
      post,
      refreshing: false,
    });
  };

  _handleChangeComment = comment => {
    this.setState({ comment });
  };

  _handleSubmit = async () => {
    await HTTP.commentPublish({
      postId: this.state.post.id,
      content: this.state.comment,
    });

    await this._handleGetData();

    this.setState({ comment: '' });
  };

  _handleNavigateSignIn = () => {
    this.props.navigation.navigate('settings');
  };

  render() {
    const { post, refreshing } = this.state;
    const { isAuthenticated } = this.props;

    if (!post) {
      return <ScrollView style={styles.container} />;
    }

    const isYou = isAuthenticated && post.user.id === this.props.viewer.id;
    const refreshControl = (
      <RefreshControl refreshing={refreshing} onRefresh={this._handleGetData} />
    );

    return (
      <ScrollView style={styles.container} refreshControl={refreshControl}>
        <View style={styles.postContent}>
          <Text style={styles.title}>
            {Strings.isEmpty(post.title) ? 'Untitled' : post.title}
          </Text>
          <Text style={styles.meta}>
            by
            {' '}
            <Text style={styles.bold}>{post.user.username}</Text>
            {' '}
            written on
            {' '}
            <Text style={styles.bold}>{Strings.toDate(post.createdAt)}</Text>
          </Text>
          <Text style={styles.content}>
            {post.content}
          </Text>
        </View>

        <View style={styles.divider} />
        {post.comments.length
          ? <View>
              {post.comments
                ? post.comments
                    .filter(c => {
                      return !c.commentId;
                    })
                    .map(c => {
                      const isYours =
                        isAuthenticated && c.User.id === this.props.viewer.id;

                      return (
                        <CommentListItem
                          key={c.id}
                          isYours={isYours}
                          comment={c}
                          navigation={this.props.navigation}
                          onRefresh={this._handleGetData}
                          isOnPost
                        />
                      );
                    })
                : undefined}
            </View>
          : undefined}

        {isAuthenticated
          ? <View style={styles.responseContainer}>
              <TextInput
                autoCorrect={false}
                underlineColorAndroid="transparent"
                multiline
                style={styles.commentInput}
                placeholder="Say something..."
                value={this.state.comment}
                onChangeText={this._handleChangeComment}
                onSubmitEditing={this._handleSubmit}
              />
              <FluidButton onPress={this._handleSubmit} text="Send" />
            </View>
          : <View style={styles.responseContainer}>
              <Text style={styles.responseContainerText}>
                To respond to this post, log in or create an account
              </Text>
              <FluidButton
                onPress={this._handleNavigateSignIn}
                text="Log in or create account"
              />
            </View>}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.colors.background,
  },
  postContent: {
    padding: 16,
  },
  actions: {
    marginTop: 24,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  actionsItem: {
    marginRight: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
  },
  meta: {
    fontSize: 12,
    marginTop: 16,
    marginBottom: 16,
  },
  bold: {
    fontWeight: '600',
  },
  content: {
    fontSize: 18,
  },
  divider: {
    backgroundColor: Constants.colors.border,
    height: 1,
    width: '100%',
  },
  responseContainer: {
    marginBottom: Constants.sizes.screenPageClearance,
    padding: 16,
  },
  responseContainerText: {
    marginBottom: 16,
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
    marginBottom: 64,
  },
});

export default withAuth({})(PostScreen);
