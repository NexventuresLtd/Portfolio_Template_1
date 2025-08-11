import ContactPage from "../components/contactInfo/contactInfo"
import ContactHero from "../components/contactInfo/HeroContact"
import { Footer } from "../components/HomePage/footer"
import { Navbar } from "../components/HomePage/header"


const ContanctUs = () => {
    return (
        <>
            <Navbar />
            <ContactHero/>
            <ContactPage />
            <Footer />
        </>
    )
}

export default ContanctUs
