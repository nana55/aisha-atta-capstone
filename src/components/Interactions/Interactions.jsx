import { useState, useContext } from 'react'
import './Interactions.scss'
import { useQuery, useQueryClient, useMutation } from "react-query";
import { apiRequest } from "../../utils/axios.jsx";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Comments from '../Comments/Comments';
import { AuthContext } from "../../context/authentication.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Interactions({ goalId }) {

    const [commentVisible, setCommentVisible] = useState(false);
    const { currentUser } = useContext(AuthContext);

    //Fetch comments count data
    const { isLoading: commentsLoading, error: commentsError, data: commentsData } = useQuery(['comments', goalId], () =>
        apiRequest.get(`/comments?goalId=${goalId}`).then((response) => {
            return response.data
        })
    );

    //Fetch Likes Data
    const { isLoading, error, data: likesData } = useQuery(["likes", goalId], () =>
        apiRequest.get(`/likes?goalId=${goalId}`).then((response) => {
            return response.data;
        })
    );

    //Fetch Starred Data
    const { isLoading: starsLoading, error: starsError, data: starsData } = useQuery(["stars", goalId], () =>
        apiRequest.get(`/stars?goalId=${goalId}`).then((response) => {
            return response.data;
        })
    );


    const queryClient = useQueryClient();

    const mutation = useMutation(
        ({ liked, goals_like_id }) => {
            if (liked) {
                return apiRequest.delete("/likes", { data: { goals_like_id } });
            }
            return apiRequest.post(`/likes`, { goals_like_id });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["likes"]);
            },
        }
    );

    const mutation_star = useMutation(
        ({ starred, goals_star_id }) => {
            if (starred) {
                return apiRequest.delete("/stars", { data: { goals_star_id } });
            }
            return apiRequest.post(`/stars`, { goals_star_id });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["stars"]);
            },
        }
    );


    const handleLike = (e) => {
        e.preventDefault();

        const isLiked = likesData.userIds.includes(currentUser.id);

        if (isLiked) {
            // If already liked, delete the like
            mutation.mutate({ liked: true, goals_like_id: goalId });
        } else {
            // If not liked, add a new like
            mutation.mutate({ liked: false, goals_like_id: goalId });
        }
    };

    const handleStars = (e) => {
        e.preventDefault();

        const isStarred = starsData.userIds.includes(currentUser.id);

        if (isStarred) {
            // If already liked, delete the star
            mutation_star.mutate({ starred: true, goals_star_id: goalId });
        } else {
            // If not liked, add a new star
            mutation_star.mutate({ starred: false, goals_star_id: goalId });
        }
    };



    if (isLoading || commentsLoading || starsLoading) {
        return <p>Loading...</p>;
    }

    if (error || commentsError || starsError) {
        toast.error("Error fetching data");
        return;
    }


    return (
        <div className='interaction'>
            <ToastContainer />
            <div className="interaction__container">
                <div className="interaction__icon">
                    {likesData.userIds.includes(currentUser.id) ?
                        (<FavoriteOutlinedIcon className='interaction--like' onClick={handleLike} />)
                        :
                        (<FavoriteBorderOutlinedIcon onClick={handleLike} />)
                    }
                    {likesData.count} Likes
                </div>
                <div className="interaction__icon">
                    {starsData.userIds.includes(currentUser.id) ? 
                        (<StarOutlinedIcon className='interaction--star' onClick={handleStars}/> )
                        : 
                        (<StarBorderOutlinedIcon onClick={handleStars}/>)
                    }
                    {starsData.count} Stars
                </div>
                <div className="interaction__icon"
                    onClick={() => setCommentVisible(!commentVisible)}>
                    <SmsOutlinedIcon />
                    {commentsData.length} Comment(s)
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