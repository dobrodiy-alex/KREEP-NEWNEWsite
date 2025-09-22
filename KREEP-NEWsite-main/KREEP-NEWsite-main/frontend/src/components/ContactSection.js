import React, { useState } from "react";
import { MapPin, Clock, Phone, Mail, Send, Loader2, Gift } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { mockData } from "../mock";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactSection = () => {
  const { contact, newsletter } = mockData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    
    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error("Сталася помилка при відправленні повідомлення. Спробуйте ще раз.");
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingNewsletter(true);
    
    try {
      const response = await axios.post(`${API}/newsletter`, { email: newsletterEmail });
      
      if (response.data.success) {
        toast.success(response.data.message);
        setNewsletterEmail('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error("Сталася помилка при підписці. Спробуйте ще раз.");
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="dark-content-container">
        <h2 className="section-title">{contact.title}</h2>
        {contact.subtitle && (
          <p className="section-subtitle">{contact.subtitle}</p>
        )}
        
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <MapPin size={24} className="contact-icon" />
              <div>
                <h3>Адреса</h3>
                <p>{contact.address}</p>
              </div>
            </div>
            
            <div className="contact-item">
              <Clock size={24} className="contact-icon" />
              <div>
                <h3>Години роботи</h3>
                <p>{contact.hours}</p>
              </div>
            </div>
            
            <div className="contact-item">
              <Phone size={24} className="contact-icon" />
              <div>
                <h3>Телефон</h3>
                <p>{contact.phone}</p>
              </div>
            </div>
            
            <div className="contact-item">
              <Mail size={24} className="contact-icon" />
              <div>
                <h3>Email</h3>
                <p>{contact.email}</p>
              </div>
            </div>
          </div>
          
          <div className="contact-forms">
            <form onSubmit={handleSubmit} className="contact-form">
              <h3>Зв'язатися з нами</h3>
              <Input
                type="text"
                name="name"
                placeholder="Ваше ім'я"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="form-input"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-input"
              />
              <Textarea
                name="message"
                placeholder="Повідомлення"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="form-textarea"
                rows={4}
              />
              <Button 
                type="submit" 
                className="btn-primary form-submit"
                disabled={isSubmittingContact}
              >
                {isSubmittingContact ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Відправка...
                  </>
                ) : (
                  <>
                    Відправити
                    <Send size={18} />
                  </>
                )}
              </Button>
            </form>
            
            <div className="newsletter-form">
              <h3>{newsletter.title}</h3>
              <p>{newsletter.subtitle}</p>
              
              {newsletter.benefits && (
                <div className="newsletter-benefits">
                  <h4>Переваги підписки:</h4>
                  <ul className="benefits-list">
                    {newsletter.benefits.map((benefit, index) => (
                      <li key={index} className="benefit-item">
                        <Gift size={14} className="benefit-icon" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <form onSubmit={handleNewsletterSubmit} className="newsletter-input-group">
                <Input
                  type="email"
                  placeholder="Ваш email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="newsletter-input"
                />
                <Button 
                  type="submit" 
                  className="btn-primary newsletter-btn"
                  disabled={isSubmittingNewsletter}
                >
                  {isSubmittingNewsletter ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Підписка...
                    </>
                  ) : (
                    "Підписатися"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;