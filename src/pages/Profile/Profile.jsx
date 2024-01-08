import { useEffect, useState } from 'react';
import "./Profile.scss";
import { useParams } from 'react-router-dom';
import { apiRequest } from '../../utils/axios.jsx';
import GoalsByUser from '../../components/GoalsByUser/GoalsByUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiRequest.get(`/users/profile/${id}`);
        setUserData(response.data);
      } catch (error) {
        toast.error('Error fetching user data');
      }
    };

    fetchUserData();
  }, [id]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className='profile'>
      <div className="profile__info">
        <img src={userData.avatar} alt='avatar' className='profile__avatar' />
        <div className="profile__name">{userData.name}</div>
      </div>

      <div className="profile__contents">
        <GoalsByUser id={id}/>
      </div>
    </div>
  )
}

export default Profile