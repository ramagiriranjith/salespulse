import React from 'react'

import SectionTitleBlack from '../common/SectionTitleWhite'

export default function About() {
    return (
        <section className="py-16 md:py-20 lg:py-28">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center justify-center">
                    {/* Left Section */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <div className="mb-9 px-4 lg:px-20">
                            <h3 className="text-4xl font-bold mb-6">
                                Empowering Bars and Restaurants with Insights
                            </h3>
                            <p className="text-lg">
                                Sales Pulse offers a powerful POS reporting system designed for bars and restaurants, delivering real-time insights through intuitive dashboards for enhanced decision-making and performance tracking.
                            </p>
                        </div>
                        <div className="mb-9 px-4 lg:px-20">
                            <div className="flex justify-center lg:justify-start gap-10">
                                <div>
                                    <p className="text-2xl font-semibold">150 +</p>
                                    <p>Join Us</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold">15</p>
                                    <p>Trusted by Professionals</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                        <div className="relative mx-auto max-w-[500px] aspect-[25/24]">
                            <img
                                src="/images/about/about.jpg"
                                alt="about image"
                                className="object-cover drop-shadow-3xl dark:hidden"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
