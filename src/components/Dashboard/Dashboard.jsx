import { useContext, useEffect } from 'react'
import './Dashboard.scss';
import BarChart from '../BarChart/BarChart';
import { apiRequest } from '../../utils/axios';
import { useQuery, useQueryClient } from 'react-query';
import { AuthContext } from "../../context/authentication.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Dashboard({user_id}) {
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const { data: goalsData, isLoading, error, refetch } = useQuery(['goals', user_id], async () => {
        const response = await apiRequest.get(`/goals/userid?userId=${user_id}`);
        return response.data;
    });


    useEffect(() => {
        refetch(); 
    }, [refetch]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        toast.error('Error fetching goals data');
        return;
    }

    return (
        <div className='dashboard'>
            <ToastContainer />
            <div className="dashboard__subtitle">
                Goals by Category
            </div>

            <BarChart goalsData={goalsData} />

        </div>
    )
}

export default Dashboard