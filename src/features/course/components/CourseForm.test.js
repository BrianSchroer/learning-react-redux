import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import CourseForm from './CourseForm';

function renderWith(props) {
    return shallow(<CourseForm {...props}/>);
}

describe('CourseForm', () => {
    let props = {};

    beforeEach(function() {
        props = {
            course: {},
            isSaving: false,
            shouldAllowDelete: true,
            errors: {},
            onSave: () => {},
            onChange: () => {},
            onDelete: () => {}
        };
    });

    it('renders form', () => {
        expect(renderWith(props).find('form').length).toBe(1);
    });

    it('renders h1 with expected text', () => {
        expect(renderWith(props).find('h1').text()).toEqual("Manage Course");
    });

    it('captions save button as "Save" when not saving', () => {
        props.isSaving = false;
        expect(renderWith(props).find('input[type="submit"]').last().
            props().value).toBe('Save');
    });

    it('captions save button as "Saving..." when saving', () => {
        props.isSaving = true;
        expect(renderWith(props).find('input[type="submit"]').last().
            props().value).toBe('Saving...');
    });
});
