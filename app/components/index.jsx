import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store from '../store';
import { fetchCampuses } from '../reducers/campuses';
import { fetchStudents } from '../reducers/students';
import CampusList from './CampusList';
import StudentList from './StudentList';
import Navbar from './Navbar';

export default class Main extends Component {

  componentDidMount () {
    const campusThunk = fetchCampuses();
    const studentThunk = fetchStudents();
    store.dispatch(campusThunk);
    store.dispatch(studentThunk);
  }

  render() {
    return (
      <div>
        <Navbar />
        <main>
          <Switch>
            <Route path="/campuses" component={ CampusList } />
            <Route path="/students" component={ StudentList } />
            <Redirect to="/campuses" />
          </Switch>
        </main>

      </div>
    )
  }
}
