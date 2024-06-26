import Head from "next/head";
import { Inter } from "next/font/google";
import HeroSection from "../components/screens/main/HeroSection";
import Shops from "../components/screens/main/Shops";
import TrackNumber from "../components/shared/TrackNumber";
import Mission from "../components/screens/main/Mission";
import AboutUs from "../components/screens/main/AboutUs";
import StepWork from "../components/screens/main/StepWork";
import MoreInfo from "../components/screens/main/MoreInfo";
import Advantage from "../components/screens/main/ Advantage";
import MoreServices from "../components/screens/main/MoreServices";
import Join from "../components/screens/main/Join";
import Faq from "../components/partials/Faq";
import Contacts from "../components/partials/Contacts";
import Purchase from "../components/shared/Purchase";
import CostCalculator from "@/components/shared/CostCalculator";
import News from "@/components/partials/about/News";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Oway USA</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/images/logotitle.jpeg" />
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
      </Head>
      <HeroSection />
      <Shops />
      <News />
      <Purchase />
      <TrackNumber />
      <Mission />
      <AboutUs />
      <StepWork />
      <MoreInfo menu="menu" />
      <Advantage
        p="Наши преимущества"
        h2="Легкость и доступность совершения покупок"
        menu="menu"
      />
      <MoreServices />
      <CostCalculator />
      <Join />
      <Faq />
      <Contacts />
    </>
  );
}
