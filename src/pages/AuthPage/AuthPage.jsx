// import './AuthPage.css'
import SignUpForm from "../../components/Main/SignUpForm/SignUpForm";
import LoginForm from "../../components/Main/LoginForm/LoginForm";
import {useState} from 'react'

export default function AuthPage({setUser}) {
    const [showSignUp, setSignUp] = useState(false)
    return (
        <div className="py-20 px-12 md:max-w-4xl bg-white drop-shadow-lg rounded-lg">
            { showSignUp ? 
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Sign Up</h1>
                    <SignUpForm setUser={setUser} />
                    <button onClick={() => setSignUp(!showSignUp)}>LOGIN</button>
                </div>
            :
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Login</h1>
                    <LoginForm setUser={setUser} />
                    <button onClick={() => setSignUp(!showSignUp)}>SIGN UP</button>
                </div>
            }
        </div>
    );
}