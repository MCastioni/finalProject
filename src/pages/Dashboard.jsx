import { useState } from "react"
import { Layout } from "../components/Layout"

const Dashboard = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)



  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!name || !price || !description) {
      setError("Debes completar todos los campos")
      return
    }

    if (name.length < 3) {
      setError("El nombre debe tener al menos 4 caracteres")
      return
    }

    if (price <= 0) {
      setError("El precio no puede ser negativo.")
      return
    }

    if (description.length < 10) {
      setError("La descripción debe tener al menos 10 caractéres.")
      return
    }

    const newProduct = {
      id: crypto.randomUUID(),
      title: name,
      price: price,
      description: description,
      category: "",
      image: ""
    }

    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })

    const data = await response.json()
    setProduct(data)
    setName("")
    setPrice("")
    setDescription("")
  }

  return (
    <Layout>
      <h1 id="dashboardTitle">Panel de Administración</h1>

      <section>
        <form className="dashboardPanel" onSubmit={handleSubmit}>
          <h2 class="dashboardText">Cargar nuevo producto</h2>
          <div>
            <label class="dashboardText">Nombre del producto:</label>
            <br />
            <input type="text" name="nombre" onChange={(e) => setName(e.target.value)} value={name} />
          </div>
          <div>
            <label class="dashboardText">Precio:</label>
            <br />
            <input type="number" name="precio" onChange={(e) => setPrice(e.target.value)} value={price} />
          </div>

          <div>
            <label class="dashboardText">Descripción:</label>
            <br />
            <textarea name="descripcion" rows="4" onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>

          {
            error && <p className="error">{error}</p>
          }

          <button class="buttons">Guardar producto</button>
        </form>

        {
          product && <div>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>{product.description}</p>
          </div>
        }
      </section>
    </Layout>
  )
}

export { Dashboard }
