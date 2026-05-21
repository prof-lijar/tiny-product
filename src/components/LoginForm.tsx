'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto p-8 bg-white rounded shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
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
      <button type='submit' className='w-full bg-blue-500 text-white font-medium p-3 rounded hover:bg-blue-600'>Login</button>
    </form>
  );
};

export default LoginForm;
