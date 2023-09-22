import { useState } from 'react';
import * as usersService from '../../../utilities/users-service';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div className='py-12'>
      <form autoComplete="off" onSubmit={handleSubmit} className='grid grid-cols-1 gap-6'>
        <label className='block'>
          <span className='text-gray-700'>Login Email</span>
          <input className='mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' type="text" name="email" placeholder="john@example.com" value={credentials.email} onChange={handleChange} required />
        </label>
        <label className='block'>
          <span className='text-gray-700'>Password</span>
          <input className='mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' type="password" name="password" placeholder="**********" value={credentials.password} onChange={handleChange} required />
        </label>
        <button type="submit">LOG IN</button>
      </form>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
