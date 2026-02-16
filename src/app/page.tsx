import About from "@/components/about";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Testimonials from "@/components/testimonials";
import Timeline from "@/components/Timeline";
import WorkExperience from "@/components/WorkExperience";
import { Portfolio } from "@/utils/interface";

export default async function Home() {
  const portfolio = (await import("@/dummy.json")).default;

  const {
    about,
    testimonials,
    services,
    skills,
    projects,
    social_handles,
    timeline,
    email,
  } = portfolio as Portfolio;

  return (
    <main className="relative cursor-none">
      <CustomCursor />
      <Header social={social_handles} />
      <Hero about={about} social={social_handles} />
      <About about={about} />
      <WorkExperience />
      <Skills skills={skills} />
      <Projects />
      {/* <Services services={services} /> */}
      <Timeline timeline={timeline} />
      <Contact email={email} social_handle={social_handles} about={about} />
    </main>
  );
}
