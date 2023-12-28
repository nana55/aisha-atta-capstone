import React from 'react';
import "./Login.scss";

function Login() {
  return (
    <div className='login'>
        <div className="login__container">
            <div className="login__register">
                <h1 className='login__title'>Get Motivated</h1>
                <p className='login__text'>Achieve your goals with your community</p>
                <p className='login__sub-text'>Don't have an account yet?</p>
                <button className='login__button'>Register</button>
            </div>

            <div className="login__login">
                <h1 className='login__title'>Login</h1>
                <form className='login__form'>
                    <input type="text" placeholder='Username' />
                    <input type="password" placeholder='Password' />
                    <button className='login__button'>Log in</button>
                </form>
            </div>
        </div>


    </div>
  )
}

export default Login