import './NewCourseCard.css';
import { useState } from "react";
import * as cService from '../../utilities/course-service';

export default function NewCourseCard({ fetchCourses }) {
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
        <div className='newCourseCard'>
            <p><span>New Course Form</span></p>
            <div className="form-container flex-ctr-ctr">
                <form method="POST" onSubmit={handleSubmit} autoComplete="off">
                    <label>Course Name:</label>
                    <input type="text" name="name" value={name} onChange={handleChange} required />
                    <button type="submit" >Save</button>
                </form>
            </div>
            
            <p className="error-message">&nbsp;{error}</p>
        </div>
    );
}