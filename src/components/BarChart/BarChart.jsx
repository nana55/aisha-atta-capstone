import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS} from "chart.js/auto";

function BarChart({ goalsData }) {
  const categoryCounts = goalsData.reduce((counts, goal) => {
    const { category } = goal;
    counts[category] = (counts[category] || 0) + 1;
    return counts;
  }, {});



  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: 'Number of Goals',
        data: Object.values(categoryCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
export default BarChart;