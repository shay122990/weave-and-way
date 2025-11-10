"use client";

import Image from "next/image";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Email sending error:", error);
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 2500);
  };

  const getButtonText = () => {
    if (status === "success") return "Message Sent!";
    if (status === "error") return "Failed to Send";
    return "Send Message";
  };

  const getButtonClasses = () => {
    if (status === "success") return "bg-green-600";
    if (status === "error") return "bg-red-600";
    return "bg-black hover:bg-purple-900";
  };

  return (
    <section className="bg-white text-gray-800 min-h-screen py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          We’d love to hear from you — whether it’s about a project, a
          partnership, or a fabric you’ve fallen in love with.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold">Contact Details</h2>
            <p>
              Email:{" "}
              <a
                href="mailto:demo.shay.dev@gmail.com"
                className="text-blue-500 hover:underline"
              >
                hello@weaveandway.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:+971500000000"
                className="text-blue-500 hover:underline"
              >
                +971 50 000 0000
              </a>
            </p>
            <p>Location: Dubai, United Arab Emirates</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Business Hours</h2>
            <p>Mon - Fri: 9am – 6pm</p>
            <p>Saturday: 10am – 4pm</p>
            <p>Sunday: Closed</p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-md">
            <Image
              src="/contact/map.jpg"
              alt="Map"
              width={600}
              height={400}
              className="object-cover"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            disabled={status === "success"}
            className={`w-full text-white py-3 rounded-lg font-semibold transition ${getButtonClasses()}`}
          >
            {getButtonText()}
          </button>
        </form>
      </div>
    </section>
  );
}
