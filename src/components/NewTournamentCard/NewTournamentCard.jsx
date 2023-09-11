import './NewTournamentCard.css';
import { useState } from "react";
import * as tService from '../../utilities/tournament-service';

export default function NewTournamentCard() {
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
      } catch (err) {
        console.log(err);
      }
    }

    return (
        <div className='newTournamentCard'>
            <p><span>New Tournament Form</span></p>
            <div className="form-container flex-ctr-ctr" autoComplete="off" onSubmit={handleSubmit} >
                <form method="POST">
                    <label>Tournament Name:</label>
                    <input type="text" name="name" value={name} onChange={handleChange} required  />
                    <button type="submit" >Save</button>
                </form>
            </div>
            
            <p className="error-message">&nbsp;{error}</p>
        </div>
    );
}