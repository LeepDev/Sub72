import { useState, useEffect } from 'react';
import { findOne } from '../../utilities/courses-service';
// import { findByCourse } from '../../utilities/tee-details-service';
import { useParams } from 'react-router-dom';

export default function TournamentEdit() {
    const { id } = useParams()
    const [course, setCourse] = useState(null)
    const [tees, setTees] = useState({})
    
    const fetchAll = async () => {
        try {
            const course = await findOne(id)
            setCourse(course)
            // const tees = await findByCourse(id)
            // setTeeDetails(tees)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAll()
    },[])

    return (
        <div className="flex-ctr-ctr flex-col">
            { 
                course ? 
                <>
                    <h3>{course.name}</h3>
                    <h5>Par: {course.parTotal}</h5>
                    <h5>Par Out: {course.parOut}</h5>
                    <h5>Par In: {course.parIn}</h5>
                </>
                :
                <div>Not Found</div> 
            }
            <h5>Tees:</h5>
            {/* <div className="flex-ctr-ctr">
                {
                    teeDetails && tournament.users.length > 0 ? 
                    <>
                        <ul>
                            {tournament.users.map(u => <li key={u._id}>{u.name}<button className='red' onClick={() => handleRemoveUser(u._id)}>Remove</button></li>)}
                        </ul>
                    </>
                    :
                    <p>No Players in tournament!</p>
                }
            </div> */}
        </div>
    );
}