import React, {PropTypes} from 'react';
import TextInput from '../../../components/TextInput';

const AuthorForm = ({author, isSaving, isDeleting, shouldAllowDelete, errors, onChange, onSave, onDelete}) => {
    return (
        <form>
            <h1>Manage Author</h1>

            <TextInput name="firstName" label="First Name" value={author.firstName}
                onChange={onChange} error={errors.firstName} />

            <TextInput name="lastName" label="Last Name" value={author.lastName}
                onChange={onChange} error={errors.lastName} />

            <div className="row">
                <div className="col-sm-10">
                    <input type="submit" disabled={isSaving || isDeleting}
                        value={isSaving ? 'Saving...' : 'Save'}
                        className="btn btn-primary"
                        onClick={onSave}/>
                </div>
                {shouldAllowDelete &&
                    <div className="col-sm-2">
                        <input type="button" disabled={isSaving || isDeleting}
                            value={isDeleting ? 'Deleting...' : 'Delete'}
                            className="btn btn-danger"
                            onClick={onDelete}/>
                    </div>
                }
            </div>
        </form>
    );
};

AuthorForm.propTypes = {
    author: PropTypes.object.isRequired,
    isSaving: PropTypes.bool,
    isDeleting: PropTypes.bool,
    shouldAllowDelete: PropTypes.bool,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default AuthorForm;
