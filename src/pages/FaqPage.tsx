import React from 'react';
import { Layout } from '../components/layout/Layout';

export function FaqPage() {
  const faqs = [
    {
      question: "What is MovieFlix?",
      answer: "MovieFlix is a streaming platform that offers a wide selection of movies and TV shows for your entertainment."
    },
    {
      question: "How much does MovieFlix cost?",
      answer: "We offer different subscription plans to suit your needs. Check our pricing page for current rates and special offers."
    },
    {
      question: "Can I watch MovieFlix on multiple devices?",
      answer: "Yes, you can stream MovieFlix on multiple devices depending on your subscription plan."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time through your account settings. Your service will continue until the end of your billing period."
    },
    {
      question: "Is MovieFlix available in my country?",
      answer: "MovieFlix is available in many countries worldwide. Check our availability page for specific country information."
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Find answers to common questions about MovieFlix
            </p>
          </div>
          
          <div className="mt-12 space-y-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <div className="px-6 py-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}