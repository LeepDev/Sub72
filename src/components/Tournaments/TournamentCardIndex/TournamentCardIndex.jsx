import TournamentCard from '../TournamentCard/TournamentCard'

export default function TournamentCardIndex({tournaments, user, handleDelete, fetchTournaments}) {


    return (
        <div className="flex-ctr-ctr flex-col">
            <div>
                { 
                    tournaments.length > 0 && 
                    tournaments.map((t,idx) => 
                        <TournamentCard fetchTournaments={fetchTournaments} key={idx} tournament={t} user={user} handleDelete={handleDelete} /> 
                    )
                }
            </div>
        </div>
    );
}