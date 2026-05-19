import React, { useState } from "react";
import axios from "axios";
import apiUrl from "../../shared/utils/apiUrl";
import { toast } from "sonner";
import { Mail, Phone, Package, HeadphonesIcon } from "lucide-react";

export default function ContactSupport() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message || !formData.subject) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${apiUrl}contact`, {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      toast.success("Message sent successfully. Our team will contact you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display-lg text-[40px] text-[#06373A] mb-4">
            How can we assist you?
          </h1>
          <p className="font-body-md text-[15px] text-[#555a5b] leading-relaxed">
            Whether you need clinical skincare advice, have questions about your regimen, or need help with an order, our specialists are here to guide you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Contact Info */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            
            {/* Consultations Card */}
            <div className="bg-[#E8EFF0] p-8 rounded-2xl border border-[#E8E4DE]/50 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="w-24 h-24 bg-white/40 rounded-full absolute -top-8 -right-8 transition-transform group-hover:scale-110"></div>
              <HeadphonesIcon size={24} className="text-[#06373A] mb-6 relative z-10" />
              <h3 className="font-display-lg text-[20px] text-[#06373A] mb-2 relative z-10">
                Clinical Consultations
              </h3>
              <p className="font-body-md text-[13px] text-[#555a5b] mb-6 relative z-10">
                Speak directly with our skincare experts for personalized advice.
              </p>
              <div className="space-y-3 relative z-10 border-t border-[#06373A]/10 pt-6">
                <a href="mailto:consult@luminaskin.com" className="flex items-center gap-3 text-[13px] font-semibold text-[#06373A] hover:underline">
                  <Mail size={16} /> consult@dermacare.com
                </a>
                <a href="tel:+18005550199" className="flex items-center gap-3 text-[13px] font-semibold text-[#06373A] hover:underline">
                  <Phone size={16} /> +1 (800) 555-0199
                </a>
              </div>
            </div>

            {/* Order Support Card */}
            <div className="bg-white p-8 rounded-2xl border border-[#E8E4DE] hover:shadow-md transition-shadow">
              <Package size={24} className="text-[#06373A] mb-6" />
              <h3 className="font-display-lg text-[20px] text-[#06373A] mb-2">
                Order Support
              </h3>
              <p className="font-body-md text-[13px] text-[#555a5b] mb-6">
                Questions about tracking, returns, or shipping details.
              </p>
              <div className="border-t border-[#E8E4DE] pt-6">
                <a href="mailto:support@luminaskin.com" className="flex items-center gap-3 text-[13px] font-semibold text-[#06373A] hover:underline">
                  <Mail size={16} /> support@dermacare.com
                </a>
              </div>
            </div>

          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-2/3 bg-white border border-[#E8E4DE] rounded-2xl p-8 lg:p-12 shadow-sm">
            <h2 className="font-display-lg text-[28px] text-[#06373A] mb-8">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-[#06373A] mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Jane"
                    className="w-full h-12 px-4 border border-[#E8E4DE] rounded-xl text-sm bg-white outline-none focus:border-[#06373A] transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-[#06373A] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full h-12 px-4 border border-[#E8E4DE] rounded-xl text-sm bg-white outline-none focus:border-[#06373A] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-[#06373A] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full h-12 px-4 border border-[#E8E4DE] rounded-xl text-sm bg-white outline-none focus:border-[#06373A] transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-[#06373A] mb-2">
                    Topic
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full h-12 px-4 border border-[#E8E4DE] rounded-xl text-sm bg-white outline-none focus:border-[#06373A] transition-all appearance-none"
                    required
                  >
                    <option value="" disabled>Select an inquiry type</option>
                    <option value="Product Question">Product Question</option>
                    <option value="Order Status">Order Status</option>
                    <option value="Returns">Returns / Exchanges</option>
                    <option value="Clinical Advice">Clinical Advice</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-wider uppercase text-[#06373A] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="How can we help you today?"
                  className="w-full p-4 border border-[#E8E4DE] rounded-xl text-sm bg-white outline-none focus:border-[#06373A] transition-all resize-none"
                  required
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#032b26] text-white px-8 py-4 rounded-xl font-semibold text-[13px] tracking-widest uppercase hover:bg-[#06373A] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Inquiry ▻'}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
