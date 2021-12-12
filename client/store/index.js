import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import mood from './mood'
import activities from './activities'
import activitiesCategory from './activitiesCategory'
import singleMood from './singleMood'
import singleActivity from './singleActivity'

const reducer = combineReducers({ auth, mood, singleMood, activities, activitiesCategory, singleActivity })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
