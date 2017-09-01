import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store from '../store';
import { fetchCampuses } from '../reducers/campuses';
import { fetchStudents } from '../reducers/students';
import CampusList from './CampusList';
import StudentList from './StudentList';
import SingleStudent from './SingleStudent';
import NewCampusEntry from './NewCampusEntry';
import NewStudentEntry from './NewStudentEntry';
import SingleCampus from './SingleCampus';
import UpdateStudentEntry from './UpdateStudentEntry';
import Navbar from './Navbar';
import Landing from './Landing';

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
            <Route exact path="/" component={ Landing } />
            <Route exact path="/campuses" component={ CampusList } />
            <Route exact path="/students" component={ StudentList } />
            <Route exact path="/campuses/:id" component={ SingleCampus } />
            <Route exact path="/students/:id" component={ SingleStudent } />
            <Route exact path="/new-campus" component={ NewCampusEntry } />
            <Route exact path="/new-student" component={ NewStudentEntry } />
            <Route exact path="/campuses/:id/new-student" component={ NewStudentEntry } />
            <Route exact path="/students/:id/update" component={ UpdateStudentEntry } />
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    )
  }
}
