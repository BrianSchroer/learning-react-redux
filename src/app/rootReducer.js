import {combineReducers} from 'redux';
import ajaxCallsInProgressCount from '../app/ajaxStatus/ajaxStatusDuck';
import authors from '../features/author/authorDuck';
import courses from '../features/course/courseDuck';

const rootReducer = combineReducers({
    ajaxCallsInProgressCount,
    authors,
    courses // (shorthand property name - courses: courses - automatic w/ ES6)
});

export default rootReducer;
