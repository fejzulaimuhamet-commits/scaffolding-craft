import { Seo } from "@/components/Seo";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Industries } from "@/components/sections/Industries";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { RequestWizard } from "@/components/sections/RequestWizard";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-14 sm:pb-0">
      <Seo />
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Process />
        <Projects />
        <About />
        <Industries />
        <Testimonials />
        <FAQ />
        <ServiceArea />
        <RequestWizard />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
