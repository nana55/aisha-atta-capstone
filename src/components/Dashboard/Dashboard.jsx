import { useContext, useEffect } from 'react'
import './Dashboard.scss';
import BarChart from '../BarChart/BarChart';
import { apiRequest } from '../../utils/axios';
import { useQuery, useQueryClient } from 'react-query';
import { AuthContext } from "../../context/authentication.jsx";


function Dashboard({user_id}) {
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const { data: goalsData, isLoading, error, refetch } = useQuery(['goals', user_id], async () => {
        //const response = await apiRequest.get(`/goals/user/${user_id}`);
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
        console.error('Error fetching goals data:', error);
        return <p>Error fetching goals data</p>;
    }

    return (
        <div className='dashboard'>
            <div className="dashboard__subtitle">
                Goals by Category
            </div>

            <BarChart goalsData={goalsData} />

        </div>
    )
}

export default Dashboard