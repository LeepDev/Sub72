import './CourseCard.css';

export default function CourseCard({ course, user, handleDelete }) {
    return (
        <div className="courseCard flex-ctr-ctr flex-col">
            <p><span>Name: {course.name}</span></p>
            { 
                user.role && user.role === "O" &&
                <button className='red' onClick={() => handleDelete(course._id)}>Delete</button>
            }
        </div>
    );
}