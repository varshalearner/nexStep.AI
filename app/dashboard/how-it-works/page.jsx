"use client"
import React from 'react';

const HowItWorks = () => {
    return (
      <div id='how-it-works' className="min-h-screen flex flex-col bg-gray-100">
  
        <main className="flex-grow">
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">How It Works</h1>
  
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Step 1: Sign Up</h2>
                <p className="text-gray-600">Create your account on nexStep.AI to get started.</p>
              </div>
  
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Step 2: Customize</h2>
                <p className="text-gray-600">Customize your profile and preferences according to your job role and interview preferences.</p>
              </div>
  
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Step 3: Practice</h2>
                <p className="text-gray-600">Practice using AI-generated mock interviews tailored to your chosen settings.</p>
              </div>
  
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Step 4: Receive Feedback</h2>
                <p className="text-gray-600">Receive detailed feedback on your performance to improve your interview skills.</p>
              </div>
            </div>
          </section>
        </main>

      </div>
    );
  }

export default HowItWorks