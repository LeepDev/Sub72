import { useState, useEffect } from 'react';
import { findOne } from '../../../utilities/courses-service';
import { findByCourse } from '../../../utilities/tee-details-service';
import { useParams } from 'react-router-dom';

export default function CourseDetails({isMobile}) {
    const { id } = useParams()
    const [course, setCourse] = useState(null)
    const [tees, setTees] = useState({})
    const cardSizeMobile = "flex flex-col w-80 items-center p-6 m-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    const cardSize = "flex flex-col w-96 items-center p-6 m-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"

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
        <div className="flex items-center flex-col">
            <div className={isMobile ? cardSizeMobile : cardSize}>

                { 
                    course ? 
                    <>
                        <h3 className='mt-10 mb-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{course.name}</h3>
                        <div className='font-normal text-gray-700 dark:text-gray-400'>Par: {course.parTotal}</div>
                        <div className='font-normal text-gray-700 dark:text-gray-400'>Par Out: {course.parOut}</div>
                        <div className='font-normal text-gray-700 dark:text-gray-400'>Par In: {course.parIn}</div>
                    </>
                    :
                    <div className='font-normal text-gray-700 dark:text-gray-400'>Not Found</div> 
                }
                {
                    tees.length > 0 && course.holePars && course.holeIndexes &&
                    <>
                        <table className='mt-10'>
                            <thead>
                                <tr className='font-normal text-gray-700 dark:text-gray-400'>
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
                                            <tr className='font-normal text-gray-700 dark:text-gray-400' key={i}>
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
                                    <tr className='font-normal text-gray-700 dark:text-gray-400'>
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
                                    <tr className='font-normal text-gray-700 dark:text-gray-400'>
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
                                    <tr className='font-normal text-gray-700 dark:text-gray-400'>
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
        </div>
    );
}