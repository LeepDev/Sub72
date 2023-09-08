import { useState } from 'react';
import './App.css';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import AuthPage from '../AuthPage/AuthPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import { Routes, Route } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar';
import { getUser, setRole } from '../../utilities/users-service';

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
    <main className="App" style={{ height: "100%" }} >
      { user ? 
          user.role ?
            <>
              <NavBar user={user} setUser={setUser} />
              <Routes>
                {/* Route components in here */}
                <Route path="/orders/new" element={<NewOrderPage />} />
                <Route path="/orders" element={<OrderHistoryPage />} />
                <Route path="*" element={ <></> }/>
              </Routes>
            </>
          :
            <div className="flex-ctr-ctr flex-col"  style={{ height: "100%" }}>
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
