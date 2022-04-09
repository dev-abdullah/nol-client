import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';

import { depositTransaction } from '../store/actions/transactionAction';

function LoadCard(props) {

  const navigate = useNavigate();
  const { userCard, depositTransaction } = props
  const [amount, setAmount] = useState('')
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
    </div>
  );
  return markup;
}

function mapStateToProps({ userReducer }) {
  return {
    userCard: userReducer.card
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    depositTransaction: depositTransaction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadCard);
