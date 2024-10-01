import React from 'react';
import planData from '@/utils/planData';
import PlanItemCard from './_components/PlanItemCard';

function Upgrade() {
    return (
        <div className='relative min-h-screen bg-gray-100 overflow-hidden'>
            <div className='absolute inset-0 -z-10'>
                <div className='absolute inset-0 flex justify-center items-center'>
                    <div className='absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-yellow-200 to-pink-200 opacity-40 rounded-full animate-pulse'></div>
                    <div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-teal-200 to-blue-200 opacity-40 rounded-full animate-pulse'></div>
                </div>
            </div>
            <div className='relative z-10 text-center py-16'>
                <h2 className='text-5xl font-extrabold text-gray-900 mb-6'>Upgrade Your Plan</h2>
                <p className='text-xl text-gray-600 mb-12'>Experience unlimited mock interviews with our premium plans. Choose the plan that fits your needs and unlock all features.</p>
                <div className='mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
                    {planData.map((plan, index) => (
                        <PlanItemCard plan={plan} key={index} />
                    ))}
                </div>
            </div>
            <svg className='absolute inset-0 -z-10' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="none">
                <circle cx="150" cy="150" r="150" fill="rgba(255, 255, 255, 0.2)" />
                <circle cx="800" cy="800" r="150" fill="rgba(0, 255, 255, 0.2)" />
                <circle cx="400" cy="600" r="150" fill="rgba(255, 0, 255, 0.2)" />
            </svg>
        </div>
    );
}

export default Upgrade;
