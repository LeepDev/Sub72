import { useState } from 'react';
import './App.css';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import AuthPage from '../AuthPage/AuthPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import { Routes, Route } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar';
import { getUser, setRole } from '../../utilities/users-service';
import { set, setDriver } from 'mongoose';

export default function App() {
  const [user, setUser] = useState(getUser())
  const [error, setError] = useState(null)

  async function handleSetRole(evt) {
    try{
      await setRole(evt.target.value)
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
                {/* Route components in here */}
                <Route path="/orders/new" element={<NewOrderPage />} />
                <Route path="/orders" element={<OrderHistoryPage />} />
              </Routes>
            </>
          :
            <>
              <button onClick={handleSetRole} value="O" >Organizer</button>
              <button onClick={handleSetRole} value="P" >Player</button>
              {
                error ? 
                  <p>{error}</p>
                :
                  <></>
              }
            </>
        :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
