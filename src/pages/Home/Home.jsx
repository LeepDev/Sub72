import { useState, useEffect } from 'react';
import { index } from '../../utilities/tournaments-service';
import TournamentCardIndex from '../../components/Tournaments/TournamentCardIndex/TournamentCardIndex';

export default function Home({user}) {
    const [liveT, setLiveT] = useState({})

    const fetchTournaments = async () => {
        const tournaments = await index()
        const liveT = tournaments.filter(t => t.live === true)
        setLiveT(liveT)
    }

    useEffect(() => {
        fetchTournaments()
    }, [])

    return (
        <div className="flex-ctr-ctr flex-col">
            <h1>Current Live Tournaments</h1>
            <div className="flex-ctr-ctr">
                <TournamentCardIndex fetchTournaments={fetchTournaments} tournaments={liveT} user={user} />
            </div>
        </div>
    );
}