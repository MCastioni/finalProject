import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"

const NotFound = () => {
  return (
    <Layout>
      <h1 id="notTitle">Página no encontrada</h1>
      <section id="notFoundPage">
      <div id="notFoundContainer">
      <img id="notImg" src="notFoundCat.jpeg" alt="Page not found, sad cat" />
      <p id="notText">¡Ups! Parece que la página que estás buscando no existe.</p>
      <p id="notText"> Por favor, verifica la URL o vuelve al inicio.</p>
      <Link id="notLink" to="/">Ir a inicio</Link>
      </div>  
      </section> 
    </Layout>
  )
}

export { NotFound }