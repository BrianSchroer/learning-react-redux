// course actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import courseApi from './mockCourseApi';
import {beginAjaxCall, ajaxCallError} from '../../app/ajaxStatus/ajaxStatusDuck';
import copyOf from '../../util/copyOf';
import initialState from '../../app/store/initialState';

const prefix = 'pluralsight-redux-starter/course/';
export const LOAD_COURSES_SUCCESS = `${prefix}LOAD_COURSES_SUCCESS`;
export const CREATE_COURSE_SUCCESS = `${prefix}CREATE_COURSE_SUCCESS`;
export const UPDATE_COURSE_SUCCESS = `${prefix}UPDATE_COURSE_SUCCESS`;
export const DELETE_COURSE_SUCCESS = `${prefix}DELETE_COURSE_SUCCESS`;

// Action creators:

export function loadCoursesSuccess(courses) {
    return {type: LOAD_COURSES_SUCCESS, courses}; // (shorthand property name - courses: courses - automatic w/ ES6)
}

export function createCourseSuccess(course) {
    return {type: CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course) {
    return {type: UPDATE_COURSE_SUCCESS, course};
}

export function deleteCourseSuccess(course) {
    return {type: DELETE_COURSE_SUCCESS, course};
}

export function loadCourses() {
    return dispatch => {
        dispatch(beginAjaxCall());

        return courseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function saveCourse(course) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return courseApi.saveCourse(course).then(savedCourse => {
            (course.id)
                ? dispatch(updateCourseSuccess(savedCourse))
                : dispatch(createCourseSuccess(savedCourse));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
    };
}

export function deleteCourse(course) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return courseApi.deleteCourse(course.id).then(() => {
            dispatch(deleteCourseSuccess(course));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
    };
}

// Reducers:

export default function reducer(courses = initialState.courses, action) {
    switch (action.type) {

        case LOAD_COURSES_SUCCESS:
            return action.courses;

        case CREATE_COURSE_SUCCESS:
            return [...courses, copyOf(action.course)];

        case UPDATE_COURSE_SUCCESS:
            return [...otherCourses(courses, action.course), copyOf(action.course) ];

        case DELETE_COURSE_SUCCESS:
            return otherCourses(courses, action.course);

        default:
            return courses;
    }
}

function otherCourses(courses, courseToExclude) {
    return courses.filter(course => course.id !== courseToExclude.id);
}
