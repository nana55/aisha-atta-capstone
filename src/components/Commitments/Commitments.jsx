import './Commitments.scss';
import { useQuery, useQueryClient, useMutation } from "react-query";
import { apiRequest } from "../../utils/axios.jsx";
import { useContext } from "react";
import { AuthContext } from "../../context/authentication.jsx";
import moment from "moment";
import Interactions from '../Interactions/Interactions';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Commitments({ user_id }) {

    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const { isLoading: goalsLoading, error: goalsError, data: goalsData } = useQuery(["goals"], () =>
        apiRequest.get("/goals?userId=" + user_id).then((response) => {
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
        <div className='commitments'>
            <ToastContainer />
            <h2 className='commitments__title'>Commitments Feed</h2>
            <div className="commitments__list">
                {goalsData.map((goalData) => (
                    <li key={goalData.id} className='commitments__item'>
                        <div className='commitments__user'>
                            <Link to={`/profile/${goalData.user_id}`}>
                                <img src={goalData.avatar} alt="default" className="commitments__avatar" />
                            </Link>

                            <div className='commitments__user-info'>
                                <Link to={`/profile/${goalData.user_id}`} className='commitments__link'>
                                    <span className="commitments__name">{goalData.userName}</span>
                                </Link>
                                <span className="commitments__date">{moment(goalData.created_at).fromNow()}</span>
                            </div>
                        </div>

                        <div className="commitments__content">
                            <p className='commitments__description'>{goalData.description}</p>

                            {goalData.image && (
                                <img src={goalData.image} alt={`Image for ${goalData.description}`} className='commitments__image' />
                            )}
                            {!goalData.image && (<img src='' alt='' />)}

                        </div>

                        < Interactions goalId={goalData.id} />

                    </li>
                ))}

            </div>
        </div>
    )
}

export default Commitments