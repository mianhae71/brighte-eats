import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/Header';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Lazy-loaded components
const ReviewItemList = lazy(() => import('./components/ReviewItemList'));
const ReviewItemForm = lazy(() => import('./components/ReviewItemForm'));
const Thankyou = lazy(() => import('./components/Thankyou'));


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

// Loading component
const Loading = () => <div className="text-center p-8">Loading...</div>;

function App() {
  return (
		<ApolloProvider client={client}>
		  <Router>
			<div className="min-h-screen bg-gray-100">
			  <Header />
			  <main className="container mx-auto py-6">
				<Suspense fallback={<Loading />}>
				  <Routes>
					<Route path="/" element={<ReviewItemList />} />
					<Route path="/add" element={<ReviewItemForm />} />
					<Route path="/thanks/:name" element={<Thankyou />}/>
					<Route path="*" element={<div className="text-center p-8">Page not found</div>} />
				  </Routes>
				</Suspense>
			  </main>
			</div>
		  </Router>
		</ApolloProvider>
  );
}

export default App;