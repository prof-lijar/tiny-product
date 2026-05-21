import React from 'react';

interface HeroSectionProps {
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description, buttonText, buttonLink }) => {
    return (
        <section className="relative isolate px-6 pt-14 lg:px-8">
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
                <svg
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    viewBox="0 0 1155 678"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="url(#ecb5b0c9-546c-4772-8c71-b8d1d6da9f93)"
                        fillOpacity=".3"
                        d="M317.219 518.975L203.852 408.289C157.753 362.424 103.584 346.444 47.94 389.394C-6.733 432.345-16.767 498.365-.287 554.35c16.954 56.074 74.694 108.167 151.852 125.673C273.26 676.809 366.556 684.182 460.845 632.725L317.219 518.975z"
                    />
                    <defs>
                        <linearGradient
                            id="ecb5b0c9-546c-4772-8c71-b8d1d6da9f93"
                            x1="1155.49"
                            x2="-78.208"
                            y1="-.757"
                            y2="474.357"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#9089FC" />
                            <stop offset="1" stopColor="#FF80B5" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-64">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-900/10 hover:ring-gray-900/20">   Release now!   
                        <svg className="ml-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7H3a2 2 0 00-2 2v6a2 2 0 002 2h13.46c.955.312 1.859.624 2.75.937v-2.08A18.024 18.024 0 0018 11a18.024 18.024 0 00-1.449-2.853 6.78 6.78 0 01-1.448-1.816A6.573 6.573 0 0116 7a6.573 6.573 0 01-2.594.549zM18 7H7.47a6.53 6.53 0 001.16 1.29l4.471 5.08a.75.75 0 101.06-1.06l-4.472-5.08c-.25-.293-.614-.455-1-.455H18z" clipRule="evenodd" />
                        </svg>   
                    </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    {title}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    {description}
                </p>
                {buttonText && buttonLink && (
                    <div className="mt-10 flex items-center gap-x-6">
                        <a
                            href={buttonLink}
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {buttonText}
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HeroSection;
