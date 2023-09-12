import { useState, useEffect } from 'react';
import CourseCardIndex from '../../components/CourseCardIndex/CourseCardIndex'
import NewCourseCard from '../../components/NewCourseCard/NewCourseCard';
import { index, deleteOne } from '../../utilities/course-service';

export default function CourseIndex({user}) {
    const [courses, setCourses] = useState({})

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
        <div className="flex-ctr-ctr flex-col">
            <h1>Courses</h1>
            <div className="flex-ctr-ctr">
                <CourseCardIndex courses={courses} user={user} handleDelete={handleDelete} />
                {
                    user.role === 'O' &&
                    <div className="flex-ctr-start margin-2vh">
                        <NewCourseCard fetchCourses={fetchCourses} />
                    </div>
                }
            </div>
        </div>
    );
}