import React, { useState } from "react";
import useGetFAQs from "../hooks/useGetFAQs";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQs() {
  const { data, isLoading, isError } = useGetFAQs();
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState(null);

  const faqs = data?.data || [];
  
  // Extract unique categories
  const categories = ["All", ...new Set(faqs.map(faq => faq.category).filter(Boolean))];

  // Filter FAQs by category
  const filteredFaqs = activeCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] py-24">
        <div className="mx-auto max-w-4xl px-6 animate-pulse">
          <div className="h-10 w-64 bg-[#EAEAEA] rounded mx-auto mb-12"></div>
          <div className="flex gap-4 justify-center mb-12">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-10 w-24 bg-[#EAEAEA] rounded-full"></div>)}
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-16 w-full bg-[#EAEAEA] rounded-xl"></div>)}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] py-24 flex items-center justify-center">
        <div className="text-center text-[#06373A]">
          Failed to load FAQs. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display-lg text-[40px] text-[#06373A] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="font-body-md text-[15px] text-[#555a5b] leading-relaxed">
            Everything you need to know about our products, orders, and clinical approach.
          </p>
        </div>

        {/* Categories */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenId(null);
                }}
                className={`px-6 py-2 rounded-full text-[13px] font-bold tracking-wider uppercase transition-colors ${
                  activeCategory === category 
                    ? "bg-[#06373A] text-white" 
                    : "bg-white text-[#06373A] border border-[#E8E4DE] hover:bg-[#E8EFF0]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <p className="text-center text-[#555a5b]">No FAQs available for this category.</p>
          ) : (
            filteredFaqs.map((faq) => (
              <div 
                key={faq.faq_id} 
                className={`bg-white border transition-colors duration-300 rounded-xl overflow-hidden ${
                  openId === faq.faq_id ? "border-[#06373A]" : "border-[#E8E4DE]"
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.faq_id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-display-lg text-[18px] text-[#06373A] pr-8">
                    {faq.question}
                  </span>
                  <span className="text-[#06373A] shrink-0">
                    {openId === faq.faq_id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openId === faq.faq_id ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="font-body-md text-[14px] text-[#555a5b] leading-relaxed pt-2 border-t border-[#E8E4DE]/50">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Support Link */}
        <div className="mt-16 text-center bg-[#E8EFF0] p-8 rounded-2xl border border-[#E8E4DE]/50">
          <h3 className="font-display-lg text-[20px] text-[#06373A] mb-2">
            Still have questions?
          </h3>
          <p className="font-body-md text-[14px] text-[#555a5b] mb-6">
            Our clinical support team is ready to assist you with any inquiries.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-[#032b26] text-white px-8 py-4 rounded-xl font-semibold text-[13px] tracking-widest uppercase hover:bg-[#06373A] transition-colors"
          >
            Contact Support
          </a>
        </div>

      </div>
    </div>
  );
}
