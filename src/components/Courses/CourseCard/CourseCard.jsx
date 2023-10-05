import { useNavigate } from 'react-router-dom';

export default function CourseCard({ course, user, handleDelete, isMobile }) {
    const navigate = useNavigate()
    const cardSizeMobile = "flex flex-col w-80 items-center p-6 m-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    const cardSize = "flex flex-col w-96 items-center p-6 m-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"

    function navigateToDetails(id) {
        navigate(`/courses/${id}`)
    }
    return (
        <div className={isMobile ? cardSizeMobile : cardSize}>
            <h5 className='mb-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{course.name}</h5>
            <div className='m-2 font-normal text-gray-700 dark:text-gray-400'>Par: {course.parTotal}</div>
            <button className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:focus:ring-yellow-900' onClick={() => navigateToDetails(course._id)}>Details</button>
            { 
                user.role && user.role === "O" &&
                <>
                    <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={() => handleDelete(course._id)}>Delete</button>
                </>
            }
        </div>
    );
}