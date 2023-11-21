import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import AuthPage from '../AuthPage/AuthPage';

export default function Landing({setUser}) {
    const [welcome, setWelcome] = useState(true)
    const [isDarkMode, setIsDarkMode] = useState(true)
    const isMobile = useMediaQuery({ maxWidth: 1055 }); // Adjust the breakpoint as needed

    // On component mount, read the initial theme from localStorage or default to light
    useEffect(() => {
        const theme = localStorage.getItem('theme') || 'light';
        setIsDarkMode(theme === 'dark');
      
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Toggle dark mode and update localStorage
    const toggleDarkMode = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        setIsDarkMode(!isDarkMode);
      };

    return (
        <main className={`antialiased min-h-screen flex ${isMobile ? 'justify-center items-center' : ''} bg-gray-300 dark:bg-gray-900`}>
            {
                isMobile ? 
                <></>
                :
                <div className='w-1/2 flex justify-center items-center overflow-hidden'>
                    <img alt='Cover' className='h-full w-full scale-150 object-cover' src="/sub72golf.jpg" />
                </div>
            }
            <div className={`flex ${isMobile ? 'p-20' : 'flex-col items-center justify-center w-1/2 p-40'}`}>
                    <div className='w-full h-full'>
                        <div className='mb-10 flex items-start justify-between'>
                            <h1 className='text-6xl font-medium dark:text-white text-gray-900 text-left'>Sub72</h1>
                            <button onClick={toggleDarkMode} id="theme-toggle" type="button" className="place-self-right flex items-center w-9 h-9 justify-center text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            {
                                isDarkMode ? 
                                <svg id="theme-toggle-light-icon" data-toggle-icon="sun" className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
                                    </svg>
                                :
                                <svg id="theme-toggle-dark-icon" data-toggle-icon="moon" className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                        <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
                                    </svg>
                            }
                        </button>
                        </div>
                        {
                            welcome ?
                            <>
                                <h2 className='block mb-10 text-2xl font-medium text-gray-900 dark:text-white'>Welcome!</h2>
                                <p className='block mb-10 font-medium text-gray-900 dark:text-white'>
                                    This app was created to support amateur golf events, as well as, including a segment that helps tally up the different mini-games an organizer will decide on (i.e. - closest to pin, longest drive, lowest gross/net score, lowest team score). Hope you enjoy!
                                </p>
                                <button className="text-white dark:text-black bg-black dark:bg-white hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" type="submit" onClick={() => setWelcome(!welcome)}>Login</button>
                            </>
                            :
                            <AuthPage setUser={setUser} />
                        }
                    </div> 
            </div>
        </main>
    )
}
