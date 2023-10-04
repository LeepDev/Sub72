import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { index, deleteOne } from '../../../utilities/tournaments-service';
import TournamentCardIndex from '../../../components/Tournaments/TournamentCardIndex/TournamentCardIndex';

export default function TournamentIndex({user, isMobile}) {
    const [tournaments, setTournaments] = useState({})
    const navigate = useNavigate()

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
        <div className="flex items-center flex-col">
            <h1 className='text-3xl m-4 font-bold tracking-tight text-gray-900 dark:text-white'>Tournaments</h1>
            {
                user.role === 'O' &&
                <button onClick={() => navigate(`/tournaments/new`)} className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>Add Tournament</button>
            }
            <TournamentCardIndex fetchTournaments={fetchTournaments} tournaments={tournaments} user={user} handleDelete={handleDelete} isMobile={isMobile} />
        </div>
    );
}