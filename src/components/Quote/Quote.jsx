import './Quote.scss';
import { useEffect, useState } from 'react';
import axios from "axios";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Divider from '@mui/material/Divider';
import RefreshIcon from '@mui/icons-material/Refresh';


function Quote() {

    const [quote, setQuote] = useState("");
    const URL_PATH = "https://api.quotable.io/random?maxLength=100&tags=%22inspirational%22%7C+%22wisdom%22";

    useEffect(() => {
        
            const fetchQuote = async () => {
            try {   
                 const result = await axios.get(URL_PATH);
                setQuote(result.data);
                console.log(setQuote);
            }
            
         catch (err) {
            console.error("Error fetching quote: ", err);
        } }
fetchQuote();
    }, []);

    return (
        <div className='quote'>
            <div className="quote__container">
                <FormatQuoteIcon className='quote__icon'/>
                <h4 className='quote__quote'>{quote.content}</h4>
                <hr className='quote__divider'/>
                {/* <Divider className='quote__divider'/> */}
                <p className='quote__author'>{quote.author}</p>
                <RefreshIcon className='quote__refresh'/>
            </div>

        </div>
    )
}

export default Quote