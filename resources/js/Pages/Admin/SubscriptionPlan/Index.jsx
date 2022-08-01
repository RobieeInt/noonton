import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/Button";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";

export default function Index({ auth, movies }) {
    const [Search, setSearch] = useState("");
    const [filteredTitle, setFilteredTitle] = useState([]);

    //expand image & description
    const ExpandedComponent = ({ data }) => (
        <div className="text-center">
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
            // width: "350px",
        },
        {
            name: "Year",
            selector: (row) => row.year,
            // width: "100px",
        },
        {
            name: "Category",
            selector: (row) => row.category,
            // width: "100px",
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

            id: movie.id,
        };
    });

    //useeffect to filter by title
    useEffect(() => {
        const result = data.filter((item) => {
            return item.title.toLowerCase().match(Search.toLowerCase());
        });
        setFilteredTitle(result);
    }, [Search]);

    return (
        <>
            <Head title="Admin Dashboard - Subscription Plan" />
            <Authenticated auth={auth}>
                <Link href={route("admin.dashboard.subscriptionPlan.create")}>
                    <Button
                        type="button"
                        className="w-44 mb-4 mt-2 hover:bg-green-500 hover:text-white"
                    >
                        {" "}
                        Create
                    </Button>
                </Link>
                <DataTable
                    columns={columns}
                    data={filteredTitle}
                    expandableRows
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
                            placeholder="Search"
                            className="form-control outline-green-200 bg-green-200"
                            value={Search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    }
                />
            </Authenticated>
        </>
    );
}
