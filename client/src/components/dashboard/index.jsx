import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './profile-actions';
import Experience from './experience';
import Education from './education';

class Dashboard extends Component {
    componentDidMount() {
        /* eslint react/destructuring-assignment: */
        this.props.getCurrentProfile();
    }

    onDeleteClick = () => {
        this.props.deleteAccount();
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner />;
        } else if (Object.keys(profile).length > 0) {
            dashboardContent = (
                <div>
                    <p className="lead text-muted">Welcome,
                        <Link to={`/profile/${profile.handle}`}>
                            {` ${user.name}`}
                        </Link>
                    </p>
                    <ProfileActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <div style={{
                        marginTop: '60px',
                    }}
                    >
                        <button type="button" onClick={this.onDeleteClick} className="btn btn-danger">
                            Delete my account
                        </button>
                    </div>
                </div>
            );
        } else if (Object.keys(profile).length === 0) {
            dashboardContent = (
                <div>
                    <p className="lead text-muted"> Welcome {user.name}</p>
                    <p>You have not set up a profile yet, please add some info</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                </div>
            );
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
});

Dashboard.propTypes = {
    auth: PropTypes.instanceOf(Object).isRequired,
    profile: PropTypes.instanceOf(Object).isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
    getCurrentProfile,
    deleteAccount,
})(Dashboard);