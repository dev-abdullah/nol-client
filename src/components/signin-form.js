import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';

import { signinUser } from '../store/actions/signinUserAction'

function SigninForm(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { signedinUser } = props

  useEffect(() => {
    if (signedinUser && signedinUser.id) {
      navigate('/dashboard')
    }
  })

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      email: email,
      password: password
    }

    props.signinUser(user)

    setEmail('')
    setPassword('')
  }

  return (
    <div className="w-75 mt-5 card mx-auto">
      <div className="card-header"><h2>Login</h2></div>
      <form onSubmit={handleSubmit}>
        <div className="row my-4 mx-4">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" onChange={handleEmailChange} value={email} />
          </div>
        </div>
        <div className="row my-4 mx-4">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" onChange={handlePasswordChange} value={password} />
          </div>
        </div>
        <div className="card-footer">
          <button className="btn btn-secondary" type="submit" >Log In</button>
        </div>
      </form>
    </div>
  );
}

function mapStateToProps({userReducer}) {
  return {
    signedinUser: userReducer.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signinUser: signinUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
