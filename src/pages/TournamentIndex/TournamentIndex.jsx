import { useState, useEffect } from 'react';
import TournamentCardIndex from '../../components/TournamentCardIndex/TournamentCardIndex'
import NewTournamentCard from '../../components/NewTournamentCard/NewTournamentCard';
import {index} from '../../utilities/tournament-service';

const tournamentDB = [
    {"name": "GC Guardians", "courses": [{ "name": "Mount Prospect GC"}, { "name": "Buffalo Grove GC"}, { "name": "Buffalo Grove GC"}, { "name": "Buffalo Grove GC"}]},
    {"name": "Mount Prospectors", "courses": [{ "name": "Mount Prospect GC"}]},
    {"name": "Mount Prospectors", "courses": [{ "name": "Mount Prospect GC"}, { "name": "Buffalo Grove GC"}, { "name": "Buffalo Grove GC"}]},
]

export default function TournamentIndex({user}) {
    const [tournaments, setTournaments] = useState(tournamentDB)

    const fetchTournaments = async () => {
        const tournaments = await index()
        setTournaments(tournaments)
    }

    useEffect(() => {
        fetchTournaments()
    }, [])

    return (
        <div className="flex-ctr-ctr flex-col">
            <h1>Tournaments</h1>
            <div className="flex-ctr-ctr">
                <TournamentCardIndex tournaments={tournaments} />
                {
                    user.role === 'O' &&
                    <div className="flex-ctr-ctr flex-col margin-2vh">
                        <NewTournamentCard />
                        <NewTournamentCard />
                    </div>
                }
            </div>
        </div>
    );
}