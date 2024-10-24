'use client'
import { Accordion } from "flowbite-react";
import React from "react";

export default function AccordionPanelApp({ faqs }) {
  return (
      <Accordion>
    {
      faqs.map((faq) => (
        <Accordion.Panel key={faq._id}>
          <Accordion.Title>{faq.question}</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">{faq.answer}</p>
          </Accordion.Content>
        </Accordion.Panel>
      ))
    }
    </Accordion>  
  );
}
