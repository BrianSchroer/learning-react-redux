// author actions/reducer "ducks" file (https://github.com/erikras/ducks-modular-redux)

import initialState from '../../app/store/initialState';
import copyOf from '../../util/copyOf';
import authorApi from './mockAuthorApi';
import {beginAjaxCall, ajaxCallError} from '../../app/ajaxStatus/ajaxStatusDuck';

const prefix = 'pluralsight-redux-starter/author/';
export const LOAD_AUTHORS_SUCCESS = `${prefix}LOAD_AUTHORS_SUCCESS`;
export const CREATE_AUTHOR_SUCCESS = `${prefix}CREATE_AUTHOR_SUCCESS`;
export const UPDATE_AUTHOR_SUCCESS = `${prefix}UPDATE_AUTHOR_SUCCESS`;
export const DELETE_AUTHOR_SUCCESS = `${prefix}DELETE_AUTHOR_SUCCESS`;

// Action creators:

export function loadAuthorsSuccess(authors) {
    return {type: LOAD_AUTHORS_SUCCESS, authors};
}

export function createAuthorSuccess(author) {
    return {type: CREATE_AUTHOR_SUCCESS, author};
}

export function updateAuthorSuccess(author) {
    return {type: UPDATE_AUTHOR_SUCCESS, author};
}

export function deleteAuthorSuccess(author) {
    return {type: DELETE_AUTHOR_SUCCESS, author};
}

export function loadAuthors() {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authorApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function saveAuthor(author) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authorApi.saveAuthor(author).then(savedAuthor => {
            (author.id)
                ? dispatch(updateAuthorSuccess(savedAuthor))
                : dispatch(createAuthorSuccess(savedAuthor));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
    };
}

export function deleteAuthor(author) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authorApi.deleteAuthor(author.id).then(() => {
            dispatch(deleteAuthorSuccess(author));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
    };
}

// Reducers:

export default function authorReducer(authors = initialState.authors, action) {

    switch (action.type) {

        case LOAD_AUTHORS_SUCCESS:
            return action.authors;

        case CREATE_AUTHOR_SUCCESS:
            return [...authors, copyOf(action.author)];

        case UPDATE_AUTHOR_SUCCESS:
            return [...otherAuthors(authors, action.author), copyOf(action.author) ];

        case DELETE_AUTHOR_SUCCESS:
            return otherAuthors(authors, action.author);

        default:
            return authors;
    }
}

function otherAuthors(authors, authorToExclude) {
    return authors.filter(author => author.id !== authorToExclude.id);
}
