import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Banknote, ShoppingCart, PackageOpen } from 'lucide-react';

const ADD_LEAD = gql`
  mutation AddLead(
    $name: String!, 
    $email: String!, 
    $mobile: String!, 
    $postcode: String!, 
    $services: String!
  ) {
    register(
      name: $name, 
      email: $email,
      mobile: $mobile,
      postcode: $postcode,
      services: $services
    ) {
      id
      name
      email
      mobile
      postcode
      services
    }
  }
`;

const ReviewItemForm = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [postcode, setPostcode] = useState('');
  const [services, setServices] = useState('');
  const [addLead, { data, loading, error }] = useMutation(ADD_LEAD);
	const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
	
	  // Clear any previous error message
    	setErrorMessage('');
	  
	// Validate all fields
	if (!name || !email || !mobile || !postcode || !services) {
		setErrorMessage('Please fill in all fields before submitting.');
		return;
	}
	  
    addLead({ variables: { name, email, mobile, postcode, services } });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">Brighte Eats - Express Your Interest</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error.message}</div>}
		{errorMessage && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}  
      <form onSubmit={handleSubmit} className="space-y-5  	">
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-900">Full Name:</label>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-900">Email Address:</label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-900">Mobile Number:</label>
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-900">Postal Code:</label>
          <input
            type="text"
            placeholder="Postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <p className="text-lg font-medium mb-2 text-gray-900">Which Brighte Eats Service Are You Interested In?</p>
          <div className="grid grid-cols-3 gap-6 text-center ">
            <div
              onClick={() => setServices('DELIVERY')}
              className={`cursor-pointer border-gray-300 border p-6 rounded-lg hover:bg-blue-50 transition-all duration-200 ease-in-out ${
                services === 'DELIVERY' ? 'bg-blue-100' : ''
              }`}
            >
              <PackageOpen className="mx-auto mb-2 w-8 h-8 text-blue-600" />
              <span className="text-sm font-medium">Brighte Eats Delivery</span>
            </div>

            <div
              onClick={() => setServices('PICKUP')}
              className={`cursor-pointer border-gray-300 border p-6 rounded-lg hover:bg-green-50 transition-all duration-200 ease-in-out ${
                services === 'PICKUP' ? 'bg-green-100' : ''
              }`}
            >
              <ShoppingCart className="mx-auto mb-2 w-8 h-8 text-green-600" />
              <span className="text-sm font-medium">Brighte Eats Pick-up</span>
            </div>

            <div
              onClick={() => setServices('PAYMENT')}
              className={`cursor-pointer border-gray-300 border p-6 rounded-lg hover:bg-purple-50 transition-all duration-200 ease-in-out ${
                services === 'PAYMENT' ? 'bg-purple-100' : ''
              }`}
            >
              <Banknote className="mx-auto mb-2 w-8 h-8 text-purple-600" />
              <span className="text-sm font-medium">Brighte Eats Payment</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            {loading ? 'Submitting...' : 'Submit My Interest'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel Submission
          </button>
        </div>

        {data && <p className="text-green-500 mt-4">Post created: {data.addLead.name}</p>}
      </form>
    </div>
  );
};

export default ReviewItemForm;
