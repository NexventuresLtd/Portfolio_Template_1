import AboutSection from "../components/HomePage/body/AboutUs"
import Footer from "../components/HomePage/footer/Footer"
import Hero from "../components/HomePage/header/hero"
import Navbar from "../components/HomePage/header/NavBar"


const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <AboutSection/>
      <Footer/>
    </div>
  )
}

export default HomePage
