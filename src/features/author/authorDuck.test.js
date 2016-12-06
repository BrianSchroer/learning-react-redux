import expect from 'expect';
import * as ajaxStatusDuck from '../../app/ajaxStatus/ajaxStatusDuck';
import authorReducer, * as authorActions from './authorDuck';

describe('author duck', () => {
    describe('Reducer', () => {
        it('should add author when passed CREATE_AUTHOR_SUCCESS', () => {
            const initialState = [
                { firstName: 'FirstA', lastName: 'LastA' },
                { firstName: 'FirstB', lastName: 'LastB' }
            ];
            const newAuthor = {firstName: 'FirstC', lastName: 'LastC'};

            const newState = authorReducer(
                initialState,
                authorActions.createAuthorSuccess(newAuthor));

            expect(newState.length).toEqual(3);
            expect(newState[0].firstName).toEqual('FirstA');
            expect(newState[1].firstName).toEqual('FirstB');
            expect(newState[2].firstName).toEqual('FirstC');
        });
    });
});
