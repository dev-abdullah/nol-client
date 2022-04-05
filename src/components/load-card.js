import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';

import { depositTransaction } from '../store/actions/transactionAction';

function LoadCard(props) {

  const navigate = useNavigate();
  const { userCard, depositTransaction, creditTransaction } = props
  const [amount, setAmount] = useState('')

  // useEffect(() => {
  //   if (creditTransaction && creditTransaction.id) {
  //     navigate('/load_card')
  //   }
  // })

  const handleSubmit = (e) => {
    e.preventDefault()

    const transaction = {
      deposit_amount: amount,
      card_id: userCard.id
    }

    depositTransaction(transaction)
    setAmount('')
    navigate('/dashboard')
  }

  const handleLoadChange = (e) => {
    setAmount(e.target.value)
  }

  let markup = ''
  markup = (
    <div className="d-flex flex-row row mt-5">
      <h2 className="col-12 pl-5">Load Card</h2>
      <div className="col-4 mt-5 pl-5 ml-5">
        <div className="card w-100">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="mb-3 col-auto">
                <label className="form-label">Enter Amount(AED)</label>
                <input type="amount" onChange={handleLoadChange} className="form-control" value={amount} />
              </div>
              <div className="col-auto pt-4">
                <button type="submit" className="btn btn-success">Load</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-4 mt-5 pl-5 ml-5">
        <div className="card w-75">
          <div className="card-body">
            <p>Your Current Balance </p>
            <h3>AED {userCard.balance}</h3>
          </div>
        </div>
      </div>
      <div className="col-6 mt-5">
        <div className="card w-75">
          <div className="card-body">
            <h5> Last 5 Transactions </h5>
            <div className="row">
              <div className="col-3">Image</div>
              <div className="col-9">
                <p>Mall of Emirates to Expo 2020</p>
                <p className="text-danger">AED 7.50</p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">Image</div>
              <div className="col-9">
                <p>Mall of Emirates to Expo 2020</p>
                <p className="text-danger">AED 7.50</p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">Image</div>
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
    creditTransaction: transactionReducer.creditTransaction
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    depositTransaction: depositTransaction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadCard);
