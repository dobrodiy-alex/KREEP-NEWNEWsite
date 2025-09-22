import React from "react";
import { Scan, ShoppingCart, CheckCircle, Clock, Smartphone, Brain, Sparkles } from "lucide-react";
import { mockData } from "../mock";

const iconMap = {
  Scan,
  ShoppingCart, 
  CheckCircle,
  Clock,
  Smartphone,
  Brain,
  Sparkles
};

const HowItWorksSection = () => {
  const { howItWorks } = mockData;

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="dark-content-container">
        <h2 className="section-title">{howItWorks.title}</h2>
        {howItWorks.subtitle && (
          <p className="section-subtitle">{howItWorks.subtitle}</p>
        )}
        {howItWorks.description && (
          <p className="section-description">{howItWorks.description}</p>
        )}
        
        <div className="steps-container">
          {howItWorks.steps.map((step, index) => {
            const IconComponent = iconMap[step.icon];
            return (
              <div key={step.id} className="step-card">
                <div className="step-number">{step.id}</div>
                <div className="step-icon">
                  <IconComponent size={40} />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                {step.details && (
                  <p className="step-details">{step.details}</p>
                )}
                {index < howItWorks.steps.length - 1 && (
                  <div className="step-connector"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;