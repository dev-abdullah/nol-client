import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getStations } from '../store/actions/stationAction';
import { withdrawTransaction } from '../store/actions/transactionAction';

class SwipeCard extends Component {

  state = {
    medium: '',
    stationFrom: '',
    stationTo: ''
  }

  componentDidMount() {
    this.props.getStations()
  }

  render() {
    let markup = ''
    const { stations, signedInUser, userCard, withdrawTransaction } = this.props
    const { medium, stationFrom, stationTo } = this.state

    const handleMedium = (e) => {
      this.setState({medium: e.target.value})
    }

    const handleStationFrom = (e) => {
      this.setState({stationFrom: e.target.value})
    }

    const handleStationTo = (e) => {
      this.setState({stationTo: e.target.value})
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      const transaction = {
        medium: medium,
        station_from: stationFrom,
        station_to: stationTo,
        card_id: userCard.id
      }

      withdrawTransaction(transaction)

      this.setState({medium: '', stationFrom: '', stationTo: ''})
    }

    markup = (
      <div className="d-flex flex-row row mt-5">
        <h2 className="col-12 pl-5">Swipe Card</h2>
        <div className="col-12 pl-5 mt-5">
          <p> Your Current Balance </p>
          <h3>AED { userCard.balance || 0}</h3>
        </div>

        <div className="col-12 mt-5 ml-5">
          <div className="card w-75 mx-auto">
            <div className="card-body">
              <form className="row" onSubmit={handleSubmit}>
                <div className="col-3">
                  <select className="form-select" value={medium} onChange={handleMedium}>
                    <option value="">Select Medium</option>
                    <option value="1">Bus</option>
                    <option value="2">Metro</option>
                  </select>
                </div>
                <div className="col-3">
                  <select className="form-select" value={stationFrom} onChange={handleStationFrom}>
                    <option value="">Select From Point</option>
                    {stations && stations.map((station) => {
                      return (<option value={station.id} key={station.id}> {station.name} </option>)
                    })}
                  </select>
                </div>
                <div className="col-3">
                  <select className="form-select" value={stationTo} onChange={handleStationTo}>
                    <option value="">Select To Point</option>
                    {stations && stations.map((station) => {
                      return (<option value={station.id} key={station.id}> {station.name} </option>)
                    })}
                  </select>
                </div>
                <div className="col-3 d-flex flex-row-reverse">
                  <button className="btn btn-success w-75"> Swipe </button>
                </div>
              </form>
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
    signedInUser: userReducer.user,
    userCard: userReducer.card
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getStations: getStations,
    withdrawTransaction: withdrawTransaction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeCard);
