import expect from 'expect';
import * as ajaxStatusDuck from '../../app/ajaxStatus/ajaxStatusDuck';
import courseReducer, * as courseActions from './courseDuck';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import mockApiDelay from '../../util/mockApiDelay';

describe('course duck', () => {

    // Sync action tests might not be worth the time it takes to write them...
    describe('Actions: synchronous', () => {
        describe('createCourseSuccess', () => {
            it('should create a CREATE_COURSE_SUCCESS action', () => {
                const course = {id: 'test-id', title: 'test title'};
                const expectedAction = {
                    type: courseActions.CREATE_COURSE_SUCCESS,
                    course: course
                };

                const actualAction = courseActions.createCourseSuccess(course);

                expect(actualAction).toEqual(expectedAction);
            });
        });
    });

    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);

    describe('Actions: async', () => {
        beforeEach(() => {
            mockApiDelay.setMilliseconds(0);
        });

        afterEach(() => {
            nock.cleanAll();
        });

        describe('loadCourses', () => {
            it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS',
                (done) => {

                // Not using nock because we have a mock API, but here's how to set it up:

                // nock('http://example.com/')
                //     .get('/courses')
                //     .reply(200, {
                //         body: {
                //             courses: [{
                //                 id: 1,
                //                 firstName: 'Cory',
                //                 lastName: 'House'}]
                //         }
                //     });

                const expectedActions = [
                    {
                        type: ajaxStatusDuck.BEGIN_AJAX_CALL
                    },
                    {
                        type: courseActions.LOAD_COURSES_SUCCESS,
                        body: { courses: [{ id: 'clean-code', title: 'Clean Code' }]
                    }}
                ];

                const store = mockStore({courses: []}, expectedActions);

                store.dispatch(courseActions.loadCourses()).then(() =>{
                    const actions = store.getActions();
                    expect(actions[0].type).toEqual(ajaxStatusDuck.BEGIN_AJAX_CALL);
                    expect(actions[1].type).toEqual(courseActions.LOAD_COURSES_SUCCESS);
                    done();
                });
            });
        });
    });

    describe('Reducer', () => {
        it('should add course when passed CREATE_COURSE_SUCCESS', () => {
            const initialState = [ {title: 'A'}, {title: 'B'}];
            const newCourse = {title: 'C'};

            const newState = courseReducer(
                initialState,
                courseActions.createCourseSuccess(newCourse));

            expect(newState.length).toEqual(3);
            expect(newState[0].title).toEqual('A');
            expect(newState[1].title).toEqual('B');
            expect(newState[2].title).toEqual('C');
        });

        it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
            const initialState = [
                {id: 'A', title: 'A'},
                {id: 'B', title: 'B'},
                {id: 'C', title: 'C'}
            ];

            const course = {id: 'B', title: 'New Title'};

            const newState = courseReducer(
                initialState,
                courseActions.updateCourseSuccess(course));

            expect(newState.length).toEqual(3);
            expect(newState[0].title).toEqual('A');
            expect(newState[1].title).toEqual('C');
            expect(newState[2].title).toEqual('New Title');
        });

        it('should remove course when passed DELETE_COURSE_SUCCESS', () => {
            const initialState = [
                {id: 'A', title: 'A'},
                {id: 'B', title: 'B'},
                {id: 'C', title: 'C'}
            ];

            const courseToDelete = initialState[1];

            const newState = courseReducer(
                initialState,
                courseActions.deleteCourseSuccess(courseToDelete));

            expect(newState.length).toEqual(2);
            expect(newState[0].title).toEqual('A');
            expect(newState[1].title).toEqual('C');
        });
    });
});
