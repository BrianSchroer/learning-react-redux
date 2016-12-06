import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* eslint-disable import/no-named-as-default */
import App from './components/App';
import HomePage from '../features/home/components/HomePage';
import CoursesPage from '../features/course/components/CoursesPage';
import ManageCoursePage from '../features/course/components/ManageCoursePage';
import AuthorsPage from '../features/author/components/AuthorsPage';
import ManageAuthorPage from '../features/author/components/ManageAuthorPage';
import AboutPage from '../features/about/components/AboutPage';
/* eslint-enable */

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="about" component={AboutPage} />
        <Route path="courses" component={CoursesPage} />
        <Route path="course" component={ManageCoursePage} />
        <Route path="course/:id" component={ManageCoursePage} />
        <Route path="authors" component={AuthorsPage} />
        <Route path="author" component={ManageAuthorPage} />
        <Route path="author/:id" component={ManageAuthorPage} />
    </Route>
);
