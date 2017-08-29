import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store from '../store';
import { fetchCampuses } from '../reducers/campuses';
import { fetchStudents } from '../reducers/students';
import CampusList from './CampusList';
import StudentList from './StudentList';
import AllStudentList from './AllStudentsList';
import SingleStudent from './SingleStudent';
import NewCampusEntry from './NewCampusEntry';
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
            <Route exact path="/campuses" component={ CampusList } />
            <Route exact path="/students" component={ AllStudentList } />
            <Route exact path="/campuses/:id" component={ StudentList } />
            <Route exact path="/students/:id" component={ SingleStudent } />
            <Route exact path="/new-campus" component={ NewCampusEntry } />
            <Redirect to="/campuses" />
          </Switch>
        </main>

      </div>
    )
  }
}
