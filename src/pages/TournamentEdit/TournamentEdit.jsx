import { useState, useEffect } from 'react';
import { findOne, addUser, removeUser, addCourse, removeCourse } from '../../utilities/tournaments-service';
import { index as cIndex } from '../../utilities/courses-service';
import { index as uIndex } from '../../utilities/users-service';
import { useParams } from 'react-router-dom';

export default function TournamentEdit() {
    const { id } = useParams()
    const [tournament, setTournament] = useState(null)
    const [courses, setCourses] = useState(null)
    const [users, setUsers] = useState(null)

    const fetchAll = async () => {
        try {
            const tournament = await findOne(id)
            setTournament(tournament)
            let courses = await cIndex()
            if (tournament && tournament.courses) {
                courses = courses.filter((c) => { return !tournament.courses.some((f) => f._id === c._id)})
            }
            setCourses(courses)
            let users = await uIndex()
            if (tournament && tournament.users) {
                users = users.filter((u) => { return !tournament.users.some((f) => f._id === u._id)})
            }
            setUsers(users)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAll()
    },[])

    async function handleAddUser(uId) {
        try {
            await addUser(id, uId)
            fetchAll()
        } catch (err) {
            console.log(err)
        }
    }
    
    async function handleRemoveUser(uId) {
        try {
            await removeUser(id, uId)
            fetchAll()
        } catch (err) {
            console.log(err)
        }
    }

    async function handleAddCourse(uId) {
        try {
            await addCourse(id, uId)
            fetchAll()
        } catch (err) {
            console.log(err)
        }
    }
    
    async function handleRemoveCourse(uId) {
        try {
            await removeCourse(id, uId)
            fetchAll()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex-ctr-ctr flex-col">
            <h1>Edit Tournament</h1>
            { 
                tournament ? 
                <h4>{tournament.name}</h4>
                :
                <div>Not Found</div> 
            }
            <div className="flex-ctr-ctr">
                {
                    tournament && tournament.users ? 
                    <>
                        <ul>
                            {tournament.users.map(u => <li key={u._id}>{u.name}<button className='red' onClick={() => handleRemoveUser(u._id)}>Remove</button></li>)}
                        </ul>
                    </>
                    :
                    <p>No Users!</p>
                }
                &nbsp;
                {
                    tournament && tournament.courses ? 
                    <>
                        <ul>
                            {tournament.courses.map(c => <li key={c._id}>{c.name}<button className='red' onClick={() => handleRemoveCourse(c._id)}>Remove</button></li>)}
                        </ul>
                    </>
                    :
                    <p>No courses!</p>
                }
            </div>
            <h5>To Add:</h5>
            <div className="flex-ctr-ctr">
                {
                    users ? 
                    <>
                        <ul>
                            {users.map(u => <li key={u._id}>{u.name}<button onClick={() => handleAddUser(u._id)}>Add</button></li>)}
                        </ul>
                    </>
                    :
                    <p>No Users!</p>
                }
                &nbsp;
                {
                    courses ? 
                    <>
                        <ul>
                            {courses.map(c => <li key={c._id}>{c.name}<button onClick={() => handleAddCourse(c._id)}>Add</button></li>)}
                        </ul>
                    </>
                    :
                    <p>No courses!</p>
                }
            </div>
        </div>
    );
}