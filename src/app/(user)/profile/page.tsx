import React, { useState } from 'react';
import { useUser } from '@/lib/hooks/useUser';

const UserProfilePage = () => {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await updateUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <main className='min-h-screen bg-gray-100 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-4'>User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className='mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className='mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <button
            type='button'
            onClick={() => setIsEditing(!isEditing)}
            className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          {isEditing && (
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              Save
            </button>
          )}
        </form>
      </div>
    </main>
  );
};

export default UserProfilePage;
