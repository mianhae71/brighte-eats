// src/components/ReviewItemList.jsx
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';
import SurveyPieChart from './SurveyPieChart';

const GET_POSTS = gql`
  query GetBooks {
	books {
	  id,
	  name,
	  services
	}
  }
`;

const ReviewItemList = () => {

	const { loading2, error2, data } = useQuery(GET_POSTS);
	const [bookCount, setBookCount] = useState(0); // State to hold book count
	const [talliedBooks, setTalliedBooks] = useState([]);  // State to hold processed data
	const [delivery, setDelivery] = useState(0);  // State to hold processed data
	const [pickup, setPickup] = useState(0);  // State to hold processed data
	const [payment, setPayment] = useState(0);  // State to hold processed data
	const [ piedata,setPiedata] = useState({'Delivery':0,'Pick-up':0,'Payment':0})
	
	const sampleData = {
	  'Web Design': 10,
	  'SEO': 15,
	  'Marketing': 5,
	  'Hosting': 8,
	  'Others': 2,
	};
  
  // Tally or process data before rendering
  useEffect(() => {
    if (data && data.books) {
      // Count books
      setBookCount(data.books.length);
      
      // You can modify the books data if needed, here I'm just setting it as is
      setTalliedBooks(data.books);
		
		let deliverycount =0;
		let pickupcount = 0;
		let paymentcount = 0;
		
		console.log(data.books)
		// Example: Loop over books and add a new field (e.g., name length)
		for (const book of data.books) {
			console.log(book.services + 'book')
		  if (book.services === 'DELIVERY'){
			  deliverycount += 1;
		  }
		  
			if (book.services === 'PICKUP'){
				pickupcount += 1;
			}

			if (book.services === 'PAYMENT'){
			  paymentcount += 1;
			  }
		}
		
		setDelivery(deliverycount);
		setPayment(paymentcount);
		setPickup(pickupcount);
		
		const currentPiedata = {
		  'Delivery':deliverycount,
			'Pick-up':paymentcount,
			'Payment':pickupcount
		};
		
		setPiedata(currentPiedata);
    }
  }, [data]);  // Run the effect when `data` changes
	
	
  if (loading2) return <p>Loading2...</p>;
  if (error2) return <p>Error2: {error2.message}</p>;
  if (!data || !data.books) return <div>No data available</div>;
	
  return (
    <div className="container mx-auto p-4">
		  
		  {/* Widgets Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        
		 <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Expressions</h3>
            <p className="text-2xl">{bookCount}</p>
          </div>
		  <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Delivery</h3>
            <p className="text-2xl">{delivery}</p>
          </div>
		  <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Pick-up</h3>
            <p className="text-2xl">{pickup}</p>
          </div>
		  <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Payment</h3>
            <p className="text-2xl">{payment}</p>
          </div>
		  <div className="flex justify-center items-center h-64">
		  
		</div>
		  
		  <div className="w-128 h-128">
			<SurveyPieChart data={piedata} />
		  </div>
		  
		  
      </div>
    </div>
  );
};

export default ReviewItemList;