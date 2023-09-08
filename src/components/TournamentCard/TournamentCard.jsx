import './TournamentCard.css';

export default function TournamentCard({ tournament }) {
    return (
        <div className="tournamentCard flex-ctr-ctr flex-col">
            <p><span>Name: {tournament.name}</span></p>
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