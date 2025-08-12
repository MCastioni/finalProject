
import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()

  const nagivate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log({ username, password })
    const isLogin = await login(username, password)

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
      </section>
      </div>
    </Layout>
  )
}

export { Login }