import React from 'react';
import { Provider } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import RootNavigation from './navigation/RootNavigation';

import { initStore } from './common/store';

const store = initStore({});

export default class App extends React.Component {
  state = {
    hasLoadedAssets: false,
  };

  async _loadAssetsAsync() {
    try {
      await Promise.all([Asset.loadAsync([]), Font.loadAsync([Ionicons.font])]);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ hasLoadedAssets: true });
    }
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  render() {
    if (!this.state.hasLoadedAssets) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' &&
            <View style={styles.statusBarUnderlay} />}
          <RootNavigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
