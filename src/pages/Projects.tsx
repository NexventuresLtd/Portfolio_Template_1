import { Footer } from "../components/HomePage/footer";
import { Navbar } from "../components/HomePage/header";
import ProjectsView from "../components/Projects/body/ProjectList";
import ProjectsHero from "../components/Projects/header/HeroProject";

const Projects = () => {

  return (
    <div>
      <Navbar />
      <ProjectsHero />
      <ProjectsView />
      <Footer />
    </div>
  );
};

export default Projects;
