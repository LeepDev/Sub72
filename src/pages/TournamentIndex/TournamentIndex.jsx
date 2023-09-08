import { useState } from 'react';
import TournamentCard from '../../components/TournamentCard/TournamentCard'

const tournamentDB = [
    {"name": "GC Guardians", "courses": [{ "name": "Mount Prospect GC"}, { "name": "Buffalo Grove GC"}, { "name": "Buffalo Grove GC"}, { "name": "Buffalo Grove GC"}]},
    {"name": "Mount Prospectors", "courses": [{ "name": "Mount Prospect GC"}, { "name": "Buffalo Grove GC"}]}
]

export default function TournamentIndex() {
    const [tournaments, setTournaments] = useState(tournamentDB)

    return (
        <div className="flex-ctr-ctr flex-col">
            <h1>Tournaments</h1>
            { tournaments.length > 0 && 
                tournaments.map((t,idx) => 
                    <TournamentCard key={idx} tournament={t} /> 
                )
            }
        </div>
    );
}