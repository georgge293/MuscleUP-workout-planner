import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }
    
    return(
        <header>
            <div className = "container">
                <Link to="/">
                    <h1>MuscleUP Fitness Tracker</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <Link to="/library">Library</Link>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                        
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar