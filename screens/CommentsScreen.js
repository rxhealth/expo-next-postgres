import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  RefreshControl,
} from 'react-native';

import CommentListItem from '../components/CommentListItem';

import { withAuth } from '../higher-order/withAuth';

import * as Constants from '../common/constants';
import * as Strings from '../common/strings';
import * as HTTP from '../common/http';

class CommentsScreen extends React.Component {
  static navigationOptions = {
    title: 'Comments',
    headerStyle: Constants.styles.headerStyle,
  };

  state = {
    comments: [],
    refreshing: false,
  };

  componentDidMount() {
    this._handleGetData();
  }

  _handleGetData = async () => {
    this.setState({
      refreshing: true,
    });

    const response = await HTTP.getAllComments();
    const comments = await response.json();

    this.setState({
      comments,
      refreshing: false,
    });
  };

  render() {
    const { comments, refreshing } = this.state;
    const { isAuthenticated, viewer } = this.props;

    const refreshControl = (
      <RefreshControl refreshing={refreshing} onRefresh={this._handleGetData} />
    );

    return (
      <ScrollView style={styles.container} refreshControl={refreshControl}>
        {comments.map((c, index) => {
          const isYours = isAuthenticated && c.user.id === viewer.id;
          const isLast = index === comments.length - 1;

          return (
            <CommentListItem
              key={c.id}
              isLast={isLast}
              isYours={isYours}
              navigation={this.props.navigation}
              onRefresh={this._handleGetData}
              comment={c}
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

export default withAuth({})(CommentsScreen);
