import React from 'react';
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import PostsScreen from '../screens/PostsScreen';
import CommentsScreen from '../screens/CommentsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WriteScreen from '../screens/WriteScreen';

import * as Constants from '../common/constants';

const routeConfig = {
  posts: {
    screen: PostsScreen,
  },
  comments: {
    screen: CommentsScreen,
  },
  settings: {
    screen: SettingsScreen,
  },
  write: {
    screen: WriteScreen,
  },
};

const tabNavigatorConfig = {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let iconName = Platform.OS === 'ios'
        ? `ios-happy${focused ? '' : '-outline'}`
        : 'md-happy';

      if (routeName === 'posts') {
        iconName = Platform.OS === 'ios'
          ? `ios-paper${focused ? '' : '-outline'}`
          : 'md-paper';
      }

      if (routeName === 'comments') {
        iconName = Platform.OS === 'ios'
          ? `ios-chatboxes${focused ? '' : '-outline'}`
          : 'md-chatboxes';
      }

      if (routeName === 'settings') {
        iconName = Platform.OS === 'ios'
          ? `ios-globe${focused ? '' : '-outline'}`
          : 'md-globe';
      }

      if (routeName === 'write') {
        iconName = Platform.OS === 'ios'
          ? `ios-brush${focused ? '' : '-outline'}`
          : 'md-brush';
      }

      return (
        <Ionicons
          name={iconName}
          size={28}
          style={{ marginBottom: -6, fontWeight: '600' }}
          color={focused ? Constants.colors.active : Constants.colors.black}
        />
      );
    },
  }),
  tabBarOptions: {
    style: {
      backgroundColor: Constants.colors.background,
      height: 64,
    },
    labelStyle: {
      fontSize: 12,
      marginBottom: 6,
      fontWeight: '600',
    },
    activeTintColor: Constants.colors.black,
    inactiveTintColor: Constants.colors.black,
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  lazy: true,
};

export default TabNavigator(routeConfig, tabNavigatorConfig);
