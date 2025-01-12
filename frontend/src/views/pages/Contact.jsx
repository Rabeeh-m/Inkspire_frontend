import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";

function Contact() {
    return (
        <>
            <Header />
            <section className="mt-10">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold">Contact Us</h1>
                        <p className="mt-4 text-lg text-gray-600">
                            We'd love to hear from you! Reach out to us for any
                            inquiries or support.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Information Section */}
            <section className="pt-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-2xl font-semibold">
                                Head Office
                            </h3>
                            <p className="mt-2">
                                123, 4th Floor, MG Road, Bangalore, Karnataka,
                                560001
                            </p>
                            <p className="mt-2">
                                Call:{" "}
                                <a href="#" className="text-blue-600 underline">
                                    +123 4567 890 (Toll-free)
                                </a>
                            </p>
                            <p className="mt-2">
                                Email:{" "}
                                <a href="#" className="text-blue-600 underline">
                                    inkspire@gmail.com
                                </a>
                            </p>
                            <p className="mt-2">
                                Support time: Monday to Saturday
                                <br />
                                9:30 am to 6:00 pm
                            </p>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-2xl font-semibold">
                                Branch Office
                            </h3>
                            <p className="mt-2">
                                ABC Business Center, Fort Road, Kannur, Kerala -
                                670001
                            </p>
                            <p className="mt-2">
                                Call:{" "}
                                <a href="#" className="text-blue-600 underline">
                                    +123 4567 890 (Toll-free)
                                </a>
                            </p>
                            <p className="mt-2">
                                Email:{" "}
                                <a href="#" className="text-blue-600 underline">
                                    inkspire@gmail.com
                                </a>
                            </p>
                            <p className="mt-2">
                                Support time: Monday to Saturday
                                <br />
                                9:00 am to 5:30 pm
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="pt-10 pb-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold">
                                How can I contact support?
                            </h3>
                            <p className="mt-2 text-gray-600">
                                You can contact our support team via the contact
                                form below or by calling our toll-free number.
                            </p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold">
                                What is your response time?
                            </h3>
                            <p className="mt-2 text-gray-600">
                                We strive to respond to all inquiries within 24
                                hours on business days.
                            </p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold">
                                Can I visit your office directly?
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Yes, you are welcome to visit our offices during
                                our support hours listed above.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="pt-10 bg-gray-100 pb-10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold">
                            Send us a message
                        </h2>
                        <p className="text-gray-600">
                            Please fill in the form below, and we will get back
                            to you as soon as possible.
                        </p>
                    </div>

                    <form className="space-y-4 max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    id="con-name"
                                    name="name"
                                    placeholder="Name"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    id="con-email"
                                    name="email"
                                    placeholder="E-mail"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                        </div>

                        <div>
                            <input
                                type="text"
                                id="con-subject"
                                name="subject"
                                placeholder="Subject"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <textarea
                                id="con-message"
                                name="message"
                                rows={6}
                                placeholder="Message"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            ></textarea>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                Send Message{" "}
                                <i className="fas fa-paper-plane ml-2"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Contact;
