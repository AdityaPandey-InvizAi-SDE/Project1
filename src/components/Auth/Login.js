import React, { SyntheticEvent, useState } from 'react';
import { useAuth } from './auth';
import { useNavigate } from "react-router-dom";

import "./Auth.css"

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate()
    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // credentials: 'include',
            body: JSON.stringify({
                username: name,
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
                localStorage.setItem('Users', responseJson.token)
                auth.login(name)
                navigate("/", { replace: true })
            })
            .catch((error) => {
                console.log(error)
                alert("invalid credential")
            });


        // const content = await response.json();

        // setRedirect(true);
        // props.setName(content.name);

    }

    if (redirect) {
        // return <Redirect to="/"/>;
    }

    return (
        <div className='loginBody'>
            <div className="container">
                <div className="screen">

                    <div className="screen__content">

                        <form className="login" onSubmit={submit}>
                            <h2 className='header1'>LOGIN</h2>
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input type="text" className="login__input" placeholder="User name / Email" onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input type="password" className="login__input" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <button className="button login__submit" type="submit" value="submit" >
                                <span className="button__text">Log In Now</span>
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
    );

};

export default Login;
