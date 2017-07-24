import React from 'react';
import { StackNavigator } from 'react-navigation';

import PostScreen from '../screens/PostScreen';
import MainTabNavigator from './MainTabNavigator';

export default StackNavigator(
  {
    main: {
      screen: MainTabNavigator,
    },
    post: {
      screen: PostScreen,
    },
  },
  {}
);
