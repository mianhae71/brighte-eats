import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReviewProvider } from './context/ReviewContext';
import { Suspense, lazy } from 'react';
import Header from './components/Header';

// Lazy-loaded components
const ReviewItemList = lazy(() => import('./components/ReviewItemList'));
const ReviewItemForm = lazy(() => import('./components/ReviewItemForm'));
const ReviewItemDetail = lazy(() => import('./components/ReviewItemDetail'));

// Loading component
const Loading = () => <div className="text-center p-8">Loading...</div>;

function App() {
  return (
    <ReviewProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto py-6">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<ReviewItemList />} />
                <Route path="/add" element={<ReviewItemForm />} />
                <Route path="/edit/:id" element={<ReviewItemForm isEditing={true} />} />
                <Route path="/view/:id" element={<ReviewItemDetail />} />
                <Route path="*" element={<div className="text-center p-8">Page not found</div>} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </ReviewProvider>
  );
}

export default App;