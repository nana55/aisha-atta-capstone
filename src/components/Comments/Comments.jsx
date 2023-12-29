import avatar from '../../assets/images/avatar.jpg';
import './comments.scss';

function Comments() {

    const comments = [
        {
          id: 1,
          comment: "Great job on your goal! Keep it up!",
          name: "Alice Johnson",
          userId: "user123",
        },
        {
          id: 2,
          comment: "I'm inspired by your commitment. Well done!",
          name: "Bob Miller",
          userId: "user456",
        },
        {
          id: 3,
          comment: "Learning a new language is a fantastic goal!",
          name: "Eva Brown",
          userId: "user789",
        },
        {
          id: 4,
          comment: "Your mindfulness practice is admirable. Stay mindful!",
          name: "Charlie Davis",
          userId: "user123",
        },
      ];
      
 
      


  return (
    <div className="comments">
      <div className="comments__input">
        <img src={avatar} alt="your avatar" className='comments__avatar'/>
        <input type="text" placeholder="Join the conversation" />
        <button className='comments__button'>Send</button>
      </div>
      {comments.map((comment) => (
        <div key={comment.id}  className="comments__comment">
          <img src={avatar} alt="user avatar" className='comments__avatar' />
          <div className="comments__detail">
            <p className="comments__name">{comment.name}</p>
            <p className="comments__comment-actual">{comment.comment}</p>
          </div>
          <span className="comments__date">1 hour ago</span>
        </div>
      ))}
    </div>
  )
}

export default Comments