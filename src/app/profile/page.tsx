'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/auth';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await authApi.getProfile();
        setName(userData.name || '');
        setEmail(userData.email);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile';
        setError(errorMessage);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const updatedUser = await authApi.updateProfile({ name, email });
      setName(updatedUser.name || '');
      setEmail(updatedUser.email);
      alert('Profile updated successfully!');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      setError('');
      await authApi.logout();
      router.push('/auth/login');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to logout';
      setError(errorMessage);
    }
  };

  return (
    <main className='min-h-screen bg-gray-50 py-12 px-4'>
      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8'>
        <h1 className='text-3xl font-bold mb-8 text-center'>User Profile</h1>
        
        {error && (
          <div className='mb-6 p-3 bg-red-100 text-red-600 rounded text-sm'>
            {error}
          </div>
        )}

        {loading ? (
          <div className='text-center py-12'>
            <p className='text-gray-500'>Loading profile...</p>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full p-3 border rounded focus:outline-none focus:border-blue-500'
                placeholder='John Doe'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-3 border rounded focus:outline-none focus:border-blue-500'
                placeholder='john@example.com'
              />
            </div>
            
            <div className='flex items-center justify-between pt-6 border-t'>
              <button
                type='submit'
                disabled={saving}
                className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors'
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type='button'
                onClick={handleLogout}
                className='text-red-500 hover:text-red-700 font-medium transition-colors'
              >
                Logout
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
