import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getTransactions } from '../store/actions/transactionAction';

import Metro from '../metro-icon.jpeg';
import Bus from '../bus-icon.jpeg';

class Transaction extends Component {
  componentDidMount() {
    if (this.props.userCard && this.props.userCard.id) {
      this.props.getTransactions(this.props.userCard.id)
    }
  }

  render() {
    const { transactions } = this.props
    let markup = ''
    markup = (
      <div className="d-flex flex-row row mt-5">
        <h2 className="col-12 pl-5">Transactions</h2>
        <div className="col-12 mt-5">
          <div className="card w-75 mx-auto">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Journey</th>
                    <th scope="col">Date/Time</th>
                    <th scope="col">Actual Amount</th>
                    <th scope="col">Deducted Amount</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions && transactions.map((transaction) => {
                    return (
                      <tr key={transaction.id}>
                        <td>
                          <img alt={transaction.medium} src={transaction.medium === 'metro' ? Metro : Bus} width="25" height="20" />
                          {transaction.station_from} to {transaction.station_to}
                        </td>
                        <td>{transaction.transaction_date}</td>
                        <td className="text-end">{transaction.actual_amount}</td>
                        <td className="text-end">{transaction.deducted_amount}</td>
                        <td>
                          <span className="badge bg-gradient bg-opacity-25 text-success bg-success">
                            {transaction.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
    return markup;
  }
}

function mapStateToProps({transactionReducer}) {
  return {
    transactions: transactionReducer.transactions
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getTransactions: getTransactions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
