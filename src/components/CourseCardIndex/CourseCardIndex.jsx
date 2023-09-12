import CourseCard from '../CourseCard/CourseCard'

export default function CourseCardIndex({courses, user, handleDelete}) {


    return (
        <div className="flex-ctr-ctr flex-col">
            <div>
                { 
                    courses.length > 0 && 
                    courses.map((t,idx) => 
                        <CourseCard key={idx} course={t} user={user} handleDelete={handleDelete} /> 
                    )
                }
            </div>
        </div>
    );
}