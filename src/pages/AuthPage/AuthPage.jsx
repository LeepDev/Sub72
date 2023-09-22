// import './AuthPage.css'
import SignUpForm from "../../components/Main/SignUpForm/SignUpForm";
import LoginForm from "../../components/Main/LoginForm/LoginForm";
import {useState} from 'react'

export default function AuthPage({setUser}) {
    const [showSignUp, setSignUp] = useState(false)
    return (
        <div className="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
            <h1 className="text-2xl font-bold">AuthPage</h1>
            { showSignUp ? 
                <div className="flex flex-col">
                    <SignUpForm setUser={setUser} />
                    <button onClick={() => setSignUp(!showSignUp)}>Login</button>
                </div>
            :
                <div className="flex flex-col">
                    <LoginForm setUser={setUser} />
                    <button onClick={() => setSignUp(!showSignUp)}>Sign Up</button>
                </div>
            }
        </div>
    );
}