import { combineReducers } from 'redux';
import campusReducer from './campuses';
import studentReducer from './students';

const rootReducer = combineReducers({
  campusReducer,
  studentReducer
})

export default rootReducer
