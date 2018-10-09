import { combineReducers } from 'redux'
import { NavigationActions } from 'react-navigation'
import { RootNavigator } from '../navigators/AppNavigator'
import { AsyncStorage } from 'react-native'

import { DATA_AVAILABLE, ADD_CATEGORY, DEL_CATEGORY, ADD_TASK, DEL_TASK, SET_ACTIVE_CATEGORY } from '../actions/'

let dataState = { data: [], loading: true }

const dataReducer = (state = dataState, action) => {
  switch (action.type) {
    case DATA_AVAILABLE:
    case ADD_CATEGORY:
    case DEL_CATEGORY:
      state = Object.assign({}, state, { data: action.data, loading: false })
      return state
    case SET_ACTIVE_CATEGORY:
      state = Object.assign({}, state, { active_category: action.payload, loading: false })
      return state
    case ADD_TASK:
    case DEL_TASK:
      const categories = state.data.categories.map(cat => {
        if (cat.key === action.payload.key) return action.payload
        else return cat
      })
      active_category = action.payload
      state = Object.assign({}, state, {
        active_category: { category: active_category },
        data: { categories },
        loading: false,
      })
      AsyncStorage.setItem('data', JSON.stringify({ categories }))
      return state
    default:
      return state
  }
}

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = RootNavigator.router.getActionForPathAndParams('Home')
const initialNavState = RootNavigator.router.getStateForAction(firstAction)

function nav(state = initialNavState, action) {
  let nextState
  switch (action.type) {
    default:
      nextState = RootNavigator.router.getStateForAction(action, state)
      break
  }

  return nextState || state
}

// Combine all the reducers
const AppReducer = combineReducers({
  nav,
  dataReducer,
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default AppReducer
