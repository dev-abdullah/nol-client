import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';

import { signupUser } from '../store/actions/signupUserAction';

function SignupForm(props) {
  const navigate = useNavigate()
  const { signedinUser } = props

  useEffect(() =>{
    if (signedinUser && signedinUser.id) {
      navigate('/dashboard')
    }
  })

  const [first_name, setFirstNameChange] = useState('');
  const [last_name, setLastNameChange] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstNameChange(e.target.value)
  }
  const handleLastNameChange = (e) => {
    setLastNameChange(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    }

    props.signupUser(user)

    setFirstNameChange('')
    setLastNameChange('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="w-75 mt-5 card">
      <div className="card-header">
        <h2> Signup </h2>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="row my-4 mx-4">
          <label className="col-sm-2 col-form-label">First Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" onChange={handleFirstNameChange} value={first_name} />
          </div>
        </div>
        <div className="row my-4 mx-4">
          <label className="col-sm-2 col-form-label">Last Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" onChange={handleLastNameChange} value={last_name} />
          </div>
        </div>
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
          <button className="btn btn-primary" type="submit" >Submit</button>
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
    signupUser: signupUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
