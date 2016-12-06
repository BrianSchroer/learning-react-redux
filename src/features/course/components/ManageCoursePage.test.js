import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';

function mountWith(props) {
    return mount(<ManageCoursePage {...props}/>);
}

// Integration test
describe('ManageCoursePage', () => {
    it('sets error message when trying to save empty title', () => {
        const props = {
            authors: [],
            course: {
                id: '', watchHref: '', title: '', authorId: '', length: '', category: ''
            },
            actions: {
                saveCourse: () => { return Promise.resolve(); }
            }
        };

        const wrapper = mountWith(props);
        const saveButton = wrapper.find('input[type="submit"]').last();
        expect(saveButton.prop('type')).toBe('submit');

        saveButton.simulate('click');

        expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
    });
});
