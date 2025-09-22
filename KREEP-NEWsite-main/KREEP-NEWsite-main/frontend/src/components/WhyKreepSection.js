import React from "react";
import { Clock, Smartphone, Brain, Sparkles, CheckCircle } from "lucide-react";
import { mockData } from "../mock";

const iconMap = {
  Clock,
  Smartphone,
  Brain,
  Sparkles
};

const WhyKreepSection = () => {
  const { whyKreep } = mockData;

  return (
    <section id="why-kreep" className="why-kreep-section">
      <div className="dark-content-container">
        <h2 className="section-title">{whyKreep.title}</h2>
        {whyKreep.subtitle && (
          <p className="section-subtitle">{whyKreep.subtitle}</p>
        )}
        {whyKreep.description && (
          <p className="section-description">{whyKreep.description}</p>
        )}
        
        <div className="features-grid">
          {whyKreep.features.map((feature) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">
                  <IconComponent size={32} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                
                {feature.benefits && (
                  <div className="feature-benefits">
                    <ul className="benefits-list">
                      {feature.benefits.map((benefit, index) => (
                        <li key={index} className="benefit-item">
                          <CheckCircle size={14} className="benefit-icon" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyKreepSection;