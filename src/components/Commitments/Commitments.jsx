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


function Commitments() {

    const goalsData = [
        {
            id: 1,
            name: "Jane Doe",
            userId: "user123",
            avatar: "https://example.com/avatar1.jpg",
            commitment: "Learn React",
            img: "https://hips.hearstapps.com/hmg-prod/images/nature-quotes-landscape-1648265299.jpg",
            category: "Learning",
        },
        {
            id: 2,
            name: "John Smith",
            userId: "user456",
            avatar: "https://example.com/avatar2.jpg",
            commitment: "Exercise regularly (3 times a week)",
            img: "https://media.cntraveller.com/photos/611bf0b8f6bd8f17556db5e4/master/pass/gettyimages-1146431497.jpg",
            category: "Health",
        },
        {
            id: 3,
            name: "Alice Johnson",
            userId: "user789",
            avatar: "https://example.com/avatar3.jpg",
            commitment: "Read a book per month",
            img: "",
            category: "Reading",
        },
        {
            id: 4,
            name: "Bob Miller",
            userId: "user123",
            avatar: "https://example.com/avatar1.jpg",
            commitment: "Practice mindfulness (10 minutes daily)",
            img: "https://example.com/image4.jpg",
            category: "Wellness",
        },
        {
            id: 5,
            name: "Eva Brown",
            userId: "user456",
            avatar: "https://example.com/avatar2.jpg",
            commitment: "Learn a new language (30 minutes daily)",
            img: "https://assets-global.website-files.com/648f76da04dfc69f8db5bb19/64e6da8edda885b595a42c30_how-to-get-your-study-motivation-ignited.png",
            category: "Learning",
        },
        {
            id: 6,
            name: "Charlie Davis",
            userId: "user789",
            avatar: "https://example.com/avatar3.jpg",
            commitment: "Explore nature every weekend",
            img: "https://i.scdn.co/image/ab67616d0000b273276d8a2d0264506d16e5eb96",
            category: "Adventure",
        },
    ];

    const liked = true;
    const starred = true;
    const [commentVisible, setCommentVisible] = useState(false);
    return (
        <div className='commitments'>Commitments
            <div className="commitments__list">
                {goalsData.map((goalData) => (
                    <li key={goalData.id} className='commitments__item'>
                        <div className='commitments__user'>
                            <img src={avatar} alt="default" className="commitments__avatar" />
                            <div className='commitments__user-info'>
                                <span className="commitments__name">{goalData.name}</span>
                                <span className="commitments__date">1 min ago</span>
                            </div>
                        </div>

                        <div className="commitments__content">
                            <p className='commitments__description'>{goalData.commitment}</p>
                            <img src={goalData.img} alt="commitment image" className='commitments__image' />
                        </div>

                        <div className="commitments__interaction">
                            <div className="commitments__icon">
                                {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                                20 Likes
                            </div>
                            <div className="commitments__icon">
                                {starred ? <StarOutlinedIcon /> : <StarBorderOutlinedIcon />}
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
                        {commentVisible && <Comments />}
                    </li>
                ))}
                
            </div>
        </div>
    )
}

export default Commitments