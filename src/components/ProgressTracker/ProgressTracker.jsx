import { useEffect, useState } from 'react'
import './ProgressTracker.scss'
import { apiRequest } from "../../utils/axios.jsx";

function ProgressTracker({ goalId }) {
    const [progress, setProgress] = useState(10);

    useEffect(() => {
        fetchProgressFromDatabase();
    }, [goalId]);

    const fetchProgressFromDatabase = async () => {
        console.log('Fetching progress...');
        try {
            const response = await apiRequest.get('/progress');
            const goalProgress = response.data.find(item => item.goalId === goalId);
            setProgress(goalProgress ? goalProgress.progress : 10);
        } catch (error) {
            console.error('Error fetching progress from the database:', error);
        }
    };

    const updateProgress = async () => {
        try {
            const newPercentage = Math.min(progress + 10, 100);
            const response = await apiRequest.put('/progress', { percentage: newPercentage, goalId });
            console.log('Server Response:', response.data);
            setProgress(newPercentage);
            console.log('Updated Progress:', newPercentage);
        } catch (error) {
            console.error('Error updating progress in the database:', error);
        }
    };

    const resetProgress = async () => {
        try {
            const response = await apiRequest.put('/progress', { percentage: 0, goalId });
            console.log('Server Response:', response.data);
            setProgress(0);
        } catch (error) {
            console.error('Error resetting progress in the database:', error);
        }
    };

    return (
        <div className="progress-bar">
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