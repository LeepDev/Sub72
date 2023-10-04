import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../../../utilities/tournaments-service';

export default function TournamentCard({ tournament, user, handleDelete, fetchTournaments, isMobile }) {
    const navigate = useNavigate()
    const [joined, setJoined] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false);
    const cardSize = "flex flex-col w-80 items-center justify-center p-6 m-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"

    async function checkJoined() {
        const players = tournament.users
        if (players) {
            let found = players.find(p => p._id === user._id)
            found ? setJoined(true) : setJoined(false)
        }
        else {
            setJoined(false)
        }
        setIsDisabled(false)
    }
    
    const handleJoin = async(tId) => {
        try {
            await addUser(tId, user._id)
            fetchTournaments()
            setJoined(true)
            setIsDisabled(false)
        } catch (err) {
            console.log(err)
        }
    }
    
    const handleLeave = async(tId) => {
        try {
            await removeUser(tId, user._id)
            fetchTournaments()
            setJoined(false)
            setIsDisabled(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        checkJoined()
    },[])

    return (
        <div className={isMobile ? cardSize : cardSize}>
           <h5 className='mb-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{tournament.name}{ tournament.live && <span className='dark:text-yellow-200 text-blue-500'> (LIVE)</span> }</h5>
            { 
                user.role && user.role === "O" &&
                <div>
                    <button className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900' disabled={isDisabled} onClick={() => navigate(`/tournaments/${tournament._id}/edit`)}>Edit</button>
                    <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' disabled={isDisabled} onClick={() => {setIsDisabled(true);handleDelete(tournament._id)}}>Delete</button>
                </div>
            }
            { 
                <div>
                    {
                        !tournament.live && (
                            joined ?
                            <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' disabled={isDisabled} onClick={() => {setIsDisabled(true);handleLeave(tournament._id)}}>Leave</button>
                            :
                            <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' disabled={isDisabled} onClick={() => {setIsDisabled(true);handleJoin(tournament._id)}}>Join</button>
                        )
                    }
                </div>
            }
            <p className='font-normal text-gray-700 dark:text-gray-400'>Rounds: {tournament.rounds}</p>
            <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>Courses</h5>
            {
                tournament.courses.length > 0 ? 
                <>
                    <ul>
                        {tournament.courses.map((c,idx) => <li className='font-normal text-gray-700 dark:text-gray-400' key={idx}>{c.name}</li>)}
                    </ul>
                </>
                :
                <p className='font-normal text-gray-700 dark:text-gray-400'>No Courses!</p>
                
            }
            <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>Players</h5>
            {
                tournament.users.length > 0 ? 
                
                <>
                    <ul>
                        {tournament.users.map((u,idx) => <li className='font-normal text-gray-700 dark:text-gray-400' key={idx}>{u.name}</li>)}
                    </ul>
                </>
                :
                <p className='font-normal text-gray-700 dark:text-gray-400'>No Players!</p>
                
            }
        </div>
    );
}