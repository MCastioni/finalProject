import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"

const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header>
      <img src="Logo.jpg" alt="imagen de logo" />
      <nav>
        <ul>
          {
            user && <>
              <li><Link to="/Home">Inicio</Link></li>
              <li><Link to="/Login">Login</Link></li>
              <li><Link to="/Dashboard">Dashboard</Link></li>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </>
          }
          {
            !user && <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/registrate">Registrate</Link></li>
            </>
          }
        </ul>
      </nav>
    </header>
  )
}

export { Header }