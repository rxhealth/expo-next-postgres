import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
} from 'react-native';

import FluidButton from '../components/FluidButton';
import HeaderButton from '../components/HeaderButton';
import CommentListItemBody from '../components/CommentListItemBody';
import AutoExpandingTextInput from '../components/AutoExpandingTextInput';

import { withAuth } from '../higher-order/withAuth';

import * as Constants from '../common/constants';
import * as Strings from '../common/strings';
import * as HTTP from '../common/http';

class ReplyScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: 'Reply',
      headerStyle: Constants.styles.headerStyle,
      headerRight: params.handleSave
        ? <HeaderButton
            onPress={() => {
              params.handleSave();
            }}>
            ✏️ Reply
          </HeaderButton>
        : undefined,
    };
  };

  state = {
    content: '',
  };

  componentDidMount() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      this.props.navigation.setParams({
        handleSave: this._handleSubmit,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated } = this.props;

    if (nextProps.isAuthenticated === isAuthenticated) {
      return;
    }

    const handleSave = nextProps.isAuthenticated
      ? this._handleSubmit
      : undefined;
    this.props.navigation.setParams({ handleSave });
  }

  _handleSubmit = async () => {
    const { comment } = this.props.navigation.state.params;
    this.refs.content.blur();

    const response = await HTTP.saveReply({
      content: this.state.content,
      commentId: comment.commentId ? comment.commentId : comment.id,
      postId: comment.postId,
    });

    if (response.status === 200) {
      this.setState({
        content: '',
      });

      this.props.navigation.navigate('post', { id: comment.postId });
    }
  };

  _handleChangeContent = content => {
    this.setState({ content });
  };

  render() {
    const { comment } = this.props.navigation.state.params;
    const { content } = this.state;

    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.top}>
          <View style={styles.previousComment}>
            <Text style={styles.previousCommentTitle}>In response to:</Text>
            <CommentListItemBody
              content={comment.content}
              createdAt={comment.createdAt}
              username={comment.user.username}
            />
          </View>
        </View>
        <AutoExpandingTextInput
          underlineColorAndroid="transparent"
          autoCorrect={false}
          ref="content"
          style={styles.contentInput}
          value={this.state.content}
          placeholder="Start writing..."
          onChangeText={this._handleChangeContent}
          multiline
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: Constants.colors.background,
    flex: 1,
  },
  top: {
    padding: 16,
  },
  previousComment: {
    borderColor: Constants.colors.border,
    borderWidth: 1,
    padding: 16,
    borderRadius: 4,
  },
  previousCommentTitle: {
    marginBottom: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  contentInput: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: Constants.sizes.screenPageClearance,
    fontSize: 16,
    width: '100%',
  },
});

export default withAuth({})(ReplyScreen);
