// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   const fetchProducts = async () => {
//     const res = await fetch("http://localhost:3000/");
//     const data = await res.json();
//     setProducts(data);
//   };

//   const deleteProduct = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete?");
//     if (!confirmDelete) return;

//     await fetch(`http://localhost:3000/delete/${id}`, {
//       credentials: "include",
//       method: "DELETE",
//     });
//     alert("Product deleted");
//     fetchProducts();
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="p-6 max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {products.map((p) => (
//         <div
//           key={p._id}
//           className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-200"
//         >
//            {p.isBestSelling && (
//       <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow z-50 flex items-center gap-1">
//         🔥 Best Seller
//       </div>
//     )}

//            <img
//               src={p.image}
//               alt={p.name}
//               className="w-[300px] h-[160px] object-cover rounded"
//             />
//           <div className="p-4 flex flex-col justify-between h-[180px]">
//             <Link to={`/product/${p._id}`}>
//               <h2 className="text-xl font-semibold text-blue-600 hover:underline mb-1">
//                 {p.name}
//               </h2>
//             </Link>
//             <p className="text-gray-700 text-sm">{p.description}</p>
//             <p className="text-sm text-gray-500 mt-1">
//               {p.category} | ₹{p.price}
//             </p>
//             <div className="mt-3 flex justify-between">
//               <button
//                 onClick={() => navigate(`/edit/${p._id}`)}
//                 className="bg-yellow-400 px-3 py-1 rounded"
//               >
//                 Update
//               </button>
//               <button
//                 onClick={() => deleteProduct(p._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ProductList;
