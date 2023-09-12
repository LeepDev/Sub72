import './TournamentCard.css';

export default function TournamentCard({ tournament, user, handleDelete }) {
    return (
        <div className="tournamentCard flex-ctr-ctr flex-col">
            <p><span>Name: {tournament.name}</span></p>
            { 
                user.role && user.role === "O" &&
                <button type="submit" onClick={() => handleDelete(tournament._id)}>X</button>
            }
            <div>Courses:</div>
            {
                tournament.courses ? 
                tournament.courses.map((c,idx) => <div key={idx}>{c.name}</div>)
                :
                <p>No Courses!</p>
            }
        </div>
    );
}