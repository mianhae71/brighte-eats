// src/pages/ThankYou.jsx
import { Link, useParams } from 'react-router-dom';

const ThankYou = () => {
  const { name } = useParams();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-24 px-8">
      <div className="bg-white shadow-lg rounded-3xl p-12 max-w-xl w-full text-center">
        <h1 className="text-3xl font-extrabold text-green-600 mb-6">
          Thank you {name} for submitting your expression!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Your response has been recorded successfully.
        </p>
        <Link to="/add">
          <button className="bg-blue-600 text-white text-lg px-8 py-3 rounded-xl hover:bg-blue-700 transition-all">
            Create Another Survey
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;