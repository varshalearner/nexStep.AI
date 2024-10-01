"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "./dashboard/_components/Header";
import Footer from "./dashboard/_components/Footer";
import { Button } from "@/components/ui/button";
import { FaRobot, FaChartLine, FaSmile, FaMobileAlt, FaRocket, FaLock, FaGlobe, FaStar } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Home() {
  const nextSectionRef = useRef(null);
  const router = useRouter();

  const scrollDown = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900 font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center flex-1 text-center p-8 bg-white text-gray-900 h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-500 opacity-20"></div>
        <div className="relative z-20 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold mb-4 sm:mb-6 lg:mb-8 text-shadow-lg">
            Revolutionize Your Career
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Experience the future of career preparation with our AI-driven platform.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12 sm:mb-16 justify-center">
            <Button
              size="lg"
              variant="primary"
              className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white py-3 px-6 rounded-lg shadow-xl duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              onClick={() => router.push("/dashboard")}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border border-blue-500 text-blue-500 py-3 px-6 rounded-lg shadow-xl transform transition-transform duration-300 hover:bg-blue-500 hover:text-white hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              onClick={() => router.push("/dashboard/how-it-works")}
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
          <button
            onClick={scrollDown}
            className="text-blue-600 bg-transparent hover:text-blue-800 transition duration-300 ease-in-out"
          >
            <svg
              className="w-10 h-10 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="relative bg-gradient-to-br from-purple-200 via-indigo-200 to-teal-200 py-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Floating Dots */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-64 h-64 rounded-full bg-gradient-to-r from-pink-200 to-yellow-200 opacity-50 animate-bounce"></div>
            <div className="w-48 h-48 rounded-full bg-gradient-to-r from-green-200 to-blue-200 opacity-50 animate-bounce"></div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-gray-900">
            Discover Our Unique Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="relative flex flex-col items-center p-8 bg-gradient-to-br from-white via-purple-100 to-purple-200 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500">
              <div className="absolute top-0 left-0 w-24 h-24 bg-purple-300 rounded-full -translate-x-8 -translate-y-8 animate-pulse"></div>
              <FaRocket className="text-5xl text-purple-600 mb-4 transform transition-transform duration-300 hover:rotate-12" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">Blazing Speed</h3>
              <p className="text-center text-gray-700">
                Experience lightning-fast performance with our optimized platform.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="relative flex flex-col items-center p-8 bg-gradient-to-br from-white via-teal-100 to-teal-200 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-300 rounded-full translate-x-8 -translate-y-8 animate-pulse"></div>
              <FaLock className="text-5xl text-teal-600 mb-4 transform transition-transform duration-300 hover:rotate-12" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">Top-Notch Security</h3>
              <p className="text-center text-gray-700">
                Protect your data with our state-of-the-art security measures.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="relative flex flex-col items-center p-8 bg-gradient-to-br from-white via-yellow-100 to-yellow-200 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500">
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-300 rounded-full -translate-x-8 translate-y-8 animate-pulse"></div>
              <FaGlobe className="text-5xl text-yellow-600 mb-4 transform transition-transform duration-300 hover:rotate-12" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">Global Reach</h3>
              <p className="text-center text-gray-700">
                Access it from anywhere around the world effortlessly.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="relative flex flex-col items-center p-8 bg-gradient-to-br from-white via-blue-100 to-blue-200 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500">
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-300 rounded-full translate-x-8 translate-y-8 animate-pulse"></div>
              <FaStar className="text-5xl text-blue-600 mb-4 transform transition-transform duration-300 hover:rotate-12" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">Exceptional Quality</h3>
              <p className="text-center text-gray-700">
                Enjoy high-quality features and services that exceed expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={nextSectionRef}
        className="bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 text-gray-900 py-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <svg
            className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4"
            width="600"
            height="600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="300" cy="300" r="250" fill="rgba(255, 255, 255, 0.1)" />
          </svg>
          <svg
            className="absolute bottom-0 right-0 -translate-x-1/4 translate-y-1/4"
            width="600"
            height="600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="300" cy="300" r="250" fill="rgba(0, 255, 255, 0.1)" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-900">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative flex flex-col items-center p-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-xl shadow-xl transform transition-transform duration-500 hover:scale-105 hover:rotate-2">
              <div className="absolute top-0 left-0 w-20 h-20 bg-blue-200 rounded-full opacity-50 animate-pulse"></div>
              <FaChartLine className="text-5xl text-blue-600 mb-4 transform hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">Performance Analysis</h3>
              <p className="text-center text-gray-700">
                Improve your practice experience through insightful feedback.
              </p>
            </div>
            <div className="relative flex flex-col items-center p-8 bg-gradient-to-br from-white via-green-50 to-green-100 rounded-xl shadow-xl transform transition-transform duration-500 hover:scale-105 hover:rotate-2">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-full opacity-50 animate-pulse"></div>
              <FaSmile className="text-5xl text-green-600 mb-4 transform hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">Personalized Experience</h3>
              <p className="text-center text-gray-700">
                Receive tailored experiences that match your career goals and preferences.
              </p>
            </div>
            <div className="relative flex flex-col items-center p-8 bg-gradient-to-br from-white via-yellow-50 to-yellow-100 rounded-xl shadow-xl transform transition-transform duration-500 hover:scale-105 hover:rotate-2">
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-yellow-200 rounded-full opacity-50 animate-pulse"></div>
              <FaMobileAlt className="text-5xl text-yellow-600 mb-4 transform hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">Mobile Friendly</h3>
              <p className="text-center text-gray-700">
                Access our platform from any device, ensuring convenience and flexibility.
              </p>
            </div>
            <div className="relative flex flex-col items-center p-8 bg-gradient-to-br from-white via-red-50 to-red-100 rounded-xl shadow-xl transform transition-transform duration-500 hover:scale-105 hover:rotate-2">
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-red-200 rounded-full opacity-50 animate-pulse"></div>
              <FaRobot className="text-5xl text-red-600 mb-4 transform hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">AI-Driven Insights</h3>
              <p className="text-center text-gray-700">
                Leverage advanced AI to get customized feedback and recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* AI Section */}
      <section className="relative bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-16">
        <div className="absolute inset-0 -z-10">
          <svg
            className="absolute top-0 left-0 w-1/2 h-full opacity-30"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
          >
            <circle cx="250" cy="250" r="200" fill="rgba(255, 255, 255, 0.2)" />
          </svg>
          <svg
            className="absolute bottom-0 right-0 w-1/2 h-full opacity-30"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
          >
            <circle cx="250" cy="250" r="200" fill="rgba(255, 255, 255, 0.3)" />
          </svg>
          <svg
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 opacity-10"
            width="600"
            height="600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M300 150L450 300M150 300L300 450"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="4"
            />
          </svg>
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-gray-900">
            Empowered by AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative flex flex-col items-center p-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 -z-10 bg-blue-200 opacity-20 rounded-lg"></div>
              <FaRobot className="text-6xl text-blue-600 mb-4 transform transition-transform duration-300 hover:scale-110" />
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Advanced Algorithms</h3>
              <p className="text-center text-gray-700">
                Our platform employs sophisticated AI algorithms for personalized question generation.
              </p>
            </div>
            <div className="relative flex flex-col items-center p-8 bg-gradient-to-br from-white via-teal-50 to-teal-100 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 -z-10 bg-teal-200 opacity-20 rounded-lg"></div>
              <FiThumbsUp className="text-6xl text-teal-600 mb-4 transform transition-transform duration-300 hover:scale-110" />
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Continuous Improvement</h3>
              <p className="text-center text-gray-700">
                Our AI learns from user interactions to continuously enhance its capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="relative bg-gray-50 py-16">
        <div className="absolute inset-0 -z-10">
          <svg
            className="absolute top-0 left-0 w-1/2 h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
          >
            <path
              fill="rgba(200, 200, 255, 0.1)"
              d="M0 0h500v500H0z"
              transform="rotate(45 250 250)"
            />
          </svg>
          <svg
            className="absolute bottom-0 right-0 w-1/2 h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
          >
            <path
              fill="rgba(200, 255, 200, 0.1)"
              d="M0 0h500v500H0z"
              transform="rotate(-45 250 250)"
            />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-gray-800">
            What Our Users Say
          </h2>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="w-full"
            effect="fade"
            speed={800}
          >
            <SwiperSlide>
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 -z-10 bg-blue-200 opacity-30 rounded-lg"></div>
                <p className="text-lg text-gray-700 mb-6">
                  "This platform revolutionized my preparation for interviews. The AI-generated questions were spot-on and the feedback was incredibly helpful."
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="User"
                    className="w-20 h-20 rounded-full border-4 border-blue-300 mr-6"
                  />
                  <div className="text-left">
                    <h4 className="text-2xl font-bold text-gray-800 mb-1">Jane Doe</h4>
                    <p className="text-gray-600">Software Engineer</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 -z-10 bg-teal-200 opacity-30 rounded-lg"></div>
                <p className="text-lg text-gray-700 mb-6">
                  "The insights and performance tracking are unmatched. I felt much more prepared and confident for my interviews."
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="User"
                    className="w-20 h-20 rounded-full border-4 border-teal-300 mr-6"
                  />
                  <div className="text-left">
                    <h4 className="text-2xl font-bold text-gray-800 mb-1">John Smith</h4>
                    <p className="text-gray-600">Data Scientist</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 -z-10 bg-pink-200 opacity-30 rounded-lg"></div>
                <p className="text-lg text-gray-700 mb-6">
                  "An amazing tool for interview preparation! The AI-generated questions and feedback helped me improve my skills rapidly."
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="User"
                    className="w-20 h-20 rounded-full border-4 border-pink-300 mr-6"
                  />
                  <div className="text-left">
                    <h4 className="text-2xl font-bold text-gray-800 mb-1">Emily Johnson</h4>
                    <p className="text-gray-600">Product Manager</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section> */}


      {/* FAQ Section */}
      <section className="relative bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 py-16">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute top-0 left-0 w-1/2 h-full transform -translate-x-1/4 -translate-y-1/4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="300" cy="300" r="300" fill="rgba(255, 255, 255, 0.15)" />
          </svg>
          <svg
            className="absolute bottom-0 right-0 w-1/2 h-full transform translate-x-1/4 translate-y-1/4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="300" cy="300" r="300" fill="rgba(200, 200, 255, 0.15)" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div className="relative bg-gradient-to-br from-white via-yellow-50 to-yellow-100 p-8 rounded-lg shadow-xl border border-gray-200 transform hover:shadow-2xl duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">How does the AI generate questions?</h3>
              <p className="text-gray-700">
                Our AI utilizes advanced algorithms to analyze job profiles and industry standards to generate highly relevant questions tailored to your mock interviews.
              </p>
            </div>
            <div className="relative bg-gradient-to-br from-white via-teal-50 to-teal-100 p-8 rounded-lg shadow-xl border border-gray-200 transform hover:shadow-2xl duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Can I access the platform on mobile devices?</h3>
              <p className="text-gray-700">
                Yes, our platform is fully optimized for mobile devices, ensuring a smooth and responsive experience on both smartphones and tablets.
              </p>
            </div>
            <div className="relative bg-gradient-to-br from-white via-purple-50 to-purple-100 p-8 rounded-lg shadow-xl border border-gray-200 transform hover:shadow-2xl duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">What kind of feedback will I receive?</h3>
              <p className="text-gray-700">
                You will receive comprehensive feedback on your responses, highlighting strengths and areas for improvement, based on your performance and ideal answers.
              </p>
            </div>
            <div className="relative bg-gradient-to-br from-white via-red-50 to-red-100 p-8 rounded-lg shadow-xl border border-gray-200 transform hover:shadow-2xl duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Is there a free trial available?</h3>
              <p className="text-gray-700">
                Yes, we offer a free trial period so you can explore all the features of our platform before committing to a subscription.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
