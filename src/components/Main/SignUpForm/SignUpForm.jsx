import { Component } from 'react'
import { signUp } from '../../../utilities/users-service';

export default class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
        };

    handleChange = (evt) => {
        // alert(JSON.stringify(this.state))
        this.setState({
            [evt.target.name]: evt.target.value,
            error: ''
        });
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            // We don't want to send the 'error' or 'confirm' property,
            //  so let's make a copy of the state object, then delete them
            const formData = {...this.state};
            delete formData.error;
            delete formData.confirm;
            // The promise returned by the signUp service method 
            // will resolve to the user object included in the
            // payload of the JSON Web Token (JWT)
            const user = await signUp(formData);
            
            this.props.setUser(user);
        } catch {
            // An error occurred
            this.setState({ error: 'Sign Up Failed - Try Again' });

        }
    }

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
          <div className='py-12'>
              <form autoComplete="off" onSubmit={this.handleSubmit} className='grid grid-cols-1 gap-6'>
                <label className='block'>
                  <span className='text-gray-700'>Name</span>
                  <input placeholder="John Smith" className='mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                </label>
                <label className='block'>
                  <span className='text-gray-700'>Email</span>
                  <input placeholder="john@example.com" className='mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                </label>
                <label className='block'>
                  <span className='text-gray-700'>Password</span>
                  <input placeholder="**********" className='mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                </label>
                <label className='block'>
                  <span className='text-gray-700'>Confirm Password</span>
                  <input placeholder="**********" className='mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                </label>
                <button type="submit" disabled={disable}>SIGN UP</button>
              </form>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        );}
}