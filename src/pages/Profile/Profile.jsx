import { useEffect, useState } from 'react';
import "./Profile.scss";
import avatar from '../../assets/images/avatar.jpg';
import { useParams } from 'react-router-dom';
import { apiRequest } from '../../utils/axios.jsx';
import Commitments from '../../components/Commitments/Commitments';
import GoalsByUser from '../../components/GoalsByUser/GoalsByUser';

function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiRequest.get(`/users/profile/${id}`);
        console.log("userData: ", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
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
        Posts
        <GoalsByUser id={id}/>
      </div>
    </div>
  )
}

export default Profile