import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="dark-content-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">KREEP</h3>
            <p className="footer-tagline">Магазин майбутнього вже сьогодні</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Навігація</h4>
              <ul>
                <li><a href="#hero">Головна</a></li>
                <li><a href="#how-it-works">Як працює</a></li>
                <li><a href="#why-kreep">Переваги</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Підтримка</h4>
              <ul>
                <li><a href="#contact">Контакти</a></li>
                <li><Link to="/privacy">Політика конфіденційності</Link></li>
                <li><Link to="/terms">Умови використання</Link></li>
                <li><Link to="/help">Допомога</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Контакти</h4>
              <div className="footer-contact">
                <div className="footer-contact-item">
                  <Phone size={16} />
                  <span>+380970183384</span>
                </div>
                <div className="footer-contact-item">
                  <Mail size={16} />
                  <span>kreep@kreep.world</span>
                </div>
                <div className="footer-contact-item">
                  <MapPin size={16} />
                  <span>м. Львів, Галицький район</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 KREEP. Всі права захищені.</p>
          <p className="footer-tech">Технології майбутнього для комфорту сьогодні</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;