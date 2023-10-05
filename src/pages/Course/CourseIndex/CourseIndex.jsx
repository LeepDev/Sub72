import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCardIndex from '../../../components/Courses/CourseCardIndex/CourseCardIndex'
import { index, deleteOne } from '../../../utilities/courses-service';

export default function CourseIndex({user, isMobile}) {
    const [courses, setCourses] = useState({})
    const navigate = useNavigate()

    const fetchCourses = async () => {
        const courses = await index()
        setCourses(courses)
    }

    async function handleDelete(id) {
        try {
            await deleteOne(id)
            fetchCourses()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <div className="flex items-center flex-col">
            <h1 className='text-3xl m-4 font-bold tracking-tight text-gray-900 dark:text-white'>Courses</h1>
            {
                user.role === 'O' &&
                <button onClick={() => navigate(`/courses/new`)} className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>Add Course</button>
            }
            <CourseCardIndex courses={courses} user={user} isMobile={isMobile} handleDelete={handleDelete} />
        </div>
    );
}