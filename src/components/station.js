import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getStations, home } from '../store/actions/stationAction';

class Station extends Component {
  componentDidMount() {
    this.props.getStations()
  }

  render() {
    const { stations, message, signedInUser } = this.props
    let markup = ''
    let zone1 = ''
    let zone2 = ''
    let zone5 = ''
    let zone6 = ''
    if (stations) {
      zone1 = stations.filter(station => station.zone === 'Zone 1')
      zone2 = stations.filter(station => station.zone === 'Zone 2')
      zone5 = stations.filter(station => station.zone === 'Zone 5')
      zone6 = stations.filter(station => station.zone === 'Zone 6')
    }
    markup = (
      <div className="row">
        <div className="col-12">
          <div className="row">
            <h1 className="col-12 bg-dark text-white m-0 py-2 bg-opacity-75"> Stations </h1>
            <div className="col-3 bg-success bg-gradient bg-opacity-25">
              <h3 className="py-3"> Zone 5 </h3>
              <ul className="list-group">
                { zone5 && zone5.map((station) => {
                  return (<li className="list-group-item list-group-item-success" key={station.id}> {station.name} </li>)
                }) }
              </ul>
            </div>

            <div className="col-3 bg-warning bg-gradient bg-opacity-25">
              <h3 className="py-3"> Zone 6 </h3>
              <ul className="list-group">
                { zone6 && zone6.map((station) => {
                  return (<li className="list-group-item list-group-item-warning" key={station.id}> {station.name} </li>)
                }) }
              </ul>
            </div>

            <div className="col-3 bg-info bg-gradient bg-opacity-25">
              <h3 className="py-3"> Zone 2 </h3>
              <ul className="list-group">
                { zone2 && zone2.map((station) => {
                  return (<li className="list-group-item list-group-item-info" key={station.id}> {station.name} </li>)
                }) }
              </ul>
            </div>

            <div className="col-3 bg-danger bg-gradient bg-opacity-25">
              <h3 className="py-3"> Zone 1 </h3>
              <ul className="list-group">
                { zone1 && zone1.map((station) => {
                  return (<li className="list-group-item list-group-item-danger" key={station.id}> {station.name} </li>)
                }) }
              </ul>
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
    stations: stationReducer.stations,
    message: stationReducer.message,
    signedInUser: userReducer.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getStations: getStations
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Station);
