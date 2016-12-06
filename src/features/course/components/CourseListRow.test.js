import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import keymirror from 'keymirror';
import CourseListRow from './CourseListRow';

function renderWith(props) {
    return shallow(<CourseListRow {...props}/>);
}

function renderedColumns(props) {
    return renderWith(props).find('td');
}

describe('CourseListRow', () => {
    const course = keymirror({
        watchHref: null,
        id: null,
        title: null,
        authorId: null,
        category: null,
        length: null
    });
    const props = {course: course};

    it('should render 1 row', () => {
        expect(renderWith(props).find('tr').length).toBe(1);
    });

    it('should render 5 columns', () => {
        expect(renderedColumns(props).length).toBe(5);
    });

    it('should render "Watch" link column', () => {
        const column = renderedColumns(props).at(0);
        const a = column.find('a');
        expect(a.length).toBe(1);
        expect(a.text()).toBe('Watch');
        expect(a.props().href).toBe(course.watchHref);
        expect(a.props().target).toBe('_blank');
    });

    it('should render course link column', () => {
        const column = renderedColumns(props).at(1);
        const link = column.find('Link');
        expect(link.length).toBe(1);

        const linkProps = link.props();
        expect(link.props().to).toBe(`/course/${course.id}`);
        expect(link.props().children).toBe(course.title);
    });

    const scenarios = [
        {index: 2, expected: course.authorId},
        {index: 3, expected: course.category},
        {index: 4, expected: course.length}
    ];

    scenarios.forEach(scenario => {
        const column = renderedColumns(props).at(scenario.index);
        it(`should render "${scenario.expected}" column`, () => {
            expect(column.text()).toBe(scenario.expected);
        });
    });
});
