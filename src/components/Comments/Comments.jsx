import avatar from '../../assets/images/avatar.jpg';
import './comments.scss';
import { useQuery, useQueryClient, useMutation } from "react-query";
import { apiRequest } from "../../utils/axios.jsx";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authentication.jsx";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Comments({ goalId }) {
    const [addComment, setAddComment] = useState('');
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const { isLoading, error, data: commentsData } = useQuery(["comments", goalId], () => 
        apiRequest.get(`/comments?goalId=${goalId}`).then((response) => response.data)
    );

    const mutation = useMutation(
        (newComment) => {
            return apiRequest.post("/comments", newComment);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["comments"]);
            }
        }
    )

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!addComment.trim()) {
            toast.error("You need to enter some text to join this conversation");
            return;
        }

        try {
            const newComment = {
                comment: addComment,
                user_comment_id: currentUser.id,
                goals_comment_id: goalId,
                created_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            };

            await mutation.mutate(newComment);
            setAddComment('');
        } catch (error) {
            toast.error("Error creating comment");

        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        toast.error("Error fetching comments");
        return;
    }





    return (
        <div className="comments">
            <ToastContainer />
            <div className="comments__input">
                <img src={avatar} alt="your avatar" className='comments__avatar' />
                <input type="text" placeholder="Join the conversation" value={addComment} onChange={(e) => setAddComment(e.target.value)} />
                <button className='comments__button' onClick={handleSubmit}>Send</button>
            </div>

            {commentsData.map((comment) => (
                <div key={comment.id} className="comments__comment">
                    <img src={comment.avatar} alt="user avatar" className='comments__avatar' />
                    <div className="comments__detail">
                        <p className="comments__name">{comment.userName}</p>
                        <p className="comments__comment-actual">{comment.comment}</p>
                    </div>
                    <span className="comments__date">{moment(comment.created_at).fromNow()}</span>
                </div>
            ))}
        </div>
    )
}

export default Comments