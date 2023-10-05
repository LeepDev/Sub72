import { Link, useLocation } from 'react-router-dom'
import * as userService from '../../../utilities/users-service'
import { useState, useEffect } from 'react';

export default function NavBar ({user, setUser, appClose, isMobile}) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(appClose);
    const location = useLocation()
    const nonActiveClass = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    const activeClass = "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
    const menuOpenClass = "w-full md:block md:w-auto"

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
    
    // Add the following function
    function handleLogOut() {
        // Delegate to the users-service
        userService.logOut();
        // Update state will also cause a re-render
        setUser(null);
    }
    
    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 z-10">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Sub 72</span>
                    </Link>
                    <button onClick={() => setMenuOpen(!menuOpen)} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                    <div className={isMobile ? (menuOpen ? menuOpenClass : "hidden") : menuOpenClass} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/" onClick={() => isMobile && setMenuOpen(!menuOpen)} className={(location.pathname == "/" ? activeClass : nonActiveClass)} aria-current="page">{user.name} Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/tournaments" onClick={() => isMobile && setMenuOpen(!menuOpen)} className={(location.pathname == "/tournaments" ? activeClass : nonActiveClass)}>Tournaments</Link>
                            </li>
                            <li>
                                <Link to="/courses" onClick={() => isMobile && setMenuOpen(!menuOpen)} className={(location.pathname == "/courses" ? activeClass : nonActiveClass)}>Courses</Link>
                            </li>
                            <li>
                                <Link to="" className={nonActiveClass} onClick={handleLogOut}>Log Out</Link>
                            </li>
                            <li>
                                <div className='flex items-center justify-center gap-4'>
                                    <button onClick={toggleDarkMode} id="theme-toggle" type="button" className="flex items-center w-9 h-9 justify-center text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
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
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {
                menuOpen && <div aria-hidden="true" className='fixed inset-0 z-0 bg-gray-700 bg-opacity-50' onClick={() => isMobile && setMenuOpen(!menuOpen)}></div>
            }
        </>
        
    )
}

