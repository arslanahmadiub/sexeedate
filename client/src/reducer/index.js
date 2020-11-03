import {combineReducers} from 'redux'
import {userIdReducer} from './userIdReducer'

export default combineReducers({
    userId: userIdReducer,
})