import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import copyOf from '../../../util/copyOf';
import toastr from 'toastr';
import * as courseActions from '../courseDuck';
import {authorsFormattedForDropdown} from '../../../features/author/authorsDropdownFormatter';
import CourseForm from './CourseForm';

export class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: copyOf(props.course),
            errors: {},
            isSaving: false,
            isDeleting: false,
            isDirty: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.routerWillLeave = this.routerWillLeave.bind(this);
    }

    componentDidMount() {
        if (this.context.router) {
            /* eslint-disable react/prop-types */
            this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
            /* eslint-enable */
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.course) { // will be undefined after delete
            if (nextProps.course.id != this.props.course.id) {
                // necessary to populate form when existing course is loaded directly
                this.setState({course: copyOf(nextProps.course)});
            }
        } else {
            this.setState({course: emptyCourse()});
        }
    }

    routerWillLeave(nextLocation) {
        if (this.state.isDirty) {
            return 'Are you sure you want to leave this page with unsaved changes?';
        }
    }

    updateCourseState(event) {
        let course = this.state.course;
        course[event.target.name] = event.target.value;
        return this.setState({course: course, isDirty: true});
    }

    courseFormIsValid() {
        const errors = {};

        if (this.state.course.title.length < 5) {
            errors.title = 'Title must be at least 5 characters.';
        }

        this.setState({errors: errors});

        return (Object.keys(errors).length === 0);
    }

    saveCourse(event) {
        event.preventDefault();

        if (!this.courseFormIsValid()) {
            return;
        }

        this.setState({isSaving: true});

        const course = this.state.course;
        const verb = (course.id) ? 'saved' : 'added';

        this.props.actions.saveCourse(course)
            .then(() => this.handleSuccessfulUpdate(verb))
            .catch(error => {
                toastr.error(error);
                this.setState({isSaving: false});
            });
    }

    deleteCourse(event) {
        event.preventDefault();

        const course = this.state.course;

        if (!confirm(`Are you sure you want to delete the "${course.title}" course?`
            + '\n\nThis cannot be undone.')) {
            return;
        }

        this.setState({isDeleting: true});

        this.props.actions.deleteCourse(course)
            .then(() => this.handleSuccessfulUpdate('deleted'))
            .catch(error => {
                toastr.error(error);
                this.setState({isDeleting: false});
            });
    }

    handleSuccessfulUpdate(verb) {
        const course = this.state.course;
        this.setState({isSaving: false, isDeleting: false, isDirty: false});
        toastr.success(`Course "${course.title}" ${verb}`);
        this.context.router.push('/courses');
    }

    render() {
        const state = this.state;

        return (
            <CourseForm
                allAuthors={this.props.authors}
                course={state.course}
                errors={state.errors}
                isSaving={state.isSaving}
                isDeleting={state.isDeleting}
                shouldAllowDelete={!!state.course.id}
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                onDelete={this.deleteCourse}
            />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// Pull in the React Router context so router is available as this.context.router:
ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function emptyCourse() {
    return {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
}


function mapStateToProps(state, ownProps) {
    const courses = state.courses;
    const courseId = ownProps.params.id; // (from the path '/course:id')

    const course = (courseId && courses.length > 0)
        ? courses.find(course => course.id == courseId)
        : emptyCourse();

    return {
        course: course,
        authors: authorsFormattedForDropdown(state.authors)
    };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(courseActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
