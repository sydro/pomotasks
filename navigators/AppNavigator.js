import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

import HomeScreen from '../components/Home'
import CategoryScreen from '../components/Category'
import TaskScreen from '../components/Task'

const middleware = createReactNavigationReduxMiddleware('root', state => state.nav)

const RootNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Category: { screen: CategoryScreen },
  Task: { screen: TaskScreen },
})

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root')

const mapStateToProps = state => ({
  state: state.nav,
})

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState)

export { RootNavigator, AppNavigator, middleware }
