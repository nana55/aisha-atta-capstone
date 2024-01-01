import { useContext, useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/authentication.jsx";

function Login() {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!inputs.username || !inputs.password) {
            setError("Please fill in all fields.");
            return;
        }
        try {
            await login(inputs);
            navigate("/")
        } catch (err) {
            console.error("Login error:", err);
            if ( err.response && err.response.status === 400 ) {
                
                setError("Incorrect username or password. Please try again.");
                console.log("Error message:", error);
            } else {
                console.error("Other Server Response:", err.response);
                setError(err.response.data);
            }
        }
    };

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
                        {error && <div className="login__error">{error}</div>}
                        <input type="text" placeholder='Username' name="username" onChange={handleChange} />
                        <input type="password" placeholder='Password' name="password" onChange={handleChange} />
                        <button className='login__button' onClick={handleLogin}>Log in</button>


                    </form>
                </div>
            </div>


        </div>
    )
}

export default Login