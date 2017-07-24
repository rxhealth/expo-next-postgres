import React from 'react';
import { TabNavigator, TabBarTop } from 'react-navigation';

import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';

import * as Constants from '../common/constants';

const routeConfig = {
  login: {
    screen: LogInScreen,
  },
  signup: {
    screen: SignUpScreen,
  },
};

const tabNavigatorConfig = {
  tabBarOptions: {
    activeTintColor: Constants.colors.black,
    inactiveTintColor: Constants.colors.black,
    upperCaseLabel: false,
    style: {
      backgroundColor: Constants.colors.background,
    },
    indicatorStyle: {
      backgroundColor: Constants.colors.active,
    },
    labelStyle: {
      fontWeight: '600',
    },
  },
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  animationEnabled: true,
  swipeEnabled: false,
};

export default TabNavigator(routeConfig, tabNavigatorConfig);
