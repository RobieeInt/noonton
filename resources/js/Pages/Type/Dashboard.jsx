import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/inertia-react";
import Flickity from "react-flickity-component";
import FeaturedMovie from "@/Components/FeaturedMovie";
import CardMovie from "@/Components/CardMovie";

export default function Dashboard() {
    const flickityOptions = {
        cellAlign: "left",
        contain: true,
        groupCells: 1,
        wrapAround: false,
        pageDots: false,
        prevNextButtons: false,
        draggable: ">1",
    };

    return (
        <>
            <Head title="Dashboard">
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                />
            </Head>
            <Authenticated>
                <div>
                    <div className="font-semibold text-[22px] text-black mb-4 mt-5">
                        Featured Video
                    </div>
                    <Flickity className="gap-[30px]" options={flickityOptions}>
                        {[1, 2, 3, 4].map((i) => (
                            <FeaturedMovie
                                key={i}
                                slug={`Arsya-Movie-${i}`}
                                title={`Arsya Movie ${i}`}
                                genres="Comedy"
                                thumbnail="https://picsum.photos/200"
                                rating={i + 1}
                                year={2019 + i}
                            />
                        ))}
                    </Flickity>
                </div>
                <div className="mt-[50px]">
                    <div className="font-semibold text-[22px] text-black mb-4">
                        Browse
                    </div>
                    <Flickity className="gap-[30px]" options={flickityOptions}>
                        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <CardMovie
                                key={i}
                                slug={`Nihha-${i}`}
                                title={`Nigga ${i}`}
                                genres="Comedy"
                                thumbnail="https://picsum.photos/200/300"
                                rating={i + 1}
                                year={2029 + i}
                            />
                        ))}
                    </Flickity>
                </div>
            </Authenticated>
        </>
    );
}
