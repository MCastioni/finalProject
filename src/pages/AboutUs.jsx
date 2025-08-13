import { Layout } from "../components/Layout"

const AboutUs = () => {
    return (
    <Layout>
        <h1 id="aboutUsTitle">Sobre Nosotros</h1>
            <div id="aboutUsPage">
            <section class="aboutContainer">
            <section id="aboutCard">
                <h2 id="aboutTitle"> ¿Qué es Lumina?</h2>
                <p id="aboutText"> Lumina es una tienda online dedicada a ofrecer ropa moderna, cómoda y accesible para todos los gustos. Nuestro objetivo es brindar un cátalogo completeo y una experiencia de compra sencilla y segura. </p>
            </section>
            <section id="aboutCard">
                <h2 id="aboutTitle"> ¿A quién está dirigida? </h2>
                <p id="aboutText"> Lumina está pensada para personas que buscan estilo y calidad sin complicaciones. Nos dirigimos a personas de todas las edades que valoran la moda, la comodidad y la practicidad de comprar desde casa. </p>
            </section>
            <section id="aboutCard">
                <h2 id="aboutTitle"> ¿Cómo surge Lumina On line?  </h2>
                <p id="aboutText"> La plataforma de Lumina está desarrollada utilizando diversas técnicas, tales como HTML, CSS y JavaScript, con React para una experiencia de usuario ágil e interactiva. </p>
            </section>
            </section>    
        </div>  
    </Layout>
    )
}

export { AboutUs  }
