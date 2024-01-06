import './Commitments.scss';
import { useQuery, useQueryClient, useMutation } from "react-query";
import { apiRequest } from "../../utils/axios.jsx";
import { useContext } from "react";
import { AuthContext } from "../../context/authentication.jsx";
import moment from "moment";
import Interactions from '../Interactions/Interactions';

function Commitments({user_id}) {

    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const { isLoading: goalsLoading, error: goalsError, data: goalsData } = useQuery(["goals"], () =>
        apiRequest.get("/goals?userId=" + user_id).then((response) => {
            console.log("Response: ", response.data)
            return response.data;
        })
    );

    if (goalsLoading) {
        return <p>Loading...</p>;
    }

    if (goalsError) {
        console.error("Error fetching goals:", goalsError);
        return <p>Error fetching goals</p>;
    }


    return (
        <div className='commitments'>
            <h2 className='commitments__title'>Commitments Feed</h2>
            <div className="commitments__list">
                {goalsData.map((goalData) => (
                    <li key={goalData.id} className='commitments__item'>
                        <div className='commitments__user'>
                            <img src={goalData.avatar} alt="default" className="commitments__avatar" />
                            <div className='commitments__user-info'>
                                <span className="commitments__name">{goalData.userName}</span>
                                <span className="commitments__date">{moment(goalData.created_at).fromNow()}</span>
                            </div>
                        </div>

                        <div className="commitments__content">
                            <p className='commitments__description'>{goalData.description}</p>
                            <img src={goalData.image} alt="commitment image" className='commitments__image' />
                        </div>
                        
                        < Interactions goalId={goalData.id} />
                        
                    </li>
                ))}

            </div>
        </div>
    )
}

export default Commitments