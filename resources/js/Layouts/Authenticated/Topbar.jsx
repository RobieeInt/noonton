import { useState, useRef } from "react";
import { Link } from "@inertiajs/inertia-react";

export default function Topbar({ name }) {
    const [dropdownOpen, setdropdownOpen] = useState(true);
    const dropdownTarget = useRef();

    const triggerDropdown = () => {
        if (dropdownOpen) {
            dropdownTarget.current.classList.remove("hidden");
        } else {
            dropdownTarget.current.classList.add("hidden");
        }
        setdropdownOpen(!dropdownOpen);
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    className="top-search"
                    placeholder="Search movie, cast, genre"
                />
                <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={triggerDropdown}
                >
                    <span className="text-black text-sm font-medium">
                        Hi, {name}
                    </span>
                    <div className="collapsible-dropdown flex flex-col gap-2 relative">
                        <div className="outline outline-2 outline-gray-2 p-[5px] rounded-full w-[60px] dropdown-button">
                            <img
                                src="/images/avatarr.jpg"
                                className="rounded-full object-cover w-full"
                                alt=""
                            />
                        </div>
                        <div
                            className="bg-white rounded-2xl text-black font-medium flex flex-col gap-1 absolute z-[999] right-0 top-[80px] min-w-[180px] hidden overflow-hidden"
                            ref={dropdownTarget}
                        >
                            <a
                                href="#!"
                                className="transition-all hover:bg-sky-100 p-4"
                            >
                                Dashboard
                            </a>
                            <a
                                href="#!"
                                className="transition-all hover:bg-sky-100 p-4"
                            >
                                Settings
                            </a>
                            <Link
                                href={route("logout")}
                                method="post"
                                className="transition-all hover:bg-sky-100 p-4"
                            >
                                Keluar
                            </Link>
                        </div>
                    </div>
                </div>
                <style jsx="true">
                    {`
                        .top-search {
                            background-image: url("/icons/ic_search.svg");
                        }
                    `}
                </style>
            </div>
        </>
    );
}
