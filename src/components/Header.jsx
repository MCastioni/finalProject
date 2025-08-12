import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"

const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
  logout()
  }

  return (
    <header>
      <p id="headerText">... Lumina ...</p>
      <nav id="headerNav">
        <ul id="headerMenu">
          {
            user && <>
              <li id="headerListItem"><Link to="/">Home</Link></li>
              <li id="headerListItem"><Link to="/Dashboard">Dashboard</Link></li>
              <li id="headerListItem"><Link to="/AboutUs">Sobre Nosotros</Link></li>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </>
          }
          {
            !user && <>
              <li id="headerListItem"><Link to="/login">Login</Link></li>
              <li id="headerListItem"><Link to="/registrate">Registrate</Link></li>
              <li id="headerListItem"><Link to="/AboutUs">Sobre Nosotros</Link></li>
            </>
          }
        </ul>
      </nav>
    </header>
  )
}

export { Header }