import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FaUserCheck } from 'react-icons/fa';

// import { getStations, home } from '../store/actions/stationAction';
// import { getUser } from '../store/actions/userAction';

class Profile extends Component {
  componentDidMount() {
  }

  render() {
    const { signedInUser } = this.props
    let markup = ''
    markup = (
      <div className="d-flex flex-row row mt-5">
        <h2 className="col-12 pl-5">Profile</h2>
        <div className="col-6 mt-5">
          <div className="card w-75 mx-auto">
            <div className="card-body">
              <h3>
                <FaUserCheck style={{color: 'green'}} />
              </h3>
              <div className="row">
                <div className="col-6">
                  <p> Name </p>
                  <p> Email </p>
                </div>
                <div className="col-6 text-end">
                  <p> {signedInUser.first_name} {signedInUser.last_name} </p>
                  <p> {signedInUser.email} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return markup;
  }
}

function mapStateToProps({stationReducer, userReducer}) {
  return {
    signedInUser: userReducer.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // getStations: getStations,
    // getUser: getUser,
    // home: home
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
