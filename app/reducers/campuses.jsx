import axios from 'axios';
import { removeStudents } from './students';

//constants
const GET_CAMPUSES = 'GET_CAMPUSES';
const WRITE_CAMPUS_NAME = 'WRITE_CAMPUS_NAME';
const WRITE_CAMPUS_IMAGE = 'WRITE_CAMPUS_IMAGE';
const GET_CAMPUS = 'GET_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const SEARCH_CAMPUS = 'SEARCH_CAMPUS';
const VALIDATE_FORM = 'VALIDATE_FORM';

//initial state
const initialState = {
  invalidForm: false,
  campuses: [],
  matchCampuses: [],
  newCampus: {
    name: '',
    image: ''
  }
}

//action creators
export function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses };
  return action;
}

export function writeCampusName (campusName) {
  const action = { type: WRITE_CAMPUS_NAME, campusName };
  return action;
}

export function writeCampusImage (campusImage) {
  const action = { type: WRITE_CAMPUS_IMAGE, campusImage };
  return action;
}

export function getCampus (campus) {
  const action = { type: GET_CAMPUS, campus };
  return action;
}

export function removeCampus (campusId) {
  const action = { type: REMOVE_CAMPUS, campusId };
  return action;
}

export function searchCampus (campusName) {
  const action = { type: SEARCH_CAMPUS, campusName };
  return action;
}

export function validateForm (bool) {
  const action = { type: VALIDATE_FORM, bool };
  return action;
}

//thunk creators
export function fetchCampuses () {
  return function thunk (dispatch) {
    return axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => {
      const action = getCampuses(campuses);
      dispatch(action);
    })
    .catch(console.error)
  }
}

export function postCampus (campus, history) {
  return function thunk (dispatch) {
    return axios.post('/api/campuses', campus)
    .then(res => res.data)
    .then(newCampus => {
      dispatch(getCampus(newCampus));
      history.push(`/campuses/${newCampus.id}`);
    })
    .catch(console.error)
  }
}

export function deleteCampus (campusId) {
  return function thunk (dispatch) {
    return axios.delete(`/api/campuses/${campusId}`)
    .then(() => {
      dispatch(removeCampus(campusId));
      dispatch(removeStudents(campusId));
    })
    .catch(console.error)
  }
}

//campus reducer
export default function campusReducer (state = initialState, action) {
  switch (action.type) {
    case GET_CAMPUSES:
      return Object.assign({}, state, {campuses: action.campuses});
    case WRITE_CAMPUS_NAME:
      return Object.assign({}, state, {newCampus: {
        name: action.campusName,
        image: state.newCampus.image
      }});
    case WRITE_CAMPUS_IMAGE:
      return Object.assign({}, state, {newCampus: {
        name: state.newCampus.name,
        image: action.campusImage
      }});
    case GET_CAMPUS:
      return Object.assign({}, state, {campuses: [...state.campuses, action.campus], matchCampuses: []})
    case REMOVE_CAMPUS:
      return Object.assign({}, state, {campuses: state.campuses.filter(campus => +campus.id !== +action.campusId)})
    case SEARCH_CAMPUS:
      return Object.assign({}, state, {matchCampuses: state.campuses.filter(campus => campus.name.toLowerCase().match(action.campusName.toLowerCase()) && action.campusName.length > 0
      )})
    case VALIDATE_FORM:
      return Object.assign({}, state, {invalidForm: action.bool});
    default:
      return state;
  }
}
