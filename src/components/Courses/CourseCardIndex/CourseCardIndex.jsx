import CourseCard from '../CourseCard/CourseCard'

export default function CourseCardIndex({courses, user, handleDelete, isMobile}) {


    return (
        <div className={ isMobile ? "flex flex-col" : "flex flex-row" }>
            { 
                courses.length > 0 && 
                courses.map((t,idx) => 
                    <CourseCard key={idx} course={t} user={user} handleDelete={handleDelete} isMobile={isMobile} /> 
                )
            }
        </div>
    );
}