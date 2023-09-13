import './NewTournamentCard.css';
import { useState } from "react";
import { create } from '../../../utilities/tournaments-service';

export default function NewTournamentCard({ fetchTournaments }) {
    const [formData, setFormData] = useState({ "name": '', "rounds": 1})
    
    function handleChange(evt) {
      setFormData({...formData, [evt.target.name]: evt.target.value});
    }
    
    async function handleSubmit(evt) {
      evt.preventDefault();
      try {
        await create(formData);
        setFormData({...formData, "name": '' })
        await fetchTournaments()
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
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    <label>Rounds:</label>
                    <input type="number" name="rounds" value={formData.rounds} onChange={handleChange} required />
                    <button type="submit" >Save</button>
                </form>
            </div>
        </div>
    );
}