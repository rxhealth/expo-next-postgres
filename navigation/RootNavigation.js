import React from 'react';
import { StackNavigator } from 'react-navigation';

import PostScreen from '../screens/PostScreen';
import MainTabNavigator from './MainTabNavigator';
import ReplyScreen from '../screens/ReplyScreen';

export default StackNavigator({
  main: {
    screen: MainTabNavigator,
  },
  post: {
    screen: PostScreen,
  },
  reply: {
    screen: ReplyScreen,
  },
});
