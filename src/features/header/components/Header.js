import React, {PropTypes} from 'react';
import { Link, IndexLink} from 'react-router';
import LoadingDots from '../../../components/LoadingDots';

const Header = ({isLoading, courseCount}) => {
    return (
        <div className="row">
            <nav className="col-sm-10">
                <IndexLink to="/" activeClassName="active">Home</IndexLink>
                {" | "}
                <Link to="/courses" activeClassName="active">Courses</Link>
                {" | "}
                <Link to="/authors" activeClassName="active">Authors</Link>
                {" | "}
                <Link to="/about" activeClassName="active">About</Link>
                {isLoading && <LoadingDots interval={100} dots={20}/>}
            </nav>
            <div className="col-sm-2">
                <span id="courseCount">Course count: {courseCount}</span>
            </div>
        </div>
    );
};

Header.propTypes = {
    isLoading: PropTypes.bool,
    courseCount: PropTypes.number
};

export default Header;
