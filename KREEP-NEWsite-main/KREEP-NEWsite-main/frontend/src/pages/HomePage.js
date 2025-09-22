import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";
import WhyKreepSection from "../components/WhyKreepSection";
import BiometricSection from "../components/BiometricSection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="dark-container">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <WhyKreepSection />
        <BiometricSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;