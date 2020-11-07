import {combineReducers} from 'redux'
import {userIdReducer} from './userIdReducer'
import {friendRequestReducer} from './friendRequestReducer'

export default combineReducers({
    userId: userIdReducer,
    friendRequest:friendRequestReducer
})