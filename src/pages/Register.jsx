import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { register } = useAuth() 

  const nagivate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!username || !email || !password) {
      setError("Debes completar todos los campos")
      return
    }

    if (password.length < 4) {
      setError("Contraseña corta. Usa 4 letras o más")
      return
    }

    const newUser = {
      username,
      email,
      password
    }

    const isRegister = await register({username: username, password: password, email: email})
    if (isRegister) {
      alert("usuario creado")
      setUsername("")
      setPassword("")
      setEmail("")
      nagivate("/")
    }

    setSuccess("")
    setUsername("")
    setEmail("")
    setPassword("")
  }

  return (
    <Layout>
      <h1 id="registerTitle">¡Únete a nuestra comunidad!</h1>
      <div className="registerContainer">
      <section id="registerCard">
        <h2 id="registerCardTitle" > Crea tu cuenta LUMINA </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label id="registerText">Username:</label>
            <div></div>
            <input 
            type="text" 
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
            />
          </div>
          <div>
            <label id="registerText">Correo electrónico:</label>
            <div></div>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label id="registerText">Contraseña:</label>
            <div></div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button id="registerButton">Ingresar</button>
        </form>

        {
          error && <p id="errorMessage">{error}</p>
        }
      </section>
      </div>
    </Layout>
  )
}

export { Register }