import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { login } = useAuth()

  const nagivate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

  if (!username || !password) {
    setError("Debes completar todos los campos")
    return
  }

  if (/\d/.test(username)) {
    setError("El nombre de usuario no puede contener números")
    return
  }

  if (/\s/.test(password)) {
    setError("La contraseña no puede contener espacios")
    return
  }

    const isLogin = await login({username, password})
    
    if (isLogin) {
      setUsername("")
      setPassword("")
      nagivate("/")
    }
    else {
    alert("Nombre de usuario o contraseña incorrectos")
    }

  }

  return (
    <Layout>
      <h1 id="loginTitle">¡Bienvenido de vuelta!</h1>
      <div class="loginContainer">
      <section id="loginCard">
        <h2 id="loginCardTitle">Inicia sesion en LUMINA</h2>
        <p id="loginHeart">❤</p>
        <form onSubmit={handleLogin}>
          <div>
            <label id="loginText">Nombre de usuario:</label>
            <div></div>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username} />
          </div>
          <div>
            <label id="loginText"> Contraseña:</label>
            <div></div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password} />
          </div>
          <button id="loginButton">Ingresar</button>
        </form>

        {
          error && <p id="errorMessage">{error}</p>
        }

      </section>
      </div>
    </Layout>
  )
}

export { Login }