import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: null, // must be a File object
    description: '',
    isBestSelling: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value // handle file vs text input
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('category', form.category);
    formData.append('description', form.description);
    formData.append('isBestSelling', form.isBestSelling);
    formData.append('image', form.image); // append the file

    try {
      const res = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (res.ok) {
        navigate('/');
      } else {
        alert("Upload failed. Please contact the owner.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10 border border-gray-200">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Upload Product</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          name="isBestSelling"
          value={form.isBestSelling}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Is Best Selling?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadProduct;
