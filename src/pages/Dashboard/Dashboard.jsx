import { useState, useEffect } from 'react';
import { index } from '../../utilities/tournaments-service';
import TournamentCardIndex from '../../components/Tournaments/TournamentCardIndex/TournamentCardIndex';

export default function Dashboard({user, isMobile}) {
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
        <div className="flex items-center flex-col">
            <h1 className='text-3xl m-4 font-bold tracking-tight text-gray-900 dark:text-white'>Current Live Tournaments</h1>
            <TournamentCardIndex fetchTournaments={fetchTournaments} tournaments={liveT} user={user} isMobile={isMobile} />
        </div>
    );
}