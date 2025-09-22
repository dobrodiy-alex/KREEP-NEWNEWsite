import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { mockData } from "../mock";

const HeroSection = () => {
  const { hero } = mockData;
  const [SplineComponent, setSplineComponent] = useState(null);

  useEffect(() => {
    // Dynamically import Spline to handle loading errors gracefully
    const loadSpline = async () => {
      try {
        const Spline = await import('@splinetool/react-spline');
        setSplineComponent(() => Spline.default);
      } catch (error) {
        console.log('Spline could not be loaded, using fallback animation');
        setSplineComponent(() => null);
      }
    };
    
    loadSpline();
  }, []);

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="hero-left">
          <h1 className="hero-title">
            {hero.title}
          </h1>
          <h2 className="hero-subtitle">
            {hero.subtitle}
          </h2>
          <p className="hero-description">
            {hero.description}
          </p>
          <button 
            className="btn-primary hero-cta"
            onClick={scrollToHowItWorks}
          >
            {hero.ctaText}
            <ArrowRight size={20} />
          </button>
        </div>
        
        <div className="hero-right">
          <div className="spline-container">
            {SplineComponent ? (
              <SplineComponent 
                scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode"
                style={{ width: '100%', height: '100%' }}
                onLoad={() => console.log('Spline scene loaded successfully')}
                onError={() => console.log('Spline scene failed to load, showing fallback')}
              />
            ) : (
              <div className="fallback-animation">
                <div className="animated-sphere">
                  <div className="sphere-core"></div>
                  <div className="sphere-ring ring-1"></div>
                  <div className="sphere-ring ring-2"></div>
                  <div className="sphere-ring ring-3"></div>
                  <div className="floating-particles">
                    <div className="particle particle-1"></div>
                    <div className="particle particle-2"></div>
                    <div className="particle particle-3"></div>
                    <div className="particle particle-4"></div>
                    <div className="particle particle-5"></div>
                    <div className="particle particle-6"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;