import React, {Component} from 'react';
import _ from 'lodash';

class ProfileHeader extends Component {
  render() {

    const {profile} = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src=""
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status}{' '}
                {_.isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              {_.isEmpty(profile.location) ? null : <p>{profile.location}</p>}
              <p>
                <a
                  className="text-white p-2"
                  href=""
                  target="_blank"
                >
                  <i className="fab fa-twitter fa-2x"/>
                </a>

                <a
                  className="text-white p-2"
                  href=""
                  target="_blank"
                >
                  <i className="fab fa-facebook fa-2x"/>
                </a>

                <a
                  className="text-white p-2"
                  href=""
                  target="_blank"
                >
                  <i className="fab fa-linkedin fa-2x"/>
                </a>

                <a
                  className="text-white p-2"
                  href=""
                  target="_blank"
                >
                  <i className="fab fa-youtube fa-2x"/>
                </a>

                <a
                  className="text-white p-2"
                  href=""
                  target="_blank"
                >
                  <i className="fab fa-instagram fa-2x"/>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
