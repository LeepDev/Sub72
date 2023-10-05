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
    const [isDisabled, setIsDisabled] = useState(false);
    
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


    const setAll = async (tournament) => {
        setTournament(tournament)
        if (tournament)
            setFormData({ "name": tournament.name, "rounds": tournament.rounds, "live": tournament.live })
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
        setIsDisabled(false)
    }

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const tournament = await findOne(id)
                await setAll(tournament)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAll()
    },[])

    const handleAddUser = async(uId) => {
        try {
            const t = await addUser(id, uId)
            await setAll(t)
        } catch (err) {
            console.log(err)
        }
    }
    
    const handleRemoveUser = async(uId) => {
        try {
            const t = await removeUser(id, uId)
            await setAll(t)
        } catch (err) {
            console.log(err)
        }
    }

    const handleAddCourse = async(cId) => {
        try {
            const t = await addCourse(id, cId)
            await setAll(t)
        } catch (err) {
            console.log(err)
        }
    }
    
    const handleRemoveCourse = async(cId) => {
        try {
            const t = await removeCourse(id, cId)            
            await setAll(t)
        } catch (err) {
            console.log(err)
        }
    }
            
    return (
        <div className="flex items-center justify-center flex-col py-12">
            <h1 className='text-3xl m-4 font-bold tracking-tight text-gray-900 dark:text-white'>Edit Tournament</h1>
            { 
                tournament ? 
                <>
                    <div className="block w-80 p-6 m-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <form className='grid grid-cols-1 gap-6' method="POST" onSubmit={handleSubmit} autoComplete="off">
                        <div className='block'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input placeholder="John Smith" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className='block'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rounds</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="name" value={formData.rounds} onChange={handleChange} required />
                        </div>
                        <div class="flex items-center mb-4">
                            <input  type="checkbox" checked={formData.live} onChange={() => setFormData({...formData, ["live"]: !formData.live })} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Live</label>
                        </div>
                        <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" type="submit">Update</button>
                        </form>
                    </div>
                    <h3 className='text-xl m-4 font-bold tracking-tight text-gray-900 dark:text-white'>{tournament.name}{ tournament.live && <span className='dark:text-yellow-200 text-blue-500'> (LIVE)</span> }</h3>
                    <div className='tracking-tight text-gray-900 dark:text-white'>Rounds: {tournament.rounds}</div>
                </>
                :
                <div className='tracking-tight text-gray-900 dark:text-white'>Not Found</div> 
            }
            <h5 className='text-xl m-4 font-bold tracking-tight text-gray-900 dark:text-white'>Players:</h5>
            <div className="flex flex-row">
                {
                    tournament && tournament.users.length > 0 ? 
                    <>
                        <ul>
                            {tournament.users.map(u => <li key={u._id}><button className='ml-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' disabled={isDisabled} onClick={() => {setIsDisabled(true); handleRemoveUser(u._id)}}>{u.name}</button></li>)}
                        </ul>

                    </>
                    :
                    <p className='tracking-tight text-gray-900 dark:text-white'>No Players in tournament!</p>
                }
                &nbsp;
                {
                    users.length > 0 ? 
                    <>
                        <ul>
                            {users.map(u => <li key={u._id}><button className='ml-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' disabled={isDisabled} onClick={() => {setIsDisabled(true); handleAddUser(u._id)}}>{u.name}</button></li>)}
                        </ul>
                    </>
                    :
                    <p className='tracking-tight text-gray-900 dark:text-white'>No more players available!</p>
                }
            </div>
            <h5 className='text-xl m-4 font-bold tracking-tight text-gray-900 dark:text-white'>Courses:</h5>
            <div className="flex flex-row">
                {
                    tournament && tournament.courses.length > 0 ? 
                    <>
                        <ul>
                            {tournament.courses.map(c => <li key={c._id}><button disabled={isDisabled} className='ml-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={() => {setIsDisabled(true);handleRemoveCourse(c._id)}}>{c.name}</button></li>)}
                        </ul>
                    </>
                    :
                    <p className='tracking-tight text-gray-900 dark:text-white'>No courses in tournament!</p>
                }
                &nbsp;
                {
                    courses.length > 0 ? 
                    <>
                        <ul>
                            {courses.map(c => <li key={c._id}><button className='ml-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' disabled={isDisabled} onClick={() => {setIsDisabled(true);handleAddCourse(c._id)}}>{c.name}</button></li>)}
                        </ul>
                    </>
                    :
                    <p className='tracking-tight text-gray-900 dark:text-white'>Add more new courses!</p>
                }
            </div>
        </div>
    );
}