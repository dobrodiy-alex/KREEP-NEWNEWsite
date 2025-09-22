import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Головна', section: 'hero' },
    { label: 'Як працює', section: 'how-it-works' },
    { label: 'Переваги', section: 'why-kreep' },
    { label: 'FAQ', section: 'faq' },
    { label: 'Контакти', section: 'contact' }
  ];

  return (
    <header className="dark-header">
      <div className="dark-logo-container">
        <h1 className="dark-logo-text">KREEP</h1>
      </div>
      
      <nav className={`dark-nav ${isMenuOpen ? 'dark-nav-mobile-open' : ''}`}>
        {navItems.map((item, index) => (
          <button 
            key={index}
            className="dark-nav-link"
            onClick={() => scrollToSection(item.section)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button 
        className="dark-mobile-menu-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  );
};

export default Header;