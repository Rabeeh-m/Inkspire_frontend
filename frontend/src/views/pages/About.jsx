import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";

function About() {
    return (
        <>
            <Header />
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-6 lg:px-12">
                    {/* About Section */}
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-4xl font-extrabold text-gray-800 leading-tight mb-6">
                            Welcome to Our Blog Journey
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            At{" "}
                            <span className="font-bold text-gray-800">
                                BlogSphere
                            </span>
                            , we believe in the power of words and stories. Our
                            platform is where creativity meets curiosity,
                            providing a space for writers, creators, and readers
                            to explore, share, and connect. From expert insights
                            to personal journeys, our mission is to create a hub
                            for inspiration and knowledge.
                        </p>
                    </div>

                    {/* Highlights */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                        {[
                            {
                                title: "Empowering Writers",
                                description:
                                    "We provide tools, tips, and a supportive community to help writers share their stories and hone their craft.",
                                icon: "✍️",
                            },
                            {
                                title: "Diverse Stories",
                                description:
                                    "From tech trends to lifestyle, discover a diverse range of blogs that cater to every interest.",
                                icon: "📚",
                            },
                            {
                                title: "Community Focused",
                                description:
                                    "A vibrant community where readers and writers engage, connect, and grow together.",
                                icon: "🤝",
                            },
                        ].map((highlight, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-lg rounded-lg p-6 text-center"
                            >
                                <div className="text-4xl mb-4">
                                    {highlight.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    {highlight.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {highlight.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-6 lg:px-12">
                    <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">
                        Meet the Team Behind the Stories
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                name: "Muhammed Rabeeh",
                                role: "Editor-in-Chief",
                                img: "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=400&h=400&fit=crop&crop=faces",
                            },
                            {
                                name: "Liam Harper",
                                role: "Content Strategist",
                                img: "https://images.unsplash.com/photo-1544725176-7c40e5a2c9cf?q=80&w=400&h=400&fit=crop&crop=faces",
                            },
                            {
                                name: "Emily Clark",
                                role: "Social Media Manager",
                                img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&h=400&fit=crop&crop=faces",
                            },
                            {
                                name: "Noah Johnson",
                                role: "Tech Blogger",
                                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&fit=crop&crop=faces",
                            },
                        ].map((member, index) => (
                            <div
                                key={index}
                                className="text-center bg-gray-50 shadow-sm rounded-lg p-6"
                            >
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-24 h-24 mx-auto rounded-full mb-4"
                                />
                                <h5 className="text-lg font-bold text-gray-800">
                                    {member.name}
                                </h5>
                                <p className="text-sm text-gray-500">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-6 lg:px-12">
                    <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">
                        What We Offer
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Inspiring Stories",
                                description:
                                    "Discover compelling stories from creators, writers, and everyday heroes shaping our world.",
                                img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop",
                            },
                            {
                                title: "Latest Insights",
                                description:
                                    "Dive into the latest trends, data-driven insights, and in-depth analysis across industries.",
                                img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop",
                            },
                            {
                                title: "How-To Guides",
                                description:
                                    "Your go-to source for tutorials, tips, and practical advice to enhance your knowledge and skills.",
                                img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop",
                            },
                        ].map((service, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-lg rounded-lg overflow-hidden"
                            >
                                <img
                                    src={service.img}
                                    alt={service.title}
                                    className="w-full h-44 object-cover"
                                />
                                <div className="p-6">
                                    <h4 className="text-xl font-semibold text-gray-800 mb-3">
                                        {service.title}
                                    </h4>
                                    <p className="text-gray-600">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default About;
