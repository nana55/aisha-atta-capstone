import React from 'react';
import "./Login.scss";
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='login'>
        <div className="login__container">
            <div className="login__register">
                <h1 className='login__title'>Get Motivated</h1>
                <p className='login__text'>Achieve your goals with your community</p>
                <p className='login__sub-text'>Don't have an account yet?</p>
                <Link to="/register">
                <button className='login__button'>Register</button>
                </Link>
                
            </div>

            <div className="login__login">
                <h1 className='login__title'>Login</h1>
                <form className='login__form'>
                    <input type="text" placeholder='Username' />
                    <input type="password" placeholder='Password' />
                    <Link>
                    <button className='login__button'>Log in</button>
                    </Link>
                    
                </form>
            </div>
        </div>


    </div>
  )
}

export default Login