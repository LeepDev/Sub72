import { useState, useEffect } from 'react';
import { findOne } from '../../../utilities/courses-service';
import { findByCourse } from '../../../utilities/tee-details-service';
import { useParams } from 'react-router-dom';

export default function TournamentEdit() {
    const { id } = useParams()
    const [course, setCourse] = useState(null)
    const [tees, setTees] = useState({})
    
    const fetchAll = async () => {
        try {
            const course = await findOne(id)
            setCourse(course)
            const tees = await findByCourse(id)
            setTees(tees)
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
                    <div>Par: {course.parTotal}</div>
                    <div>Par Out: {course.parOut}</div>
                    <div>Par In: {course.parIn}</div>
                </>
                :
                <div>Not Found</div> 
            }
            {
                tees.length > 0 && course.holePars && course.holeIndexes &&
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Hole</th>
                                <th>Par</th>
                                <th>Index</th>
                                {tees.map((t,idx) => <th key={idx}>{t.color}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (() => {
                                    const holes = [];
                                    for (let i = 1; i <= 18; i++) {
                                        holes.push(
                                        <tr key={i}>
                                            <td>{i}</td>
                                            <td>{course.holePars[i-1]}</td>
                                            <td>{course.holeIndexes[i-1]}</td>
                                            <td>{tees[0].holeDistances[i-1]}</td>
                                            <td>{tees[1].holeDistances[i-1]}</td>
                                            <td>{tees[2].holeDistances[i-1]}</td>
                                            <td>{tees[3].holeDistances[i-1]}</td>
                                        </tr>);
                                    }
                                    return holes;
                                })()
                            }
                            {
                                <tr>
                                    <td>Total:</td>
                                    <td>{course.parTotal}</td>
                                    <td></td>
                                    <td>{tees[0].distanceTotal}</td>
                                    <td>{tees[1].distanceTotal}</td>
                                    <td>{tees[2].distanceTotal}</td>
                                    <td>{tees[3].distanceTotal}</td>
                                </tr>
                            }
                            {
                                <tr>
                                    <td>Rating:</td>
                                    <td></td>
                                    <td></td>
                                    <td>{tees[0].rating}</td>
                                    <td>{tees[1].rating}</td>
                                    <td>{tees[2].rating}</td>
                                    <td>{tees[3].rating}</td>
                                </tr>
                            }
                            {
                                <tr>
                                    <td>Slope:</td>
                                    <td></td>
                                    <td></td>
                                    <td>{tees[0].slope}</td>
                                    <td>{tees[1].slope}</td>
                                    <td>{tees[2].slope}</td>
                                    <td>{tees[3].slope}</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </>
            }
        </div>
    );
}