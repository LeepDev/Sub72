import { useState } from 'react';
import TournamentCardIndex from '../../components/TournamentCardIndex/TournamentCardIndex'
import NewTournamentCard from '../../components/NewTournamentCard/NewTournamentCard';

const tournamentDB = [
    {"name": "GC Guardians", "courses": [{ "name": "Mount Prospect GC"}, { "name": "Buffalo Grove GC"}, { "name": "Buffalo Grove GC"}, { "name": "Buffalo Grove GC"}]},
    {"name": "Mount Prospectors", "courses": [{ "name": "Mount Prospect GC"}]},
    {"name": "Mount Prospectors", "courses": [{ "name": "Mount Prospect GC"}, { "name": "Buffalo Grove GC"}, { "name": "Buffalo Grove GC"}]},
]

export default function TournamentIndex({user}) {
    const [tournaments, setTournaments] = useState(tournamentDB)

    return (
        <div className="flex-ctr-ctr flex-col">
            <h1>Tournaments</h1>
            <div className="flex-ctr-ctr">
                <TournamentCardIndex tournaments={tournaments} />
                {
                    user.role === 'O' &&
                    <NewTournamentCard />
                }
            </div>
        </div>
    );
}