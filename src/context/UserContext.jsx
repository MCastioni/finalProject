import { createContext, useContext, useState } from "react"

const UserContext = createContext()

const UserProvider = (props) => {
  const [user, setUser] = useState(null)

  const login = async (username, password) => {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })

    if (response.ok) {
      const token = await response.json()
      setUser(true)
      return token
    } else {
      return false
    }
  }

  const logout = () => {
    setUser(null)
  }

  const register = async ({username, email, password}) => {
    console.log("haciendo Fetch")
    const response = await fetch ("https://fakestoreapi.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password, email })
    })

    if (response.ok) {
      const token = await response.json()
      setUser(true)
      return token
    } else {
      return false
    }
  }

  return (
    <UserContext.Provider value={{ login, logout, user, register }}>
      {props.children}
    </UserContext.Provider>
  )
}

const useAuth = () => useContext(UserContext)

export { UserProvider, useAuth }