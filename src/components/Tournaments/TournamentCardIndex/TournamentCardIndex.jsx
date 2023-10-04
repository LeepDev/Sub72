import TournamentCard from '../TournamentCard/TournamentCard'

export default function TournamentCardIndex({tournaments, user, handleDelete, fetchTournaments, isMobile}) {


    return (
        <div className={ isMobile ? "flex flex-col" : "flex flex-row" }>
            { 
                tournaments.length > 0 && 
                tournaments.map((t,idx) => 
                    <TournamentCard fetchTournaments={fetchTournaments} key={idx} tournament={t} user={user} handleDelete={handleDelete} isMobile={isMobile} /> 
                )
            }
        </div>
    );
}