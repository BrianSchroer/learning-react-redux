import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import Header from './Header';

function shallowRender(props) {
    return shallow(<Header {...props}/>);
}

describe('Header', () => {
    let props = {};

    beforeEach(function() {
        props = {isLoading: false, courseCount: 0};
    });

    it('should display LoadingDots when loading', () => {
        props.isLoading = true;
        expect(shallowRender(props).find('LoadingDots').length).toBe(1);
    });

    it('should not display LoadingDots when not loading', () => {
        props.isLoading = false;
        expect(shallowRender(props).find('LoadingDots').length).toBe(0);
    });

    it('should display course count', () => {

        const selector = 'span[id="courseCount"]';

        [0, 1, 2, 5, 10].forEach(count => {
            props.courseCount = count;

            let span = shallowRender(props).find(selector);

            expect(span.length).toBe(1, `${selector} not found`);
            expect(span.text()).toBe(`Course count: ${count}`);
        });
    });
});
