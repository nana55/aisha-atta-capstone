import './Quote.scss';
import { useEffect, useState } from 'react';
import axios from "axios";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import RefreshIcon from '@mui/icons-material/Refresh';


function Quote() {

    const [quote, setQuote] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const URL_PATH = "https://api.quotable.io/random?maxLength=100&tags=%22inspirational%22%7C+%22wisdom%22";

    const fetchQuote = async () => {
        try {
            setIsLoading(true);
            const result = await axios.get(URL_PATH);
            setQuote(result.data);
        } catch (err) {
            console.error("Error fetching quote: ", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = (e) => {
        e.preventDefault();
        fetchQuote();
    }

    useEffect(() => {
        fetchQuote();
    }, []); // Fetch quote on mount

    return (
        <div className='quote'>
            <div className={`quote__container ${isLoading ? 'loading' : ''}`}>
                <FormatQuoteIcon className='quote__icon' />
                <h4 className='quote__quote'>{quote.content}</h4>
                <hr className='quote__divider' />
                <p className='quote__author'>{quote.author}</p>
                <RefreshIcon className='quote__refresh' onClick={handleRefresh} />
            </div>

        </div>
    )
}

export default Quote