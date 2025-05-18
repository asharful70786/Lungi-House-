import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    isBestSelling: "",
  });

  useEffect(() => {
    fetch(`https://lungi-house.onrender.com/get/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(`https://lungi-house.onrender.com/update/${id}`, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    let data = await response.json();
    alert(data.message);
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10 border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />

        <select
          name="isBestSelling"
          value={formData.isBestSelling}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Is Best Selling?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <input
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <textarea
          className="w-full border border-gray-300 px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ProductEdit;
