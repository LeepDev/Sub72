import TournamentCard from '../TournamentCard/TournamentCard'

export default function TournamentCardIndex({tournaments}) {
    return (
        <div className="flex-ctr-ctr flex-col tournamentCardIndex">
            <div>
                { 
                    tournaments.length > 0 && 
                    tournaments.map((t,idx) => 
                        <TournamentCard key={idx} tournament={t} /> 
                    )
                }
            </div>
        </div>
    );
}