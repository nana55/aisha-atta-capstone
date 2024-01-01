import { useState, useEffect } from 'react'
import "./Register.scss";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const URL_PATH = 'http://localhost:8080';
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const ErrorMessage = ({ error }) => {
        return <div className="register__error">{error}</div>;
    };

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (!inputs.username || !inputs.password || !inputs.name || !inputs.email) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            await axios.post(`${URL_PATH}/api/auth/register`, inputs);
            setError(null);
            setSuccessMessage("Registration successful! Redirecting to login page...");

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            setError(err.response.data);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMessage(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [successMessage]);


    return (
        <div className='register'>
            <div className="register__container">

                <div className="register__register">
                    <h1 className='register__title'>Register</h1>

                    <form className='register__form'>
                        {error && <div className="register__error">{error}</div>}
                        {successMessage && <div className="register__success">{successMessage}</div>}
                        <input type="text" placeholder='Username' name='username' onChange={handleChange} required />
                        <input type="password" placeholder='Password' name='password' onChange={handleChange} required />
                        <input type="text" placeholder='Name' name='name' onChange={handleChange} required />
                        <input type="email" placeholder='Email' name='email' onChange={handleChange} required />
                        <button className='register__button' onClick={handleClick}>Register</button>
                    </form>

                </div>
                <div className="register__login">

                    <h1 className='register__title'>Welcome Back!</h1>
                    <p className='register__text'>Embark on a journey to turn your dreams into achievements. Login to make it happen!</p>
                    <p className='register__sub-text'>I already have an account</p>
                    <Link to="/login">
                        <button className='register__button'>Log in</button>
                    </Link>


                </div>
            </div>


        </div>
    )
}

export default Register