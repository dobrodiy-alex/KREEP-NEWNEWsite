import React from "react";
import { Shield, Lock, Eye, CheckCircle, Award } from "lucide-react";
import { mockData } from "../mock";

const BiometricSection = () => {
  const { biometric } = mockData;

  return (
    <section id="biometric" className="biometric-section">
      <div className="dark-content-container">
        <div className="biometric-content">
          <div className="biometric-text">
            <h2 className="section-title">{biometric.title}</h2>
            <p className="section-subtitle">{biometric.subtitle}</p>
            {biometric.description && (
              <p className="section-description">{biometric.description}</p>
            )}
            
            <div className="security-features">
              {biometric.features.map((feature, index) => (
                <div key={index} className="security-item">
                  <CheckCircle size={20} className="security-icon" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="security-badges">
              <div className="security-badge">
                <Shield size={24} />
                <span>AES-256 шифрування</span>
              </div>
              <div className="security-badge">
                <Lock size={24} />
                <span>Локальне зберігання</span>
              </div>
              <div className="security-badge">
                <Eye size={24} />
                <span>ШІ захист</span>
              </div>
            </div>

            {biometric.certifications && (
              <div className="certifications">
                <h4 className="certifications-title">
                  <Award size={20} />
                  Сертифікації та стандарти
                </h4>
                <ul className="certifications-list">
                  {biometric.certifications.map((cert, index) => (
                    <li key={index} className="certification-item">
                      <CheckCircle size={16} className="cert-icon" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="biometric-image">
            <img 
              src={biometric.image} 
              alt="Біометрична безпека"
              className="security-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiometricSection;