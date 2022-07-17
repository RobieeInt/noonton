import ReactPlayer from "react-player";
import { Link } from "@inertiajs/inertia-react";
import PropTypes from "prop-types";

Show.propTypes = {
    slug: PropTypes.string,
    title: PropTypes.string,
};

export default function Show({ slug, title = "Title" }) {
    return (
        <>
            <section
                className="mx-auto w-screen h-screen relative watching-page font-poppins bg-form-bg"
                id="stream"
            >
                <div className="pt-[100px]">
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=uVfV95oW0NY&ab_channel=NgomonginFilm"
                        controls
                        width={"100%"}
                        height={"850px"}
                    />
                </div>

                <div className="absolute top-5 left-5 z-20">
                    <Link href={route("type.dashboard")}>
                        <img
                            src="/icons/ic_arrow-left-green.svg"
                            className="transition-all btn-back w-[46px]"
                            alt="stream"
                        />
                    </Link>
                </div>

                <div className="absolute title-video top-7 left-1/2 -translate-x-1/2 max-w-[310px] md:max-w-[620px] text-center">
                    <span className="font-medium text-2xl transition-all text-white drop-shadow-md select-none">
                        {slug} wew {title}
                    </span>
                </div>
            </section>
        </>
    );
}
