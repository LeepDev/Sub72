import { useState, useEffect } from 'react';
import { update, findOne, addUser, removeUser, addCourse, removeCourse } from '../../../utilities/tournaments-service';
import { index as cIndex } from '../../../utilities/courses-service';
import { index as uIndex } from '../../../utilities/users-service';
import { useParams } from 'react-router-dom';

export default function TournamentEdit() {
    const { id } = useParams()
    const [tournament, setTournament] = useState(null)
    const [courses, setCourses] = useState({})
    const [users, setUsers] = useState({})
    const [formData, setFormData] = useState({})
    
    function handleChange(evt) {
        setFormData({...formData, [evt.target.name]: evt.target.value});
    }
      
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const t = await update(id, formData);
            console.log(t)
            setTournament(t)
        } catch (err) {
            console.log(err);
        }
    }

    const fetchAll = async () => {
        try {
            const tournament = await findOne(id)
            await setAll(tournament)
        } catch (err) {
            console.log(err)
        }
    }

    const setAll = async (tournament) => {
        setTournament(tournament)
        if (tournament)
            setFormData({ "name": tournament.name, "rounds": tournament.rounds})
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
    }

    useEffect(() => {
        fetchAll()
    },[])

    const handleAddUser = debounce(async(uId) => {
        try {
            const t = await addUser(id, uId)
            await setAll(t)
        } catch (err) {
            console.log(err)
        }
    }, 300)
    
    const handleRemoveUser = debounce(async(uId) => {
        try {
            const t = await removeUser(id, uId)
            await setAll(t)
        } catch (err) {
            console.log(err)
        }
    }, 300)

    const handleAddCourse = debounce(async(cId) => {
        try {
            await addCourse(id, cId)
            fetchAll()
        } catch (err) {
            console.log(err)
        }
    }, 300)
    
    const handleRemoveCourse = debounce(async(cId) => {
        try {
            await removeCourse(id, cId)
            fetchAll()
        } catch (err) {
            console.log(err)
        }
    }, 300)

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
            
    return (
        <div className="flex-ctr-ctr flex-col">
            <h1>Edit Tournament</h1>
            { 
                tournament ? 
                <>
                    <div className="form-container flex-ctr-ctr">
                        <form method="POST" onSubmit={handleSubmit} autoComplete="off">
                            <label>Tournament Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            <label>Rounds:</label>
                            <input type="number" name="rounds" value={formData.rounds} onChange={handleChange} required />
                            <button type="submit" >Update</button>
                        </form>
                    </div>

                    <h3>{tournament.name}</h3>
                    <div>Rounds: {tournament.rounds}</div>
                </>
                :
                <div>Not Found</div> 
            }
            <h5>Players:</h5>
            <div className="flex-ctr-ctr">
                {
                    tournament && tournament.users.length > 0 ? 
                    <>
                        <ul>
                            {tournament.users.map(u => <li key={u._id}>{u.name}<button className='red' onClick={() => handleRemoveUser(u._id)}>Remove</button></li>)}
                        </ul>
                    </>
                    :
                    <p>No Players in tournament!</p>
                }
                &nbsp;
                {
                    users.length > 0 ? 
                    <>
                        <ul>
                            {users.map(u => <li key={u._id}>{u.name}<button onClick={() => handleAddUser(u._id)}>Add</button></li>)}
                        </ul>
                    </>
                    :
                    <p>No Players registered to the website!</p>
                }
            </div>
            <h5>Courses:</h5>
            <div className="flex-ctr-ctr">
                {
                    tournament && tournament.courses.length > 0 ? 
                    <>
                        <ul>
                            {tournament.courses.map(c => <li key={c._id}>{c.name}<button className='red' onClick={() => handleRemoveCourse(c._id)}>Remove</button></li>)}
                        </ul>
                    </>
                    :
                    <p>No courses in tournament!</p>
                }
                &nbsp;
                {
                    courses.length > 0 ? 
                    <>
                        <ul>
                            {courses.map(c => <li key={c._id}>{c.name}<button onClick={() => handleAddCourse(c._id)}>Add</button></li>)}
                        </ul>
                    </>
                    :
                    <p>Add more new courses!</p>
                }
            </div>
        </div>
    );
}