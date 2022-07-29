import { Link } from "@inertiajs/inertia-react";
import PropTypes from "prop-types";

CardMovie.propTypes = {
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genres: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    rating: PropTypes.number,
    year: PropTypes.number,
};

export default function CardMovie({
    slug,
    title,
    thumbnail,
    rating = 0,
    genres,
    year = "XXXX",
}) {
    return (
        <>
            <div className="absolute group overflow-hidden mr-[30px] bg-blend-darken">
                <img
                    src={`/storage/${thumbnail}`}
                    className="object-cover rounded-[30px] h-[340px] w-[250px] brightness-50"
                    alt=""
                />
                <div className="rating absolute top-0 right-0">
                    <div className="p-[30px] flex items-center gap-1">
                        <img src="/icons/ic_star.svg" alt="" />
                        <span className="text-sm font-medium text-white mt-1">
                            {rating.toFixed(1)}
                        </span>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black rounded-bl-[28px] rounded-br-[28px]">
                    <div className="px-7 pb-7">
                        <div className="font-medium text-xl text-white">
                            {title}
                        </div>
                        <p className="mb-0 text-gray-300 text-base mt-[0px]">
                            {year}
                        </p>
                        <p className="mb-0 text-gray-300 text-base mt-[10px]">
                            {genres}
                        </p>
                    </div>
                </div>
                <div
                    className="absolute top-1/2 left-1/2 -translate-y-[500px] group-hover:-translate-y-1/2
                                -translate-x-1/2 z-20 transition ease-in-out duration-500"
                >
                    <img
                        src="/icons/ic_play.svg"
                        className=""
                        width="50"
                        alt=""
                    />
                </div>
                <Link
                    href={route("user.dashboard.movie.show", slug)}
                    slug={slug}
                    className="inset-0 absolute z-50"
                ></Link>
            </div>
        </>
    );
}
