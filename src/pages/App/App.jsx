import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { getUser, setRole } from '../../utilities/users-service';
import NavBar from '../../components/Main/NavBar/NavBar';
import AuthPage from '../AuthPage/AuthPage';
import TournamentIndex from '../Tournament/TournamentIndex/TournamentIndex';
import TournamentEdit from '../Tournament/TournamentEdit/TournamentEdit';
import CourseIndex from '../Course/CourseIndex/CourseIndex';
import CourseDetails from '../Course/CourseDetails/CourseDetails';
import Dashboard from '../Dashboard/Dashboard';
import NewTournament from '../Tournament/NewTournament/NewTournament';
import { useMediaQuery } from 'react-responsive';

export default function App() {
  const [user, setUser] = useState(getUser())
  const [error, setError] = useState(null)
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  async function handleSetRole(evt) {
    try{
      await setRole(evt.target.value)
      setUser(getUser())
      setError(null)
    } catch {
      setError("Something went wrong.  Please try again later.")
    }
  }

  return (
    <>
      { 
        user ? 
          user.role ?
            <main className='grid grid-flow-row-dense grid-row-auto grid-col-auto'>
              <NavBar user={user} setUser={setUser} isMobile={isMobile} />
              <Routes>
                <Route path="/" element={ <Dashboard user={user} /> } />
                <Route path="/tournaments" element={<TournamentIndex isMobile={isMobile} user={user} />} />
                <Route path="/tournaments/:id/edit" element={<TournamentEdit />} />
                <Route path="/tournaments/new" element={<NewTournament isMobile={isMobile} />} />
                <Route path="/courses" element={<CourseIndex user={user} />} />
                <Route path="/courses/:id" element={<CourseDetails />} />
                <Route path="*" element={ <div className="flex-ctr-ctr flex-col" ><h1>404 Not Found</h1></div> }/>
              </Routes>
            </main>
          :
            <main className="antialiased flex flex-col justify-center items-center h-full">
              <div className='p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-col justify-center items-center'>
                <h1 className='block mb-10 text-6xl font-medium text-gray-900 dark:text-white'>Welcome to Sub 72</h1>
                <h2 className='block mb-5 text-sm font-medium text-gray-900 dark:text-white'>Choose a Role:</h2>
                <div className='flex flex-row'>
                  <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={handleSetRole} value="O" >Organizer</button>
                  <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' onClick={handleSetRole} value="P" >Player</button>
                </div>
                <p className='block mb-10 text-sm font-medium text-gray-900 dark:text-white py-5'>Please note, if you want to become an organizer, you will have to go through an approval process (0-3 days)</p>
                {
                  error ? 
                  <p>{error}</p>
                  :
                  <></>
                }
              </div>
            </main>
        :
        <main className="antialiased flex flex-col justify-center items-center h-full">
          <h1 className='block mb-10 text-6xl font-medium text-gray-900 dark:text-white'>Welcome to Sub 72</h1>
          <AuthPage setUser={setUser} />
        </main>
      }
    </>
  );
}
