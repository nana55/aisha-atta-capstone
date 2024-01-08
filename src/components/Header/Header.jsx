import { useContext } from 'react';
import './Header.scss';
import logo from '../../assets/images/logo.png';
import commitHubLogo from '../../assets/images/commitHubLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/authentication.jsx";
import LogoutIcon from '@mui/icons-material/Logout';
import { apiRequest } from '../../utils/axios.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            await apiRequest.post('/auth/logout');
            setCurrentUser(null);
            navigate("/login");
        } catch (error) {
            toast.error('Logout error');
        }
    }


    return (
        <>
            <ToastContainer />
            <div className="header">

                <div className="header__logo">
                    <Link to="/" className='header__ref'>
                        <img
                            src={commitHubLogo}
                            alt="logo"
                            className='header__logo-image' />
                    </Link>

                </div>

                <div className="header__items">

                    <LogoutIcon onClick={handleLogout} className='header__logout' />

                    <div className="header__user">
                        <Link to={`/profile/${currentUser.id}`}>
                            <img
                                src={currentUser.avatar}
                                alt="profile avatar"
                                className='header__avatar'
                            />
                        </Link>
                        <p>Hello,&nbsp;{currentUser.name}!</p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Header