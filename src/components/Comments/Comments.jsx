import avatar from '../../assets/images/avatar.jpg';
import './comments.scss';
import { useQuery, useQueryClient, useMutation } from "react-query";
import { apiRequest } from "../../utils/axios.jsx";
import { useContext } from "react";
import { AuthContext } from "../../context/authentication.jsx";
import moment from "moment";

function Comments({goalId}) {
      
    const { currentUser } = useContext(AuthContext);
      
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
        return <p>Error fetching goals</p>;
    }

  return (
    <div className="comments">
      <div className="comments__input">
        <img src={avatar} alt="your avatar" className='comments__avatar'/>
        <input type="text" placeholder="Join the conversation" />
        <button className='comments__button'>Send</button>
      </div>
      {commentsData.map((comment) => (
        <div key={comment.id}  className="comments__comment">
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