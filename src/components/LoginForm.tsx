'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.login({ email, password });
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto p-8 bg-white rounded shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
      {error && (
        <div className='mb-4 p-3 bg-red-100 text-red-600 rounded text-sm'>
          {error}
        </div>
      )}
      <div className='mb-4'>
        <label htmlFor='email' className='block text-gray-700 font-medium mb-2'>Email</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-3 border rounded focus:outline-none focus:border-blue-500'
          required
        />
      </div>
      <div className='mb-6'>
        <label htmlFor='password' className='block text-gray-700 font-medium mb-2'>Password</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-3 border rounded focus:outline-none focus:border-blue-500'
          required
        />
      </div>
      <button 
        type='submit' 
        disabled={loading}
        className='w-full bg-blue-500 text-white font-medium p-3 rounded hover:bg-blue-600 disabled:bg-blue-300'
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <div className='mt-4 text-center text-sm text-gray-600'>
        Don&apos;t have an account? <a href='/auth/register' className='text-blue-500 hover:underline'>Register here</a>
      </div>
    </form>
  );
};

export default LoginForm;
