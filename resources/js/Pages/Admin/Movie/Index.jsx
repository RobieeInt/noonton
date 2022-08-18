import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/Button";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import FlashMessage from "@/Components/FlashMessage";

export default function Index({ auth, movies, flashMessage }) {
    const { delete: destroy, put } = useForm();
    const [Search, setSearch] = useState("");
    const [filteredTitle, setFilteredTitle] = useState([]);

    //expand image, description & delete button
    const ExpandedComponent = ({ data }) => (
        <div className="text-center">
            <div>
                <h3 className="text-green-600">
                    <strong>Thumbnail</strong>
                </h3>
                <img
                    alt={data.title}
                    src={`/storage/${data.thumbnail}`}
                    className="w-32 rounded-md mx-auto"
                />
                <p className="text-green-600">
                    <strong>Description</strong>
                </p>
                <p className="">{data.description}</p>
            </div>
            <div
                onClick={() => {
                    data.deleted_at
                        ? put(
                              route("admin.dashboard.movie.restore", {
                                  id: data.id,
                              })
                          )
                        : destroy(
                              route("admin.dashboard.movie.destroy", {
                                  id: data.id,
                              })
                          );
                }}
            >
                {data.deleted_at ? (
                    <Button
                        color="green"
                        className="hover:bg-green-500 hover:text-black"
                        size="sm"
                    >
                        Restore
                    </Button>
                ) : (
                    <Button
                        variant="danger"
                        className="hover:bg-red-500 hover:text-black"
                        size="sm"
                    >
                        Delete
                    </Button>
                )}
            </div>
        </div>
    );
    const columns = [
        {
            name: "Action",
            cell: (row) => (
                <Link
                    href={route("admin.dashboard.movie.edit", { id: row.id })}
                >
                    Edit
                </Link>

                //delete button
            ),
            //double cell
            // cell: (row) => (
            //     <Link
            //         href={route("admin.dashboard.movie.edit", { id: row.id })}
            //     >
            //         Edit
            //     </Link>
            //     <Link
            //         href={route("admin.dashboard.movie.delete", { id: row.id })}
            //     >
            //         Delete
            //     </Link>
            // ),
            width: "100px",
        },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
            // width: "350px",
        },
        {
            name: "Year",
            selector: (row) => row.year,
            sortable: true,
            width: "100px",
        },
        {
            name: "Category",
            selector: (row) => row.category,
            sortable: true,
            // width: "100px",
        },
        {
            name: "Daftar Atas",
            selector: (row) => row.featured,
            width: "130px",
            sortable: true,
        },
        {
            name: "Video URL",
            selector: (row) => row.video_url,
            // width: "100px",
        },
    ];

    //map data to display
    const data = movies.map((movie) => {
        return {
            title: movie.title,
            year: movie.year,
            category: movie.category,
            description: movie.description,
            video_url: movie.video_url,
            thumbnail: movie.thumbnail,
            deleted_at: movie.deleted_at,
            //Ternary operator buat ngecek apakah daftaratas atau bukan
            is_featured: movie.is_featured,

            id: movie.id,
        };
    });

    //useeffect to filter by title, description, category, year, kalo pake ini kaga ngerefresh tablenya
    // useEffect(() => {
    //     const result = data.filter((item) => {
    //         return (
    //             item.title.toLowerCase().includes(Search.toLowerCase()) ||
    //             item.description.toLowerCase().includes(Search.toLowerCase()) ||
    //             item.category.toLowerCase().includes(Search.toLowerCase()) ||
    //             item.year.toString().toLowerCase().match(Search.toLowerCase()) //tahun di convert dlu jadi string
    //         );
    //     });
    //     setFilteredTitle(result);
    // }, [Search]);

    //filtered data dan refresh tabelnya
    const filteredData = data
        .filter((item) => {
            return (
                item.title.toLowerCase().includes(Search.toLowerCase()) ||
                item.description.toLowerCase().includes(Search.toLowerCase()) ||
                item.category.toLowerCase().includes(Search.toLowerCase()) ||
                item.year.toString().toLowerCase().match(Search.toLowerCase()) //tahun di convert dlu jadi string
            );
        })
        .map((item) => {
            return {
                title: item.title,
                year: item.year,
                category: item.category,
                description: item.description,
                video_url: item.video_url,
                thumbnail: item.thumbnail,
                deleted_at: item.deleted_at,
                //Ternary operator buat ngecek apakah daftaratas atau bukan
                featured: item.is_featured == true ? "Ya" : "Nggak",
                id: item.id,
            };
        })
        .sort((a, b) => {
            return a.id - b.id;
        })
        .reverse();

    // console.log(filteredData);

    return (
        <>
            <Head title="Admin Dashboard - Paket Berlangganan" />
            <Authenticated auth={auth}>
                <Link href={route("admin.dashboard.movie.create")}>
                    <Button
                        type="button"
                        className="w-44 mb-4 mt-2 hover:bg-green-500 hover:text-white"
                    >
                        {" "}
                        Create
                    </Button>
                </Link>
                {flashMessage?.message && (
                    <FlashMessage message={flashMessage.message} />
                )}
                <DataTable
                    columns={columns}
                    data={filteredData}
                    expandableRows
                    expandOnRowClicked={true}
                    expandableRowsComponent={ExpandedComponent}
                    pagination={true}
                    selectableRowsHighlight={true}
                    highlightOnHover
                    sortIcon={true}
                    fixedHeader
                    responsive={true}
                    subHeaderWrap
                    subHeader
                    subHeaderComponent={
                        <input
                            type="text"
                            placeholder="Search ..."
                            className="form-control border border-green-200 bg-gray-200 rounded-lg px-4 py-2"
                            value={Search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    }
                />
            </Authenticated>
        </>
    );
}
