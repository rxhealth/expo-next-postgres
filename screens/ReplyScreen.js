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
      commentId: comment.id,
      postId: comment.post.id,
    });

    if (response.status === 200) {
      this.setState({
        content: '',
        contentHeight: undefined,
      });

      this.props.navigation.navigate('post', { id: comment.post.id });
    }
  };

  _handleChangeContent = content => {
    this.setState({ content });
  };

  _handleSaveContentHeight = ({ nativeEvent }) => {
    const { height } = nativeEvent.contentSize;
    this.setState({
      contentHeight: height + 10,
    });
  };

  render() {
    const { content } = this.state;
    console.log(this.props);

    return (
      <ScrollView style={styles.scrollContainer}>
        <TextInput
          underlineColorAndroid="transparent"
          autoCorrect={false}
          ref="content"
          style={[
            styles.contentInput,
            { height: Math.max(40, this.state.contentHeight) },
          ]}
          value={this.state.content}
          placeholder="Start writing..."
          onChangeText={this._handleChangeContent}
          onContentSizeChange={this._handleSaveContentHeight}
          multiline
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: Constants.colors.background,
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    backgroundColor: Constants.colors.background,
    flex: 1,
  },
  text: {
    fontSize: 16,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  bold: {
    fontWeight: '600',
  },
  container: {
    backgroundColor: Constants.colors.background,
    flex: 1,
  },
  actions: {
    marginTop: 16,
    width: '100%',
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
