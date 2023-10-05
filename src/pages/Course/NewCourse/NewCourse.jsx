import { useState } from "react";
import * as cService from '../../../utilities/courses-service';

export default function NewCourse({ fetchCourses }) {
    const [name, setName] = useState('')
    const [error, setError] = useState('');
    
    function handleChange(evt) {
        setName(evt.target.value);
        setError('');
    }
    
    async function handleSubmit(evt) {
      evt.preventDefault();
      try {
        await cService.create(name);
        setName('')
        fetchCourses()
      } catch (err) {
        console.log(err);
      }
    }

    return (
      <div className="flex items-center justify-center flex-col py-12">
        <div className="block w-80 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h1 className='text-3xl m-4 font-bold tracking-tight text-gray-900 dark:text-white'>New Course Form</h1>
          <form method="POST" onSubmit={handleSubmit} autoComplete="off" className='grid grid-cols-1 gap-6'>
            <div className='block'>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="name" value={name} onChange={handleChange} required />
            </div>
            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" type="submit">Save</button>
          </form>
            
            <p className="error-message">&nbsp;{error}</p>
        </div>
      </div>
    );
}