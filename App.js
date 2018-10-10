import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import Expo from 'expo'
import { createStore, applyMiddleware } from 'redux'

import store from './store' //Import the store
import { AppNavigator } from './navigators/AppNavigator'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isReady: false,
    }
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ isReady: true })
  }

  render() {
    if (this.state.isReady) {
      return (
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      )
    } else {
      return null
    }
  }
}
