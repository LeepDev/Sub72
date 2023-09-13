import './TournamentCard.css';
import { useNavigate } from 'react-router-dom';

export default function TournamentCard({ tournament, user, handleDelete }) {
    const navigate = useNavigate()

    function navigateToEdit(id) {
        navigate(`/tournaments/${id}/edit`)
    }

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
            <div>---Courses---</div>
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
            <div>---Players---</div>
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