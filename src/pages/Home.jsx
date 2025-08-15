import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"


const Home = () => {
  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([])
  const [value, setValue] = useState("")
  const [showPopup, setShowPopup] = useState(null)
  const [productToEdit, setProductToEdit] = useState(null)
  const [titleEdit, setTitleEdit] = useState("")
  const [priceEdit, setPriceEdit] = useState("")
  const [descriptionEdit, setDescriptionEdit] = useState("")
  const [categoryEdit, setCategoryEdit] = useState("")
  const [imageEdit, setImageEdit] = useState("")

  const { user } = useAuth()

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", { method: "GET" })
    const data = await response.json()
    setAllProducts(data)
    setProducts(data)
  }

  useEffect(() => {
    fetchingProducts()
  }, [])

  const onChangeinput = (e) => {
    const value = e.target.value
    setValue(value)

    if (!value.trim()) {
      setProducts(allProducts)
    } else {
      const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(value.toLowerCase())
      )
      setProducts(filtered)
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })

    if (response.ok) {
      setProducts(prevProduct => prevProduct.filter((product) => product.id != id))
    }
  }

  const handleOpenEdit = (product) => {
    setShowPopup(true)
    setProductToEdit(product)
    setTitleEdit(product.title)
    setPriceEdit(product.price)
    setDescriptionEdit(product.description)
    setCategoryEdit(product.category)
    setImageEdit(product.image)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit
    }

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)
      })
      
      if (response.ok) {
        const data = await response.json()
        setProducts(prevProduct =>
          prevProduct.map((product) =>
            product.id === productToEdit.id
              ? data
              : product
          ))
      }
      setShowPopup(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <section>
        <h1 id="homeTitle">Bienvenido a Nuestra Tienda</h1>
        <p id="homeSubtitle">...Descubrí una selección exclusiva de productos para vos. Calidad, confianza y atención personalizada...</p>
      </section>

      <section>
        <h2 id="homeInfoTitle">¿Por qué elegirnos?</h2>

        <section id="homeInfoContainer">
            <div className="homeInfoCard">
            <h3 className="homeInfoCardTitle" >Envíos a todo el país</h3>
            <p className="homeInfoCardText"> Recibí tu compra en la puerta de tu casa estés donde estés.</p>
            </div>
            <div className="homeInfoCard">
            <h3 className="homeInfoCardTitle">Pagos seguros</h3>
            <p className="homeInfoCardText">Trabajamos con plataformas que garantizan tu seguridad.</p>
            </div>
            <div className="homeInfoCard">
            <h3 className="homeInfoCardTitle">Atención personalizada</h3>
            <p  className="homeInfoCardText">Estamos disponibles para ayudarte en todo momento.</p>
            </div>
        </section>
      </section>

      <section>
        <h2 id="homeProductsTitle">Nuestros productos</h2>
        <p id="homeProductsSubtitle"> Elegí entre nuestras categorías más populares.</p>
        <div id="homeSearchbarContainer">
        <input id="homeSearchbar" onChange={onChangeinput} type="text" placeholder="Búsqueda..." />
        </div>
        {
          showPopup && <section className="popup-edit">
            <h2 className="homeInfoCardTitle" >Editando producto</h2>
             {/* <div id="homePopUp"> */}
            <form id="homePopUp" onSubmit={handleUpdate}>

              <p className="popUpText"> Title </p>
              <input 
                type="text"
                placeholder="Ingrese el titulo"
                value={titleEdit}
                onChange={(e) => setTitleEdit(e.target.value)}
              />
              <br />

              <p className="popUpText"> Price </p>
              <input
                type="number"
                placeholder="Ingrese el precio"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
              />
              <br />

              <p className="popUpText"> Description </p>
              <textarea
                placeholder="Ingrese la descripción"
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
              ></textarea>
              <br />

              <p className="popUpText"> Category </p>
              <input
                type="text"
                placeholder="Ingrese la categoria"
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
              />
              <br />

              <p className="popUpText"> Picture </p>
              <input
                type="text"
                placeholder="Ingrese la URL de la imagen"
                value={imageEdit}
                onChange={(e) => setImageEdit(e.target.value)}
              />
              <br />
              <button className="buttons" onClick={() => setShowPopup(null)}>Cerrar</button>
              <button className="buttons">Actualizar</button>
            </form>
          </section>
        }

        <div id="homeSellingPage">
          {
            products.map((product) => <div key={product.id}>
                <section id="homeGridFull">
                  <h2 id="homeGridTitle" key={product.id}>{product.title}</h2>
                
                <section id="homeGridInfo">
                  <p id="homeGridCategory">{product.category}</p>
                  <div id="homeGridButtonsID">
              {
                user && 
                <div>
                  <button className="buttons" onClick={() => handleOpenEdit(product)}>Actualizar</button>
                  <button className="buttons" onClick={() => handleDelete(product.id)}> Borrar</button>
                </div>
              }
              </div>
              </section>


                  <div id="homeGridContainer">
                    <img id="homeGridImg" src={product.image} alt={`Imagen de ${product.title}`} />
                    <p id="homeGridDescription" >{product.description}</p>
                  </div>
                  <p id="homeGridPrice"d> ${product.price}</p>
              </section>
        </div>)
          }
        <br />
        <div id="homeProductsError">
          {
            !products.length && (
            <div><h3>Ups, parece que hubo un problema</h3>
            <p id="errorMessage"> Tu producto  no existe o no es correcto.</p>
            <p id="errorMessage"> Por favor, intenta nuevamente.</p></div>
            )
          }
        </div>
        </div>
      </section>
    </Layout>
  )
}

export { Home }
