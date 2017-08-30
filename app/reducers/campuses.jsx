import axios from 'axios';

const GET_CAMPUSES = 'GET_CAMPUSES';
const WRITE_CAMPUS_NAME = 'WRITE_CAMPUS_NAME';
const WRITE_CAMPUS_IMAGE = 'WRITE_CAMPUS_IMAGE';
const GET_CAMPUS = 'GET_CAMPUS';

const initialState = {
  campuses: [],
  newCampus: {
    name: '',
    image: ''
  }
}

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

export function fetchCampuses () {
  return function thunk (dispatch) {
    return axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => {
      const action = getCampuses(campuses);
      dispatch(action);
    })
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
  }
}

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
      return Object.assign({}, state, {campuses: [...state.campuses, action.campus]})
    default:
      return state;
  }
}
