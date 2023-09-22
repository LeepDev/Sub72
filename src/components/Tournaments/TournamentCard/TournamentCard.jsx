import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../../../utilities/tournaments-service';

export default function TournamentCard({ tournament, user, handleDelete, fetchTournaments }) {
    const navigate = useNavigate()
    const [joined, setJoined] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false);

    function navigateToEdit(id) {
        navigate(`/tournaments/${id}/edit`)
    }

    async function checkJoined() {
        const players = tournament.users
        if (players) {
            let found = players.find(p => p._id === user._id)
            found ? setJoined(true) : setJoined(false)
        }
        else
            setJoined(false)
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
        <div className="tournamentCard flex-ctr-ctr flex-col">
            <p><span>{tournament.name}</span></p>
            <p>Rounds: {tournament.rounds}</p>
            { 
                user.role && user.role === "O" &&
                <div>
                    <button disabled={isDisabled} onClick={() => navigateToEdit(tournament._id)}>Edit</button>
                    <button className='red' disabled={isDisabled} onClick={() => {setIsDisabled(true);handleDelete(tournament._id)}}>Delete</button>
                </div>
            }
            { 
                <div>
                    {
                        joined ?
                        <button className='red' disabled={isDisabled} onClick={() => {setIsDisabled(true);handleLeave(tournament._id)}}>Leave</button>
                        :
                        <button disabled={isDisabled} onClick={() => {setIsDisabled(true);handleJoin(tournament._id)}}>Join</button>
                    }
                </div>
            }
            <p><span>Courses</span></p>
            {
                tournament.courses.length > 0 ? 
                <>
                    <ul>
                        {tournament.courses.map((c,idx) => <li key={idx}>{c.name}</li>)}
                    </ul>
                </>
                :
                <p>No Courses!</p>
                
            }
            <p><span>Players</span></p>
            {
                tournament.users.length > 0 ? 
                
                <>
                    <ul>
                        {tournament.users.map((u,idx) => <li key={idx}>{u.name}</li>)}
                    </ul>
                </>
                :
                <p>No Players!</p>
                
            }
        </div>
    );
}