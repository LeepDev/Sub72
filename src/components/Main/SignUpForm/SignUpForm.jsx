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
                <div className='block'>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input placeholder="John Smith" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                </div>
                <div className='block'>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input placeholder="john@example.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                </div>
                <div className='block'>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input placeholder="**********" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                </div>
                <div className='block'>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                  <input placeholder="**********" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                </div>
                <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" type="submit" disabled={disable}>SIGN UP</button>
              </form>
            <p className="text-red-300 text-center mt-5">&nbsp;{this.state.error}</p>
          </div>
        );}
}