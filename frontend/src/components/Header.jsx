import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Brighte Eats </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:underline">Dashboard</Link></li>
            <li><Link to="/add" className="hover:underline">Submit Interest</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;