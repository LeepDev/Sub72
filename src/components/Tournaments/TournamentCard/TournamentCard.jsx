import { useState, useEffect } from 'react';
import './TournamentCard.css';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../../../utilities/tournaments-service';

export default function TournamentCard({ tournament, user, handleDelete, fetchTournaments }) {
    const navigate = useNavigate()
    const [joined, setJoined] = useState(false)

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
    }
    
    const handleJoin = debounce(async(tId) => {
        try {
            await addUser(tId, user._id)
            setJoined(true)
            fetchTournaments()
        } catch (err) {
            console.log(err)
        }
    }, 300)
    
    const handleLeave = debounce(async(tId) => {
        try {
            await removeUser(tId, user._id)
            setJoined(false)
            fetchTournaments()
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
                    <button onClick={() => navigateToEdit(tournament._id)}>Edit</button>
                    <button className='red' onClick={() => handleDelete(tournament._id)}>Delete</button>
                </div>
            }
            { 
                user.role && user.role === "P" && 
                <div>
                    {
                        joined ?
                        <button className='red' onClick={() => handleLeave(tournament._id)}>Leave</button>
                        :
                        <button onClick={() => handleJoin(tournament._id)}>Join</button>
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