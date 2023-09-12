import { useState, useEffect } from 'react';
import TournamentCardIndex from '../../components/TournamentCardIndex/TournamentCardIndex'
import NewTournamentCard from '../../components/NewTournamentCard/NewTournamentCard';
import {index} from '../../utilities/tournament-service';
import { deleteOne } from '../../utilities/tournament-service'

export default function TournamentIndex({user}) {
    const [tournaments, setTournaments] = useState({})

    const fetchTournaments = async () => {
        const tournaments = await index()
        setTournaments(tournaments)
    }

    async function handleDelete(id) {
        try {
            await deleteOne(id)
            fetchTournaments()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchTournaments()
    }, [])

    return (
        <div className="flex-ctr-ctr flex-col">
            <h1>Tournaments</h1>
            <div className="flex-ctr-ctr">
                <TournamentCardIndex tournaments={tournaments} user={user} handleDelete={handleDelete} />
                {
                    user.role === 'O' &&
                    <div className="flex-ctr-start margin-2vh">
                        <NewTournamentCard fetchTournaments={fetchTournaments} />
                    </div>
                }
            </div>
        </div>
    );
}