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

export default function App() {
  const [user, setUser] = useState(getUser())
  const [error, setError] = useState(null)

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
              <NavBar user={user} setUser={setUser} />
              <Routes>
                <Route path="/" element={ <Dashboard user={user} /> } />
                <Route path="/tournaments" element={<TournamentIndex user={user} />} />
                <Route path="/tournaments/:id/edit" element={<TournamentEdit />} />
                <Route path="/courses" element={<CourseIndex user={user} />} />
                <Route path="/courses/:id" element={<CourseDetails />} />
                <Route path="*" element={ <div className="flex-ctr-ctr flex-col" ><h1>404 Not Found</h1></div> }/>
              </Routes>
            </main>
          :
            <main className="antialiased flex flex-col justify-center items-center h-full">
              <div className='bg-white flex flex-col justify-center items-center drop-shadow-lg rounded-lg'>
                <h1 className='text-2xl font-bold'>Welcome to Sub 72</h1>
                <br></br>
                <h2 className='font-bold'>Roles:</h2>
                <div className='flex flex-row my-5'>
                  <button className='mx-5 rounded-full bg-orange-300 py-1 px-4 outline-double outline-red-200' onClick={handleSetRole} value="O" >Organizer</button>
                  <button className='mx-5 rounded-full bg-green-300 py-1 px-4 outline-double outline-red-200' onClick={handleSetRole} value="P" >Player</button>
                </div>
                <p className='text-center py-5 px-5' style={{ fontWeight: "bold" }}>Please note, if you want to become an organizer, you will have to go through an approval process (0-3 days)</p>
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
          <AuthPage setUser={setUser} />
        </main>
      }
    </>
  );
}
