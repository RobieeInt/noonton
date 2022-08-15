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

    //datatable export excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(movies);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        XLSX.writeFile(wb, "movies.xlsx");
    };

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
                    <Button color="green" size="sm">
                        Restore
                    </Button>
                ) : (
                    <Button variant="danger" size="sm">
                        Delete
                    </Button>
                )}
                {/* <Button type="button" className="w-24" variant="danger">
                    {data.deleted_at ? "Restore" : "Delete"}
                </Button> */}
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
            selector: (row) => {
                if (row.is_featured === 1) {
                    return "Ya";
                } else {
                    return "Tidak";
                }
            },
            width: "130px",
            sortable: true,
        },
        {
            name: "Video URL",
            selector: (row) => row.video_url,
            // width: "100px",
        },
    ];

    const data = movies.map((movie) => {
        return {
            title: movie.title,
            year: movie.year,
            category: movie.category,
            description: movie.description,
            video_url: movie.video_url,
            thumbnail: movie.thumbnail,
            deleted_at: movie.deleted_at,
            is_featured: movie.is_featured,

            id: movie.id,
        };
    });

    //filter title, description, category
    // const filteredData = data.filter((movie) => {
    //     return (
    //         movie.title.toLowerCase().includes(Search.toLowerCase()) ||
    //         movie.description.toLowerCase().includes(Search.toLowerCase()) ||
    //         movie.category.toLowerCase().includes(Search.toLowerCase())
    //     );
    // });

    //useeffect to filter by title, description, category, year
    useEffect(() => {
        const result = data.filter((item) => {
            return (
                item.title.toLowerCase().includes(Search.toLowerCase()) ||
                item.description.toLowerCase().includes(Search.toLowerCase()) ||
                item.category.toLowerCase().includes(Search.toLowerCase()) ||
                item.year.toString().toLowerCase().match(Search.toLowerCase()) //tahun di convert dlu jadi string
            );
        });
        setFilteredTitle(result);
    }, [Search]);

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
                    data={filteredTitle}
                    expandableRows
                    expandOnRowClicked={true}
                    expandableRowsComponent={ExpandedComponent}
                    pagination={true}
                    selectableRowsHighlight={true}
                    highlightOnHover
                    sortIcon={true}
                    fixedHeader
                    //actions export to excel
                    actions={
                        <button
                            className="btn btn-sm btn-info"
                            onClick={exportToExcel}
                        >
                            Export
                        </button>
                    }
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
