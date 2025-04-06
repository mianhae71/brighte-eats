import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SurveyPieChart = ({ data }) => {
  const pieData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: '# of Votes',
        data: Object.values(data),
        backgroundColor: ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#c084fc'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={pieData} />;
};

export default SurveyPieChart;