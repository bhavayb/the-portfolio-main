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
  const rawPortfolio = (await import("@/dummy.json")).default;

  const aboutWithOptionalShort = rawPortfolio.about as typeof rawPortfolio.about & {
    short_description?: string;
  };

  const portfolio: Portfolio = {
    ...rawPortfolio,
    about: {
      ...rawPortfolio.about,
      short_description:
        aboutWithOptionalShort.short_description ?? rawPortfolio.about.description,
    },
  };

  const {
    about,
    testimonials,
    services,
    skills,
    projects,
    social_handles,
    timeline,
    email,
  } = portfolio;

  return (
    <main className="relative cursor-none">
      <CustomCursor />
      <Header social={social_handles} />
      <Hero about={about} social={social_handles} />
      <About about={about} />
      <WorkExperience timeline={timeline} />
      <Skills skills={skills} />
      <Projects />
      {/* <Services services={services} /> */}
      <Timeline timeline={timeline} />
      <Contact email={email} social_handle={social_handles} about={about} />
    </main>
  );
}
