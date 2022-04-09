import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import metro from '../metro-icon.jpeg';
import bus from '../bus-icon.jpeg';

// import { getStations, home } from '../store/actions/stationAction';
// import { getUser } from '../store/actions/userAction';

function Dashboard(props) {

  const navigate = useNavigate();
  const { userCard, creditTransaction, debitTransaction } = props

  const handleLoadClick = (e) => {
    e.preventDefault()
    navigate('/load_card')
  }
  const handleSwipeClick = (e) => {
    e.preventDefault()
    navigate('/swipe_card')
  }
  let markup = ''
  markup = (
    <div className="d-flex flex-row row mt-5">
      <h2 className="col-12 pl-5">Dashboard</h2>
      <div className="col-4 mt-5 pl-5 ml-5">
        <div className="card w-75">
          <div className="card-body">
            <p>Your Current Balance </p>
            <h3>AED {userCard.balance || 0}</h3>
            <div className="row">
              <div className="col-6">
                <p> Last Debit </p>
                <p> Last Credit </p>
                <button className="btn btn-warning w-100" onClick={handleLoadClick}> Load Card </button>
              </div>
              <div className="col-6 text-end">
                <p> AED { debitTransaction.deposit_amount || 0 } </p>
                <p> AED { creditTransaction.deducted_amount || 0 } </p>
                <button className="btn btn-success w-100" onClick={handleSwipeClick} > Swipe </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6 mt-5">
        <div className="card w-75">
          <div className="card-body">
            <h5> Last 5 Transactions </h5>
            <div className="row">
              <div className="col-3">
                <img alt="Metro" src={metro} width="80" height="70" />
              </div>
              <div className="col-9">
                <p>Mall of Emirates to Expo 2020</p>
                <p className="text-danger">AED 7.50</p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <img alt="Bus" src={bus} width="80" height="70" />
              </div>
              <div className="col-9">
                <p>Mall of Emirates to Expo 2020</p>
                <p className="text-danger">AED 7.50</p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <img alt="Metro" src={metro} width="80" height="70" />
              </div>
              <div className="col-9">
                <p>Mall of Emirates to Expo 2020</p>
                <p className="text-danger">AED 7.50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return markup;
}

function mapStateToProps({ userReducer, transactionReducer }) {
  return {
    userCard: userReducer.card,
    creditTransaction: transactionReducer.creditTransaction,
    debitTransaction: transactionReducer.debitTransaction
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // getStations: getStations,
    // getUser: getUser,
    // home: home
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
