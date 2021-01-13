import { combineReducers } from 'redux'

import userReducer from './pages/Login/reducer'

const rootReducer = combineReducers({
  user: userReducer
})

export default rootReducer
