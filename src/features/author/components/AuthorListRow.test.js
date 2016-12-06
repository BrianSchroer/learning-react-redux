import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import keymirror from 'keymirror';
import AuthorListRow from './AuthorListRow';

function renderWith(props) {
    return shallow(<AuthorListRow {...props}/>);
}

function renderedColumns(props) {
    return renderWith(props).find('td');
}

describe('AuthorListRow', () => {
    const author = keymirror({
        id: null,
        firstName: null,
        lastName: null
    });
    const props = {author: author};

    it('should render 1 row', () => {
        expect(renderWith(props).find('tr').length).toBe(1);
    });

    it('should render 1 column', () => {
        expect(renderedColumns(props).length).toBe(1);
    });

    it('should render author name column', () => {
        const column = renderedColumns(props).first();

        const link = column.find('Link');
        expect(link.length).toBe(1);

        const linkProps = link.props();
        expect(linkProps.to).toBe(`/author/${author.id}`);
        expect(linkProps.children).toBe(`${author.firstName} ${author.lastName}`);
    });
});
