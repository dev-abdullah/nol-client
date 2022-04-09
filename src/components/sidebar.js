import React, { useState, useEffect } from 'react';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signout } from '../store/actions/userAction';

import {
  FaTachometerAlt,
  FaSignOutAlt,
  FaUserCircle,
  FaSignInAlt,
  FaUserCheck,
  FaExchangeAlt,
  FaMoneyBill,
  FaRegCreditCard
} from 'react-icons/fa';

function Sidebar(props) {
  const navigate = useNavigate();
  const { signedinUser, signout } = props;
  const [items, setItems] = useState([])

  useEffect(() => {
    let data = []
    if (signedinUser && signedinUser.id) {
      data = [
        {
          title: '',
          itemId: '/'
        },
        {
          title: `${signedinUser.first_name} ${signedinUser.last_name}`,
          itemId: '/profile',
          elemBefore: () => <FaUserCheck style={{color: 'green'}} />
        },
        {
          title: '',
          itemId: '#'
        },
        {
          title: 'Dashboard',
          itemId: '/dashboard',
          elemBefore: () => <FaTachometerAlt style={{color: 'green'}} />
        },
        {
          title: 'Transactions',
          itemId: '/transactions',
          elemBefore: () => <FaExchangeAlt style={{color: 'green'}} />
        },
        {
          title: 'Load Card',
          itemId: '/load_card',
          elemBefore: () => <FaMoneyBill style={{color: 'green'}} />
        },
        {
          title: 'Swipe Card',
          itemId: '/swipe_card',
          elemBefore: () => <FaRegCreditCard style={{color: 'green'}} />
        },
        {
          title: 'Sign Out',
          itemId: 'signout',
          elemBefore: () => <FaSignOutAlt style={{color: 'red'}} />
        }
      ]
    }
    else {
      data = [
        {
          title: '',
          itemId: '/'
        },
        {
          title: 'Login',
          itemId: '/login',
          elemBefore: () => <FaSignInAlt style={{color: 'green'}} />
        },
        {
          title: 'Sign up',
          itemId: '/signup',
          elemBefore: () => <FaUserCircle style={{color: 'green'}} />
        }
      ]
    }
    setItems(data)
  }, [signedinUser])

  return (
    <>
      <Navigation
        activeItemId = "/"
        onSelect = { ({itemId} ) => {
          if (itemId === 'signout') {
            signout()
            navigate('/');
          }
          else {
            navigate(itemId);
          }

        }}
        items = { items }
      />
    </>
  );
}

function mapStateToProps({userReducer}) {
  return {
    signedinUser: userReducer.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signout: signout
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
