import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex items-top justify-center min-h-screen bg-black dark:bg-gray-900 sm:items-center sm:pt-0">
                {/* <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="text-sm text-gray-700 underline"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="text-lg text-white underline hover:text-green-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="ml-4 text-lg text-white underline hover:text-green-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div> */}
                {/* // landing page content */}
                <div className="h-full">
                    {/* <!--Nav--> */}
                    <div className="w-full container mx-auto">
                        <div className="w-full flex items-center justify-between">
                            <Link
                                href={route("login")}
                                className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                            >
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-yellow-200 to-green-200">
                                    Robby Hernowo
                                </span>
                            </Link>

                            <div className="flex w-1/2 justify-end content-center">
                                {/* //Link to login page */}
                                <Link
                                    href={route("login")}
                                    className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-yellow-200 to-green-400 no-underline hover:text-green-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-yellow-200 to-green-400 hover:text-green-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                                >
                                    Daftar
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* <!--Main--> */}
                    <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row sm:items-center items-center">
                        {/* <!--Left Col--> */}
                        <div className="flex flex-col w-full xl:w-2/5 justify-center  sm:content-center overflow-y-hidden">
                            <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-yellow-200 to-green-200">
                                    Hallo World
                                </span>
                            </h1>
                            <p className="leading-normal text-base md:text-2xl text-white mb-8 text-center md:text-left">
                                I'm a full-stack web developer and a self-taught
                                programmer.
                            </p>
                            {/* //div button login */}
                            <div className="flex  pt-4 justify-center">
                                <Link
                                    href={route("login")}
                                    className=" bg-gradient-to-r from-green-400 to to-yellow-700 hover:from-green-500 hover:to-yellow-600 text-white font-bold py-2 px-3 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                >
                                    Get started
                                </Link>
                            </div>
                        </div>

                        {/* <!--Right Col--> */}
                        <div className="w-full xl:w-3/5 p-12 overflow-hidden">
                            <img
                                className="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"
                                src="/images/hola.png"
                            />
                        </div>

                        {/* <!--Footer--> */}
                        <div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
                            <a
                                className="text-gray-500 no-underline hover:no-underline"
                                href="#"
                            >
                                &copy; App 2020
                            </a>
                            <br />
                            <a
                                className="text-gray-500 no-underline hover:no-underline"
                                href="https://www.robbyhernowo.com"
                            >
                                Robby Hernowo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
