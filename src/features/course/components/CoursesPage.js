import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as courseActions from '../courseDuck';
import CourseList from './CourseList';

export class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    }

    redirectToAddCoursePage() {
        browserHistory.push('/course');
    }

    render() {
        const {courses} = this.props;

        return (
            <div>
                <h1>Courses</h1>
                <input type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage}/>
                <CourseList courses={courses} />
           </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        courses: _.sortBy(state.courses, course => course.title) // (from root reducer)
    };
}

function mapDispatchToProps(dispatch) {
//    return {
//        createCourse: course => dispatch(courseActions.createCourse(course))
//    };

    // alternative to hard-coding wrapped actions above:
    return {actions: bindActionCreators(courseActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
