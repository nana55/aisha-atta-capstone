import { useState } from 'react'
import './Interactions.scss'
import { useQuery } from "react-query";
import { apiRequest } from "../../utils/axios.jsx";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Comments from '../Comments/Comments';

function Interactions({ goalId }) {
    const liked = true;
    const starred = true;
    const [commentVisible, setCommentVisible] = useState(false);

    const { isLoading, error, data: likesData } = useQuery(["likes", goalId], () =>
        apiRequest.get(`/likes?goalId=${goalId}`).then((response) => {
            console.log(`Number of likes for ${goalId}`, response.data);

            return response.data;
        })
        );

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error("Error fetching likes:", error);
        return <p>Error fetching likes</p>;
    }

    return (
        <div className='interaction'>Interactions

            <div className="interaction__container">
                <div className="interaction__icon">
                    {liked ? <FavoriteOutlinedIcon className='interaction--like' /> : <FavoriteBorderOutlinedIcon />}
                    {likesData.count} Likes
                </div>
                <div className="interaction__icon">
                    {starred ? <StarOutlinedIcon className='interaction--star' /> : <StarBorderOutlinedIcon />}
                    20 Stars
                </div>
                <div className="interaction__icon"
                    onClick={() => setCommentVisible(!commentVisible)}>
                    <SmsOutlinedIcon />
                    12 Comments
                </div>
                <div className="interaction__icon">
                    <ShareOutlinedIcon />
                    Share
                </div>
            </div>
            {commentVisible && <Comments goalId={goalId} />}
        </div>
    )
}

export default Interactions