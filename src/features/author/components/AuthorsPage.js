import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import _ from 'lodash';
import * as authorActions from '../authorDuck';
import AuthorList from './AuthorList';

class AuthorsPage
 extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    }

    redirectToAddAuthorPage() {
        browserHistory.push('/author');
    }

    render() {
        const {authors} = this.props;
        return (
            <div>
                <h1>Authors</h1>
                <input type="submit"
                    value="Add Author"
                    className="btn btn-primary"
                    onClick={this.redirectToAddAuthorPage} />
                <AuthorList authors={authors} />
            </div>
        );
    }
}

AuthorsPage.propTypes = {
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        authors: _.sortBy(state.authors, author => `${author.lastName} ${author.firstName}}`)
    };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(authorActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
