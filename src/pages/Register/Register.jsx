import React from 'react'
import "./Register.scss";

function Register() {
    return (
        <div className='register'>
            <div className="register__container">

            <div className="register__register">    
                <h1 className='register__title'>Register</h1>
                <form className='register__form'>
                    <input type="text" placeholder='Username' />
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />
                    <input type="text" placeholder='Name' />
                    <button className='register__button'>Register</button>
                </form>
</div>
                <div className="register__login">
                    
                        <h1 className='register__title'>Commit Hub</h1>
                        <p className='register__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p className='register__sub-text'>I already have an account</p>
                        <button className='register__button'>Log in</button>
                    
                </div>
            </div>


        </div>
    )
}

export default Register