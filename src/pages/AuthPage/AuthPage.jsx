// import './AuthPage.css'
import SignUpForm from "../../components/Main/SignUpForm/SignUpForm";
import LoginForm from "../../components/Main/LoginForm/LoginForm";
import {useState} from 'react'

export default function AuthPage({setUser}) {
    const [showSignUp, setSignUp] = useState(false)

    return (
        <div className="block max-w-full w-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            { showSignUp ? 
                <div className="flex flex-col">
                    <div className="flex gap-5">
                        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Sign Up</h1>
                    </div>
                    <SignUpForm setUser={setUser} />
                    <button className="font-normal text-gray-700 dark:text-gray-400" onClick={() => setSignUp(!showSignUp)}>GO TO  <a className="ml-auto text-blue-700 hover:underline dark:text-blue-500">LOGIN</a></button>
                </div>
            :
                <div className="flex flex-col">
                    <div className="flex gap-20">
                        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Login</h1>
                    </div>
                    <LoginForm setUser={setUser} />
                    
                    <button className="font-normal text-gray-700 dark:text-gray-400" onClick={() => setSignUp(!showSignUp)}>GO TO <a className="ml-auto text-blue-700 hover:underline dark:text-blue-500">SIGN UP</a></button>
                </div>
            }
        </div>
    );
}