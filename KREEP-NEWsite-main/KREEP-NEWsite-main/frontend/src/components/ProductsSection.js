import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { mockData } from "../mock";

const ProductsSection = () => {
  const { products } = mockData;
  const [selectedCategory, setSelectedCategory] = useState(products.categories[0]);

  return (
    <section id="products" className="products-section">
      <div className="dark-content-container">
        <h2 className="section-title">{products.title}</h2>
        <p className="section-subtitle">{products.subtitle}</p>
        {products.description && (
          <p className="section-description">{products.description}</p>
        )}
        
        <div className="products-grid">
          <div className="categories-sidebar">
            {products.categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory.id === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="category-showcase">
            <div className="category-image">
              <img 
                src={selectedCategory.image} 
                alt={selectedCategory.name}
                className="showcase-image"
              />
            </div>
            <div className="category-info">
              <h3 className="category-title">{selectedCategory.name}</h3>
              <p className="category-description">{selectedCategory.description}</p>
              
              {selectedCategory.features && (
                <div className="category-features">
                  <h4 className="features-title">Особливості:</h4>
                  <ul className="features-list">
                    {selectedCategory.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <CheckCircle size={16} className="feature-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;