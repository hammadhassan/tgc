import { combineReducers, applyMiddleware, compose, createStore } from 'redux'
// import authReducer from './reducers/authReducer'
import mapReducer  from './reducers/mapReducer'
import navReducer  from './reducers/navReducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    // authReducer: authReducer,
    mapReducer: mapReducer,
    nav: navReducer
})

const middleware = compose(
    applyMiddleware(thunk)
);

export let store = createStore(
    rootReducer,
    middleware
);