import { Link } from 'react-router-dom'
import * as userService from '../../../utilities/users-service'

export default function NavBar ({user, setUser}) {
    // Add the following function
    function handleLogOut() {
        // Delegate to the users-service
        userService.logOut();
        // Update state will also cause a re-render
        setUser(null);
    }

    return (
        <nav className="navbar">
            <Link to="/">Dashboard</Link>
            &nbsp; | &nbsp;
            <span>Welcome, {user.name}!</span>
            &nbsp; | &nbsp;
            {   user.role === "O" &&
                <>
                    {/* <Link to="/tournaments/new">New Tournaments</Link>
                    &nbsp; | &nbsp; */}
                </>
            }
            <Link to="/tournaments">Tournaments</Link>
            &nbsp; | &nbsp;
            <Link to="/courses">Courses</Link>
            &nbsp; | &nbsp;
            <Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    )
}