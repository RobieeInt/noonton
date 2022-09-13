import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/inertia-react";
import Flickity from "react-flickity-component";
import FeaturedMovie from "@/Components/FeaturedMovie";
import CardMovie from "@/Components/CardMovie";

export default function Dashboard({ auth, featuredMovies, movies }) {
    const flickityOptions = {
        cellAlign: "left",
        contain: true,
        groupCells: 1,
        wrapAround: false,
        pageDots: false,
        prevNextButtons: false,
        draggable: ">1",
        autoPlay: 1000,
    };

    return (
        <>
            <Head title="Dashboard">
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                />
            </Head>
            <Authenticated auth={auth}>
                <div>
                    <div className="font-semibold text-[22px] text-black  mb-4 mt-5">
                        Video Baru yang bisa Kamu lihat di sini
                    </div>
                    <Flickity className="gap-[30px]" options={flickityOptions}>
                        {featuredMovies.map((featuredMovie) => (
                            <FeaturedMovie
                                key={featuredMovie.id}
                                slug={featuredMovie.slug}
                                title={featuredMovie.title}
                                genres={featuredMovie.category}
                                thumbnail={featuredMovie.thumbnail}
                                rating={featuredMovie.rating}
                                description={featuredMovie.description}
                                year={featuredMovie.year}
                            />
                        ))}
                    </Flickity>
                </div>
                <div className="mt-[50px]">
                    <div className="font-semibold text-[22px] text-black mb-4">
                        Lihat Video Lainnya
                    </div>
                    <Flickity className="gap-[30px]" options={flickityOptions}>
                        {movies.map((movie) => (
                            <CardMovie
                                key={movie.id}
                                slug={movie.slug}
                                title={movie.title}
                                genres={movie.category}
                                thumbnail={movie.thumbnail}
                                rating={movie.rating}
                                year={movie.year}
                            />
                        ))}
                    </Flickity>
                </div>
            </Authenticated>
        </>
    );
}
