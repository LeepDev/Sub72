import './NewTournamentCard.css';
import { useState } from "react";
import * as tService from '../../utilities/tournaments-service';

export default function NewTournamentCard({ fetchTournaments }) {
    const [name, setName] = useState('')
    const [error, setError] = useState('');
    
    function handleChange(evt) {
        setName(evt.target.value);
        setError('');
    }
    
    async function handleSubmit(evt) {
      evt.preventDefault();
      try {
        await tService.create(name);
        setName('')
        fetchTournaments()
      } catch (err) {
        console.log(err);
      }
    }

    return (
        <div className='newTournamentCard'>
            <p><span>New Tournament Form</span></p>
            <div className="form-container flex-ctr-ctr">
                <form method="POST" onSubmit={handleSubmit} autoComplete="off">
                    <label>Tournament Name:</label>
                    <input type="text" name="name" value={name} onChange={handleChange} required />
                    <button type="submit" >Save</button>
                </form>
            </div>
            
            <p className="error-message">&nbsp;{error}</p>
        </div>
    );
}