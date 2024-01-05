import { useContext } from 'react';
import './Header.scss';
import logo from '../../assets/images/logo.png';
//import avatar from '../../assets/images/avatar.jpg';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { Link } from 'react-router-dom';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import { AuthContext } from "../../context/authentication.jsx";

function Header() {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="header">
            <div className="header__logo">
                <Link to="/" className='header__ref'>
                    <img 
                    src={logo} 
                    alt="logo"
                    className='header__logo-image' />
                </Link>
               
            </div>

            <div className="header__items">
                <PersonOutlineOutlined />
                <DashboardOutlinedIcon />
  
                <div className="header__user">
                    <img
                        src={currentUser.avatar}
                        alt="profile avatar"
                        className='header__avatar'
                    />
                    <p>Hello,&nbsp;{currentUser.name}!</p>
                </div>
            </div>
        </div>
    )
}

export default Header