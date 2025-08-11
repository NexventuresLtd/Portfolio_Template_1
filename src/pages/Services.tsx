
import Footer from "../components/HomePage/footer/Footer"
import Navbar from "../components/HomePage/header/NavBar"

import HeroSection from "../components/Service/header/HeroComp"

import ServicesComponent from "../components/Service/body/ServicesComp"
import { services } from "../constants/ServiceConst"
import TestimonialsSection from "../components/Service/body/TestMo"
import testimonials from "../constants/Testmoni"





const Services = () => {

    return (
        <div>
            <Navbar />
            <HeroSection />
            <ServicesComponent services={services} />
            <TestimonialsSection testimonials={testimonials}/>
            <Footer/>
        </div>
    )
}

export default Services
