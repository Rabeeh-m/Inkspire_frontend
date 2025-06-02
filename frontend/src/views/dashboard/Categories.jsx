import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import Toast from '../../plugin/Toast';
import Swal from 'sweetalert2';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '' });
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiInstance.get('post/category/list/');
      setCategories(response.data);
      setLoading(false);
    } catch (err) {
      Toast('error', 'Failed to fetch categories');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      Toast('error', 'Category title is required.');
      return;
    }

    setLoading(true);
    const data = { title: formData.title };

    try {
      if (editingCategory) {
        const response = await apiInstance.put(`post/category/${editingCategory.id}/`, data);
        setCategories(categories.map(cat => cat.id === editingCategory.id ? response.data.data : cat));
        Toast('success', 'Category updated successfully');
      } else {
        const response = await apiInstance.post('post/category/create/', data);
        setCategories([...categories, response.data.data]);
        Toast('success', 'Category created successfully');
      }
      setFormData({ title: '' });
      setEditingCategory(null);
      setLoading(false);
    } catch (err) {
      Toast('error', err.response?.data?.title || 'Failed to save category');
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ title: category.title });
  };

  const handleDelete = async (categoryId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await apiInstance.delete(`post/category/${categoryId}/`);
        setCategories(categories.filter(cat => cat.id !== categoryId));
        Toast('success', 'Category deleted successfully');
        setLoading(false);
      } catch (err) {
        Toast('error', 'Failed to delete category');
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-black to-purple-800 text-white p-6 rounded-lg mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Manage Categories</h1>
                <p className="text-sm">Create, edit, or delete blog categories.</p>
              </div>
              <div>
                <Link
                  to="/dashboard/"
                  className="btn bg-white text-blue-600 font-semibold py-2 px-4 rounded"
                >
                  <i className="fas fa-arrow-left mr-2"></i> Back to Dashboard
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingCategory ? 'Edit Category' : 'Create Category'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category Title</label>
                <input
                  onChange={handleInputChange}
                  name="title"
                  type="text"
                  value={formData.title}
                  className="mt-2 block w-full h-10 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className={`flex-1 py-3 px-4 rounded-lg text-white font-semibold ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : (editingCategory ? 'Update Category' : 'Create Category')}
                </button>
                {editingCategory && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCategory(null);
                      setFormData({ title: '' });
                    }}
                    className="flex-1 py-3 px-4 rounded-lg bg-gray-500 text-white font-semibold hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {loading ? (
            <p className="text-center text-gray-600">Loading categories...</p>
          ) : (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Category List</h2>
              {categories.length === 0 ? (
                <p className="text-center text-gray-600">No categories found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map(category => (
                    <div key={category.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold">{category.title}</h3>
                      <p className="text-gray-600">Posts: {category.post_count}</p>
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Categories;