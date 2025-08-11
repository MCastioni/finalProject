import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"

const NotFound = () => {
  return (
    <Layout>
      <h1>Página no encontrada</h1>
      <img src="notFoundCat.jpeg" alt="Page not found, sad cat" />
      <p>¡Ups! Parece que la página que estás buscando no existe.</p>
      <p> Por favor, verifica la URL o vuelve al inicio.</p>
      <Link to="/">Ir a inicio</Link>
    </Layout>
  )
}

export { NotFound }