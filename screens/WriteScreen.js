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

class WriteScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: 'Write',
      headerStyle: Constants.styles.headerStyle,
      headerRight: params.handleSave
        ? <HeaderButton
            onPress={() => {
              params.handleSave();
            }}>
            ✏️ Publish
          </HeaderButton>
        : undefined,
    };
  };

  state = {
    title: '',
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
    this.refs.title.blur();
    this.refs.content.blur();

    const response = await HTTP.savePost({
      content: this.state.content,
      title: this.state.title,
    });
    const post = await response.json();

    if (response.status === 200) {
      this.setState({
        title: '',
        content: '',
      });

      this.props.navigation.navigate('posts');
    }
  };

  _handleNavigateLogin = () => {
    this.props.navigation.navigate('settings');
  };

  _handleChangeTitle = title => {
    this.setState({ title });
  };

  _handleChangeContent = content => {
    this.setState({ content });
  };

  render() {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.text}>
            You must be logged in to write a post on
            {' '}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>
              {Constants.routes.base}
            </Text>
          </Text>
          <View style={styles.actions}>
            <FluidButton text="Log in" onPress={this._handleNavigateLogin} />
          </View>
        </View>
      );
    }

    const { content, post } = this.state;

    return (
      <ScrollView style={styles.scrollContainer}>
        <TextInput
          underlineColorAndroid="transparent"
          autoCorrect={false}
          ref="title"
          style={styles.titleInput}
          value={this.state.title}
          placeholder="Title"
          onChangeText={this._handleChangeTitle}
          multiline
        />
        <TextInput
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
  titleInput: {
    fontSize: 24,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 24,
    marginBottom: 8,
    fontWeight: '700',
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

export default withAuth({})(WriteScreen);
