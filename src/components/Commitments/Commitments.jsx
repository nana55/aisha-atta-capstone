import { useState } from 'react';
import './Commitments.scss';
import avatar from '../../assets/images/avatar.jpg';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Comments from '../Comments/Comments';
import { useQuery, useQueryClient, useMutation } from "react-query";
import { apiRequest } from "../../utils/axios.jsx";
import { useContext } from "react";
import { AuthContext } from "../../context/authentication.jsx";
import moment from "moment";
import Interactions from '../Interactions/Interactions';

function Commitments({user_id}) {

    const liked = true;
    const starred = true;
    const [commentVisible, setCommentVisible] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const { isLoading: goalsLoading, error: goalsError, data: goalsData } = useQuery(["goals"], () =>
        apiRequest.get("/goals?userId=" + user_id).then((response) => {
            console.log("Response: ", response.data)
            return response.data;
        })
    );

    // const { isLoading: likesLoading, error: likesError, data: likesData } = useQuery(["likes", goalId], () => 
    //     apiRequest.get(`/likes?goalId=${goalId}`).then((response) => {
    //         console.log("Number of likes", response.data);
            
    //         return response.data;
    //     })
    // );


    if (goalsLoading) {
        return <p>Loading...</p>;
    }

    if (goalsError) {
        console.error("Error fetching goals:", error);
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
                        {/* <div className="commitments__interaction">
                            <div className="commitments__icon">
                                {liked ? <FavoriteOutlinedIcon className='commitments--like'/> : <FavoriteBorderOutlinedIcon />}
                                {likesData.count} Likes
                            </div>
                            <div className="commitments__icon">
                                {starred ? <StarOutlinedIcon className='commitments--star'/> : <StarBorderOutlinedIcon />}
                                20 Stars
                            </div>
                            <div className="commitments__icon"
                                onClick={() => setCommentVisible(!commentVisible)}>
                                <SmsOutlinedIcon />
                                12 Comments
                            </div>
                            <div className="commitments__icon">
                                <ShareOutlinedIcon />
                                Share
                            </div>
                        </div>
                        {commentVisible && <Comments goalId={goalData.id}/>} */}
                    </li>
                ))}

            </div>
        </div>
    )
}

export default Commitments