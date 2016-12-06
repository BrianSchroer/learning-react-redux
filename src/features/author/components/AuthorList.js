import React, {PropTypes} from 'react';
import AuthorListRow from './AuthorListRow';

const AuthorList = ({authors}) => {
    if (authors.length === 0) {
        return (
            <div>
                <br/>
                <div className="jumbotron">There aren't any authors yet. This would be a great time to add one!</div>
            </div>
        );
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Author</th>
                </tr>
            </thead>
            <tbody>
                {authors.map(author => <AuthorListRow key={author.id} author={author}/>)}
            </tbody>
        </table>
    );
};

AuthorList.propTypes = {
    authors: PropTypes.array.isRequired
};

export default AuthorList;
