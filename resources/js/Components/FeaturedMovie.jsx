import { Link } from "@inertiajs/inertia-react";
import Proptypes from "prop-types";

FeaturedMovie.propTypes = {
    slug: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    genres: Proptypes.string.isRequired,
    thumbnail: Proptypes.string.isRequired,
    rating: Proptypes.number,
    year: Proptypes.number,
};

export default function FeaturedMovie({
    slug,
    title,
    thumbnail,
    rating = 0,
    genres,
    year = "XXXX",
}) {
    return (
        <>
            <div className="absolute overflow-hidden group mr-[30px]">
                {/* <!-- Movie Thumbnail --> */}
                <img
                    src={thumbnail}
                    className="object-cover rounded-[30px] w-[520px] h-[340px] brightness-50"
                    alt=""
                />
                {/* <!-- rating --> */}
                <div className="rating absolute top-0 left-0">
                    <div className="p-[30px] flex items-center gap-1">
                        <img src="/icons/ic_star.svg" alt="" />
                        <span className="text-sm font-medium text-white mt-1">
                            {rating.toFixed(1)}/5.0
                        </span>
                    </div>
                </div>
                {/* <!-- bottom detail --> */}
                <div
                    className="absolute bottom-0 h-[100px] left-0 right-0 bg-gradient-to-t from-black rounded-bl-[28px]
                                rounded-br-[28px] flex justify-between items-center px-7 h-[130px]"
                >
                    <div>
                        <div className="font-medium text-[22px] text-white">
                            {title}
                        </div>
                        <p className="mb-0 text-white text-sm font-light">
                            {year}
                        </p>
                        <p className="mb-0 text-white text-sm font-light">
                            {genres}
                        </p>
                    </div>
                    <div className="translate-x-[100px] group-hover:translate-x-0 transition ease-in-out duration-500">
                        <img src="/icons/ic_play.svg" width="50" alt="" />
                    </div>
                </div>
                <Link
                    href={route("type.movie.show", slug)}
                    state={{ slug }}
                    className="inset-0 absolute z-50"
                ></Link>
            </div>
        </>
    );
}
