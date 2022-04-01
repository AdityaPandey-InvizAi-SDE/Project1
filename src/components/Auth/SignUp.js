import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import "./Auth.css"
export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const submit = async (e) => {

    e.preventDefault();

    await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: email,
        password: password
      })
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    })
      .then((responseJson) => {
        console.log(responseJson)
      })
      .catch((error) => {
        console.log(error)
      });
    // console.log("hello")
    // alert("created")
    // setRedirect(true);


  }
  //   if (redirect) {
  //     return <Route to="/login"/>;
  // }

  return (
    <div className='loginBody'>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={submit}>
              <h2 className='header1'>SIGN UP</h2>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input type="text" className="login__input" placeholder="User name / Email" onChange={e => setName(e.target.value)} />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input type="password" className="login__input" placeholder="Password" onChange={e => setPassword(e.target.value)} />
              </div>
              <button className="button login__submit" type="submit" value="submit" >
                <span className="button__text">SignUp Now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
            <div className="social-login">

            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

