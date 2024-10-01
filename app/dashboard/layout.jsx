// import React from 'react'
// import Header from './_components/Header'
// import Footer from './_components/Footer'

// function DashboardLayout({children}) {
//   return (
//     <div className='bg-gradient-to-r from-blue-200 to-blue-300 dark:bg-gray-900 min-h-screen flex flex-col'>
//         <Header/>
//         <div className='flex-1 mx-5 md:mx-20 lg:mx-36'>
//         {children}
//         </div>
//        <Footer />
//     </div>
//   )
// }

// export default DashboardLayout

import React from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';

function DashboardLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header />
            <main className="flex-1 container mx-auto p-8">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default DashboardLayout;
