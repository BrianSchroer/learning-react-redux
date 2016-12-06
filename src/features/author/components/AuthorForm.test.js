import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import AuthorForm from './AuthorForm';
import enzymeHelper from '../../../util/enzymeHelper';

function renderWith(props) {
    return shallow(<AuthorForm {...props}/>);
}

describe('AuthorForm', () => {
    let props = {};
    let onChangeWasCalled = false;
    let onDeleteWasCalled = false;
    let onSaveWasCalled = false;

    beforeEach(function() {
        onChangeWasCalled = false;
        onDeleteWasCalled = false;
        onSaveWasCalled = false;

        props = {
            author: {
                firstName: 'TestFirstName',
                lastName: 'TestLastName'
            },
            isSaving: false,
            isDeleting: false,
            shouldAllowDelete: true,
            errors: {},
            onSave: () => { onSaveWasCalled = true; },
            onChange: () => { onChangeWasCalled = true; },
            onDelete: () => { onDeleteWasCalled = true; }
        };
    });

    it('should render form', () => {
        expect(renderWith(props).find('form').length).toBe(1);
    });

    it('should render a firstName TextInput', () => {
        props.errors.firstName = 'firstName error';
        const input = enzymeHelper.findSingle(
            renderWith(props), 'form > TextInput[name="firstName"]');

        const inputProps = input.props();
        expect(inputProps.label).toBe('First Name');
        expect(inputProps.value).toBe(props.author.firstName);
        expect(inputProps.error).toBe('firstName error');
    });

    it('should render a lastName TextInput', () => {
        props.errors.lastName = 'lastName error';
        const input = enzymeHelper.findSingle(
            renderWith(props), 'form > TextInput[name="lastName"]');

        const inputProps = input.props();
        expect(inputProps.label).toBe('Last Name');
        expect(inputProps.value).toBe(props.author.lastName);
        expect(inputProps.error).toBe('lastName error');
    });

    ['firstName', 'lastName'].forEach(prop => {
        onChangeWasCalled = false;

        it(`should call onChange when ${prop} changes`, () => {
            const input = enzymeHelper.findSingle(
                renderWith(props), `form > TextInput[name="${prop}"]`);
            input.simulate('change');
            expect(onChangeWasCalled).toBe(true);
        });
    });

    it('should render "Save" button', () => {
        const button = enzymeHelper.findSingle(renderWith(props), 'input[type="submit"]');
        const buttonProps = button.props();
        expect(buttonProps.value).toBe('Save');
        expect(buttonProps.disabled).toBe(false);
        expect(buttonProps.className).toBe('btn btn-primary');
    });

    it('should call onSave when "Save" button is clicked', () => {
        const button = enzymeHelper.findSingle(renderWith(props), 'input[type="submit"]');
        button.simulate('click');
        expect(onSaveWasCalled).toBe(true);
    });

    it('should render "Delete" button when shouldAllowDelete is true', () => {
        props.shouldAllowDelete = true;
        const button = enzymeHelper.findSingle(renderWith(props), 'input[type="button"]');
        const buttonProps = button.props();
        expect(buttonProps.value).toBe('Delete');
        expect(buttonProps.disabled).toBe(false);
        expect(buttonProps.className).toBe('btn btn-danger');
    });

    it('should not render Delete button when shouldAllowDelete is false', () => {
        props.shouldAllowDelete = false;

        expect(renderWith(props).find('input[type="button"]').length).toBe(0);
    });

    it('should call onDelete when "Delete" button is clicked', () => {
        const button = enzymeHelper.findSingle(renderWith(props), 'input[type="button"]');
        button.simulate('click');
        expect(onDeleteWasCalled).toBe(true);
    });


    it('should adjust buttons when saving', () => {
        props.isSaving = true;

        const wrapper = renderWith(props);

        const saveButton = enzymeHelper.findSingle(wrapper, 'input[type="submit"]');
        saveButton.simulate('click');

        const saveButtonProps = saveButton.props();
        const deleteButtonProps = enzymeHelper.findSingle(wrapper, 'input[type="button"]').props();

        expect(saveButtonProps.value).toBe('Saving...');
        expect(saveButtonProps.disabled).toBe(true);
        expect(deleteButtonProps.value).toBe('Delete');
        expect(deleteButtonProps.disabled).toBe(true);
    });

    it('should adjust buttons when deleting', () => {
        props.isDeleting = true;

        const wrapper = renderWith(props);

        const deleteButton = enzymeHelper.findSingle(wrapper, 'input[type="button"]');
        deleteButton.simulate('click');

        const deleteButtonProps = deleteButton.props();
        const saveButtonProps = enzymeHelper.findSingle(wrapper, 'input[type="submit"]').props();

        expect(saveButtonProps.value).toBe('Save');
        expect(saveButtonProps.disabled).toBe(true);
        expect(deleteButtonProps.value).toBe('Deleting...');
        expect(deleteButtonProps.disabled).toBe(true);
    });
});
