import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './App.css';
import Loading from './Loading';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetch('https://api.ashraful.in')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
          {isLoggedIn && (
            <Link
              to="/upload"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow"
            >
              + Add Product
            </Link>
          )}
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">No products available right now.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {products.map(product => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1"
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                

                <div className="p-3 flex flex-col justify-between h-full text-sm">
                  <div>
                    <h2 className="font-semibold text-gray-800 truncate">{product.name}</h2>
                    <p className="text-red-600 font-medium mt-1">₹{product.price}</p>
                    <p className="text-gray-500 text-xs line-clamp-2 mt-1">{product.description}</p>
                  </div>

                  
                </div>
                 </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
