import { ClipboardList, Hammer, HardHat, HelpCircle, RefreshCw, Ruler } from "lucide-react"
import Footer from "../components/HomePage/footer/Footer"
import Navbar from "../components/HomePage/header/NavBar"

import HeroSection from "../components/Service/header/HeroComp"
import type { Service } from "../types/servicesTypes"
import ServicesComponent from "../components/Service/body/ServicesComp"


const Services = () => {
     const services: Service[] = [
        {
            id: "construction",
            title: "Building Construction",
            icon: <Hammer />,
            shortDescription: "From design to finishing touches for all building types",
            details: {
                description: "We design and construct durable, functional, and aesthetically pleasing buildings, handling everything from architectural design to finishing touches.",
                features: [
                    "Residential homes and apartments",
                    "Commercial properties (offices, malls, retail spaces)",
                    "Industrial structures (warehouses, factories)"
                ],
                commitment: "We deliver buildings that stand the test of time while meeting all functional requirements."
            }
        },
        {
            id: "engineering",
            title: "Structural Engineering",
            icon: <Ruler />,
            shortDescription: "Ensuring safety and stability in all structures",
            details: {
                description: "Our structural engineering services ensure projects are safe, stable, and long-lasting through advanced calculations and detailed planning.",
                features: [
                    "Advanced design calculations",
                    "Detailed structural blueprints",
                    "On-site inspections for compliance with safety standards"
                ],
                commitment: "We guarantee structural integrity that meets or exceeds all safety regulations."
            }
        },
        {
            id: "civil",
            title: "Civil Works",
            icon: <HardHat />,
            shortDescription: "Critical infrastructure for communities",
            details: {
                description: "We deliver essential infrastructure projects that form the backbone of modern communities.",
                features: [
                    "Road construction and paving",
                    "Bridges and culverts",
                    "Drainage systems",
                    "Water supply and sanitation projects"
                ],
                commitment: "We build infrastructure that serves communities for generations."
            }
        },
        {
            id: "management",
            title: "Project Management",
            icon: <ClipboardList />,
            shortDescription: "Complete oversight for on-time, on-budget delivery",
            details: {
                description: "We ensure every project is completed on time and within budget through professional project management.",
                features: [
                    "Scheduling and resource allocation",
                    "Procurement and contractor coordination",
                    "Risk management and quality control"
                ],
                commitment: "We take ownership of project success from start to finish."
            }
        },
        {
            id: "renovation",
            title: "Renovations & Maintenance",
            icon: <RefreshCw />,
            shortDescription: "Modernizing and preserving existing structures",
            details: {
                description: "We modernize and maintain existing properties to extend their lifespan and improve functionality.",
                features: [
                    "Remodeling homes and offices",
                    "Repairing and restoring structures",
                    "Preventive maintenance programs"
                ],
                commitment: "We breathe new life into existing structures with care and precision."
            }
        },
        {
            id: "consultancy",
            title: "Consultancy & Technical Advice",
            icon: <HelpCircle />,
            shortDescription: "Expert guidance for your construction projects",
            details: {
                description: "We guide clients through their projects with expert advice and technical knowledge.",
                features: [
                    "Providing expert engineering advice",
                    "Helping with material selection",
                    "Navigating building codes and regulatory approvals"
                ],
                commitment: "We share our expertise to help you make informed decisions."
            }
        }
    ];
    return (
        <div>
            <Navbar />
            <HeroSection />
            <ServicesComponent services={services} />
            <Footer/>
        </div>
    )
}

export default Services
