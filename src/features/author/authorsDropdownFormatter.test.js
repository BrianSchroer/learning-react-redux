import expect from 'expect';
import {authorsFormattedForDropdown} from './authorsDropdownFormatter';

describe('authorsDropdownFormatter', () => {
    describe('authorsFormattedForDropdown', () => {
        it('should return author data formatted for use in a dropdown', () => {
            const authors = [
                {id: 'id1', firstName: 'First1', lastName: 'Last1'},
                {id: 'id2', firstName: 'First2', lastName: 'Last2'}
            ];

            const expected = [
                {value: 'id1', text: 'First1 Last1'},
                {value: 'id2', text: 'First2 Last2'}
            ];

            expect(authorsFormattedForDropdown(authors)).toEqual(expected);
        });
    });
});
