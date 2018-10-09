export const DATA_AVAILABLE = 'DATA_AVAILABLE'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const DEL_CATEGORY = 'DEL_CATEGORY'
export const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY'
export const SET_ACTIVE_TASK = 'SET_ACTIVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const DEL_TASK = 'DEL_TASK'
export const ADD_SESSION = 'ADD_SESSION'

//Import the sample data
//import Data from '../storeData.json'
import { AsyncStorage } from 'react-native'

export function getData() {
  return dispatch => {
    AsyncStorage.getItem('data', (err, data) => {
      //AsyncStorage.clear()
      if (data === null) {
        AsyncStorage.setItem('data', JSON.stringify({ categories: [] }), () => {
          dispatch({ type: DATA_AVAILABLE, data: { categories: [] } })
        })
      } else {
        dispatch({ type: DATA_AVAILABLE, data: JSON.parse(data) })
      }
    })
  }
}

export function addCategory(state, category) {
  return dispatch => {
    let categories = cloneObject(state.categories) //clone the current state
    categories.unshift(category) //add the new category to the top
    AsyncStorage.setItem('data', JSON.stringify({ categories }), () => {
      dispatch({ type: ADD_CATEGORY, data: { categories } })
    })
  }
}

export function delCategory(state, key) {
  let categories = state.categories.filter(el => {
    if (el.key !== key) return el
  })
  return dispatch => {
    AsyncStorage.setItem('data', JSON.stringify({ categories }), () => {
      dispatch({
        type: DEL_CATEGORY,
        data: { categories },
      })
    })
  }
}

export function setActiveCategory(category) {
  return dispatch => {
    dispatch({
      type: SET_ACTIVE_CATEGORY,
      payload: {
        category,
      },
    })
  }
}

export function setActiveTask(task) {
  return dispatch => {
    dispatch({
      type: SET_ACTIVE_TASK,
      payload: {
        task,
      },
    })
  }
}

export function addTask(category, task) {
  return dispatch => {
    let tasks = cloneObject(category.tasks)
    tasks.unshift(task)
    dispatch({ type: ADD_TASK, payload: { ...category, tasks } })
  }
}

export function delTask(category, key) {
  let tasks = category.tasks.filter(el => {
    if (el.key !== key) return el
  })
  return dispatch => {
    dispatch({
      type: DEL_TASK,
      payload: { ...category, tasks },
    })
  }
}

export function addSession(category, task) {
  return dispatch => {
    let tasks = cloneObject(category.tasks).map(t => {
      if (t.key === task.key) return task
      else return t
    })
    dispatch({ type: ADD_SESSION, payload: { ...category, tasks } })
  }
}

function cloneObject(object) {
  return JSON.parse(JSON.stringify(object))
}
