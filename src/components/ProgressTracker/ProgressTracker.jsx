import { useEffect, useState } from 'react'
import './ProgressTracker.scss'
import { apiRequest } from "../../utils/axios.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProgressTracker({ goalId }) {
    const [progress, setProgress] = useState(10);

    useEffect(() => {
        fetchProgressFromDatabase();
    }, [goalId]);

    const fetchProgressFromDatabase = async () => {
        try {
            const response = await apiRequest.get('/progress');
            const goalProgress = response.data.find(item => item.goalId === goalId);
            setProgress(goalProgress ? goalProgress.progress : 10);
        } catch (error) {
            toast.error('Error fetching progress from the database');
        }
    };

    const updateProgress = async () => {
        try {
            const newPercentage = Math.min(progress + 10, 100);
            const response = await apiRequest.put('/progress', { percentage: newPercentage, goalId });
            setProgress(newPercentage);
        } catch (error) {
            toast.error('Error updating progress in the database');
        }
    };

    const resetProgress = async () => {
        try {
            const response = await apiRequest.put('/progress', { percentage: 0, goalId });
            setProgress(0);
        } catch (error) {
            toast.error('Error resetting progress in the database');
        }
    };

    return (
        <div className="progress-bar">
            <ToastContainer />
            <div className="progress-bar__container">
                <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
                <span className="progress-bar__percentage">{progress}%</span>
            </div>
            <div className="progress-bar__buttons">
                <button className="progress-bar__update" onClick={updateProgress}>Update</button>
                <button className="progress-bar__reset" onClick={resetProgress}>Reset</button>
            </div>
        </div>
    )
}

export default ProgressTracker