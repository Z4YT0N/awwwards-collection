import NavBar from "@/components/Client/NavBar";
import SustainableRetreat from "@/components/Client/SustainableRetreat";
import ElementisStory from "@/sections/ElementisStory";
import WellnessSanctuary from "@/sections/WellnessSanctuary";
import Footer from "@/sections/Footer/Server";
import Form from "@/sections/Form";
import Innovation from "@/components/Client/Innovation";
import Hero from "@/sections/Hero";
import Introduction from "@/sections/Introduction";

export default function Home() {
  return (
    <main>
      <Hero />
      <Introduction />
      <WellnessSanctuary />
      <Innovation />
      <ElementisStory />
      <SustainableRetreat />
      <Form />
      <Footer />
      <NavBar />
    </main>
  );
}
