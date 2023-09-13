import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { getUser, setRole } from '../../utilities/users-service';
import NavBar from '../../components/Main/NavBar/NavBar';
import AuthPage from '../AuthPage/AuthPage';
import TournamentIndex from '../TournamentIndex/TournamentIndex';
import TournamentEdit from '../TournamentEdit/TournamentEdit';
import CourseIndex from '../CourseIndex/CourseIndex';
import CourseDetails from '../CourseDetails/CourseDetails';

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
    <main className="App">
      { user ? 
          user.role ?
            <>
              <NavBar user={user} setUser={setUser} />
              <Routes>
                {   user.role === "O" &&
                    <>
                        {/* <Route path="/tournaments/new" element={<><h1>New Tourney</h1></>} /> */}
                        {/* <Route path="/tournaments/new" element={ <NewTournament /> } /> */}
                    </>
                }
                <Route path="/" element={ <><h1>Home</h1></> } />
                <Route path="/tournaments" element={<TournamentIndex user={user} />} />
                <Route path="/tournaments/:id/edit" element={<TournamentEdit />} />
                <Route path="/courses" element={<CourseIndex user={user} />} />
                <Route path="/courses/:id" element={<CourseDetails />} />
                <Route path="*" element={ <div className="flex-ctr-ctr flex-col" ><h1>404 Not Found</h1></div> }/>
              </Routes>
            </>
          :
            <div className="flex-ctr-ctr flex-col">
              <h1>Welcome to Sub 72</h1>

              <h2>Roles:</h2>
              <button onClick={handleSetRole} value="O" >Organizer</button>
              <button onClick={handleSetRole} value="P" >Player</button>
              <p style={{ fontWeight: "bold" }}>Please note, if you want to become an organizer, you will have to go through an approval process (0-3 days)</p>
              {
                error ? 
                  <p>{error}</p>
                :
                  <></>
              }
            </div>
        :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
