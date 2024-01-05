import avatar from '../../assets/images/avatar.jpg';
import './comments.scss';
import { useQuery, useQueryClient, useMutation } from "react-query";
import { apiRequest } from "../../utils/axios.jsx";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authentication.jsx";
import moment from "moment";

function Comments({ goalId }) {
    const [addComment, setAddComment] = useState('');
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const { isLoading, error, data: commentsData } = useQuery(["comments", goalId], () =>
        apiRequest.get(`/comments?goalId=${goalId}`).then((response) => {
            console.log("Response: ", response.data)
            return response.data;
        })
    );

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error("Error fetching comments:", error);
        return <p>Error fetching comments</p>;
    }

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
            //Add Error message - Validation
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
            console.error("Error creating comment:", error);
        }
    };

    return (
        <div className="comments">
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