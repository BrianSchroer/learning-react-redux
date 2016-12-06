import React, {PropTypes} from 'react';
import SelectInput from '../../../components/SelectInput';
import TextInput from '../../../components/TextInput';

const CourseForm = ({course, allAuthors, isSaving, isDeleting, shouldAllowDelete, errors, onChange, onSave, onDelete}) => {
    return (
        <form>
            <h1>Manage Course</h1>

            <TextInput name="title" label="Title" value={course.title}
                onChange={onChange} error={errors.title} />

            <SelectInput name="authorId" label="Author" value={course.authorId}
                defaultOption="Select Author" options={allAuthors}
                onChange={onChange} error={errors.authorId} />

            <TextInput name="category" label="Category" value={course.category}
                onChange={onChange} error={errors.category} />

            <TextInput name="length" label="Length" value={course.length}
                onChange={onChange} error={errors.length} />

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

CourseForm.propTypes = {
    course: PropTypes.object.isRequired,
    allAuthors: PropTypes.array,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isSaving: PropTypes.bool,
    isDeleting: PropTypes.bool,
    shouldAllowDelete: PropTypes.bool,
    errors: PropTypes.object
};

export default CourseForm;
