import './GoalsbyUser.scss';
import { useQuery } from "react-query";
import { apiRequest } from "../../utils/axios.jsx";
import moment from "moment";
import Interactions from '../Interactions/Interactions';

function GoalsByUser({id}) {
    const { isLoading: goalsLoading, error: goalsError, data: goalsData } = useQuery(["goals"], () =>
        apiRequest.get(`/goals/user/${id}`).then((response) => {
            console.log("Response to Goals by User: ", response.data)
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
    <div className='goalsByUser'>
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
                            <img src={goalData.image} alt="commitment image" className='goalsByUser__image' />
                        </div>
                        
                        < Interactions goalId={goalData.id} />
                        
                    </li>
                ))}

            </div>
        </div>
  )
}

export default GoalsByUser