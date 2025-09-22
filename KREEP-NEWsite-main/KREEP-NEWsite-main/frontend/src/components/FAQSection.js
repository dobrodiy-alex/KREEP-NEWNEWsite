import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { mockData } from "../mock";

const FAQSection = () => {
  const { faq } = mockData;

  return (
    <section id="faq" className="faq-section">
      <div className="dark-content-container">
        <h2 className="section-title">{faq.title}</h2>
        
        <div className="faq-container">
          <Accordion type="single" collapsible className="faq-accordion">
            {faq.questions.map((item) => (
              <AccordionItem key={item.id} value={`item-${item.id}`} className="faq-item">
                <AccordionTrigger className="faq-question">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="faq-answer">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;