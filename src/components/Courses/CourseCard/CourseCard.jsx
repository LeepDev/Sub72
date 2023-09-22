import { useNavigate } from 'react-router-dom';

export default function CourseCard({ course, user, handleDelete }) {
    const navigate = useNavigate()

    function navigateToDetails(id) {
        navigate(`/courses/${id}`)
    }
    return (
        <div className="courseCard flex-ctr-ctr flex-col">
            <p><span>{course.name}</span></p>
            <div>Par: {course.parTotal}</div>
            <button onClick={() => navigateToDetails(course._id)}>Details</button>
            { 
                user.role && user.role === "O" &&
                <>
                    <button className='red' onClick={() => handleDelete(course._id)}>Delete</button>
                </>
            }
        </div>
    );
}