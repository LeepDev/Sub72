import './NewTournamentCard.css';
import { useState } from "react";
import * as tService from '../../utilities/tournament-service';

export default function NewTournamentCard() {
    const [text, setText] = useState('')
    const [error, setError] = useState('');
    
    function handleChange(evt) {
        setText(evt.target.value);
        setError('');
    }
    
    async function handleSubmit(evt) {
      evt.preventDefault();
      try {
        // await notesService.create(text);
      } catch {
        setError('Log In Failed - Try Again');
      }
    }

    return (
        <div className='newTournamentCard'>
            <h1>New Tournament Form</h1>
            <div className="form-container flex-ctr-ctr" autoComplete="off" onSubmit={handleSubmit} >
                <form method="POST">
                    <label>Note Text:</label>
                    <textarea type="text" name="text" value={text} onChange={handleChange} required  />
                    <button type="submit" >Save Note</button>
                </form>
            </div>
            
            <p className="error-message">&nbsp;{error}</p>
        </div>
    );
}