import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import copyOf from '../../../util/copyOf';
import * as authorActions from '../authorDuck';
import AuthorForm from './AuthorForm';

class ManageAuthorPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            author: copyOf(props.author),
            courses: props.courses,
            errors: {},
            isSaving: false,
            isDeleting: false,
            isDirty: false
        };

        this.routerWillLeave = this.routerWillLeave.bind(this);
        this.updateAuthorState = this.updateAuthorState.bind(this);
        this.saveAuthor = this.saveAuthor.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);
    }

    componentDidMount() {
        if (this.context.router) {
            /* eslint-disable react/prop-types */
            this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
            /* eslint-enable */
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.author) { // will be undefined after delete
            if (nextProps.author.id != this.props.author.id) {
                // necessary to populate form when existing author is loaded directly
                this.setState({author: copyOf(nextProps.author)});
            }
        } else {
            this.setState({author: emptyAuthor()});
        }
    }

    routerWillLeave(nextLocation) {
        if (this.state.isDirty) {
            return 'Are you sure you want to leave this page with unsaved changes?';
        }
    }

    updateAuthorState(event) {
        let author = this.state.author;
        author[event.target.name] = event.target.value;
        return this.setState({author: author, isDirty: true});
    }

    authorFormIsValid() {
        const errors = {};

        const author = this.state.author;

        if (author.firstName.length < 3) {
            errors.firstName = 'First Name must be at least 3 characters.';
        }

        if (author.lastName.length < 3) {
            errors.lastName = 'Last Name must be at least 3 characters.';
        }

        this.setState({errors: errors});

        return (Object.keys(errors).length === 0);
    }

    saveAuthor(event) {
        event.preventDefault();

        if (!this.authorFormIsValid()) {
            return;
        }

        this.setState({isSaving: true});

        const author = this.state.author;
        const verb = (author.id) ? 'saved' : 'added';

        this.props.actions.saveAuthor(author)
            .then(() => this.handleSuccessfulUpdate(verb))
            .catch(error => {
                toastr.error(error);
                this.setState({isSaving: false});
            });
    }

    deleteAuthor(event) {
        event.preventDefault();

        const author = this.state.author;

        if (this.state.courses.filter(course => course.authorId === author.id).length > 0) {
            toastr.error("This author can't be deleted unless you delete his/her courses first.");
            return;
        }

        if (!confirm(`Are you sure you want to delete ${author.firstName} ${author.lastName}?`
            + '\n\nThis cannot be undone.')) {
            return;
        }

        this.setState({isDeleting: true});

        this.props.actions.deleteAuthor(author)
            .then(() => this.handleSuccessfulUpdate('deleted'))
            .catch(error => {
                toastr.error(error);
                this.setState({isDeleting: false});
            });
    }

    handleSuccessfulUpdate(verb) {
        const author = this.state.author;
        this.setState({isSaving: false, isDeleting: false, isDirty: false});
        toastr.success(`Author "${author.firstName} ${author.lastName}" ${verb}`);
        this.context.router.push('/authors');
    }

    render() {
        const state = this.state;

        return (
            <AuthorForm
                author={state.author}
                errors={state.errors}
                isSaving={state.isSaving}
                shouldAllowDelete={!!state.author.id}
                isDeleting={state.isDeleting}
                onChange={this.updateAuthorState}
                onSave={this.saveAuthor}
                onDelete={this.deleteAuthor}
            />
        );
    }
}

ManageAuthorPage.propTypes = {
    author: PropTypes.object.isRequired,
    courses: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.object.isRequired
};

// Pull in the React Router context so router is available as this.context.router:
ManageAuthorPage.contextTypes = {
    router: PropTypes.object
};

function emptyAuthor() {
    return {id: '', firstName: '', lastName: ''};
}

function mapStateToProps(state, ownProps) {
    const authors = state.authors;
    const authorId = ownProps.params.id; // (from the path '/author:id')

    const author = (authorId && authors.length > 0)
        ? authors.find(author => author.id == authorId)
        : emptyAuthor();

    return { author: author, courses: state.courses };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(authorActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
