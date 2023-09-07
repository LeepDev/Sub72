import { useState } from 'react';
import './App.css';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import AuthPage from '../AuthPage/AuthPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import { Routes, Route } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar';
import { getUser, setRole } from '../../utilities/users-service';
import { set } from 'mongoose';

export default function App() {
  const [user, setUser] = useState(getUser())

  async function handleSetRole(evt) {
    const user = await setRole(evt.target.value)
    console.log(user)
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
            </>
        :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
