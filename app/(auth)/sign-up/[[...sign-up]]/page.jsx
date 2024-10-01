// import { SignUp } from "@clerk/nextjs";

// export default function Page() {
//   return <SignUp />;
// }

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 shadow-xl rounded-lg overflow-hidden bg-white">
        <section className="relative flex items-center bg-gray-900 lg:col-span-5 xl:col-span-6">
          <img
            alt="Office setup"
            src="https://images.pexels.com/photos/4467687/pexels-photo-4467687.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />

          <div className="relative p-8 lg:p-12 bg-black bg-opacity-30 w-full h-full flex flex-col justify-center items-center text-center">
            <a className="block text-white mb-8" href="/">
              <span className="sr-only">Home</span>
              <svg className="w-12 h-12 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 18.5A2.493 2.493 0 0 1 7.51 20H7.5a2.468 2.468 0 0 1-2.4-3.154 2.98 2.98 0 0 1-.85-5.274 2.468 2.468 0 0 1 .92-3.182 2.477 2.477 0 0 1 1.876-3.344 2.5 2.5 0 0 1 3.41-1.856A2.5 2.5 0 0 1 12 5.5m0 13v-13m0 13a2.493 2.493 0 0 0 4.49 1.5h.01a2.468 2.468 0 0 0 2.403-3.154 2.98 2.98 0 0 0 .847-5.274 2.468 2.468 0 0 0-.921-3.182 2.477 2.477 0 0 0-1.875-3.344A2.5 2.5 0 0 0 14.5 3 2.5 2.5 0 0 0 12 5.5m-8 5a2.5 2.5 0 0 1 3.48-2.3m-.28 8.551a3 3 0 0 1-2.953-5.185M20 10.5a2.5 2.5 0 0 0-3.481-2.3m.28 8.551a3 3 0 0 0 2.954-5.185"
                />
              </svg>
            </a>

            <h2 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Welcome to nexStep.AI
            </h2>

            <p className="mt-4 leading-relaxed text-white/90 text-lg">
              Practice and perfect your interview skills with our AI-powered mock interview platform. Prepare for your next big opportunity with confidence.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center p-8 lg:col-span-7 xl:col-span-6 bg-white">

          <div className="mt-8">
            <SignUp />
          </div>

        </main>
      </div>
    </section>
  );
}
