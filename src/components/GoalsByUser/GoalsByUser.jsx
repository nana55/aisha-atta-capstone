import './GoalsbyUser.scss';
import { useQuery } from "react-query";
import { apiRequest } from "../../utils/axios.jsx";
import moment from "moment";
import Interactions from '../Interactions/Interactions';
import ProgressTracker from '../ProgressTracker/ProgressTracker';
import { AuthContext } from '../../context/authentication.jsx';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GoalsByUser({ id }) {
    const { currentUser } = useContext(AuthContext);

    const { isLoading: goalsLoading, error: goalsError, data: goalsData } = useQuery(["goals"], () =>
        apiRequest.get(`/goals/user/${id}`).then((response) => {
            return response.data;
        })
    );

    if (goalsLoading) {
        return <p>Loading...</p>;
    }

    if (goalsError) {
        toast.error("Error fetching goals");
        return;
    }

  return (
    <div className='goalsByUser'>
        <ToastContainer />
            <div className="goalsByUser__list">
                {goalsData.map((goalData) => (
                    <li key={goalData.id} className='goalsByUser__item'>
                        <div className='goalsByUser__user'>
                            <img src={goalData.avatar} alt="default" className="goalsByUser__avatar" />
                            <div className='goalsByUser__user-info'>
                                <span className="goalsByUser__name">{goalData.userName}</span>
                                <span className="goalsByUser__date">{moment(goalData.created_at).fromNow()}</span>
                            </div>
                        </div>

                        <div className="goalsByUser__content">
                            <p className='goalsByUser__description'>{goalData.description}</p>
                            
                            {goalData.image && (
                                <img src={goalData.image} alt={`Image for ${goalData.description}`} className='goalsByUser__image' />
                            )}
                            {!goalData.image && (<img src='' alt='' />)}
                            
                        </div>
                        
                        < Interactions goalId={goalData.id} />
                        {currentUser.id === goalData.user_id && <ProgressTracker goalId={goalData.id} />}
                        
                    </li>
                ))}

            </div>
        </div>
  )
}

export default GoalsByUser