import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/Button";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import FlashMessage from "@/Components/FlashMessage";

export default function Index({ auth, subscriptionPlan, flashMessage }) {
    const { delete: destroy, put } = useForm();
    const [Search, setSearch] = useState("");
    const [filteredTitle, setFilteredTitle] = useState([]);

    const ExpandedComponent = ({ data }) => (
        <div className="text-center">
            <div>
                {/* Is Premium */}

                <h3 className="text-green-600">
                    <strong>Fitur</strong>
                </h3>
                <p>
                    {/* show json data with comma */}
                    {JSON.parse(data.features).join(", ")}
                    {/* {JSON.stringify(data.features)} */}
                </p>
                <p className="text-green-600">
                    <strong>Deskripsi</strong>
                </p>
                <p className="">
                    {/* show date with format dd-mm-yyyy */}
                    {new Date(data.created_at).toLocaleString("id-ID", {
                        timeZone: "Asia/Jakarta",
                        dateStyle: "full",
                        timeStyle: "short",
                    })}
                </p>
            </div>
            <div
                onClick={() => {
                    data.deleted_at
                        ? put(
                              route(
                                  "admin.dashboard.subscriptionPlan.restore",
                                  {
                                      id: data.id,
                                  }
                              )
                          )
                        : destroy(
                              route(
                                  "admin.dashboard.subscriptionPlan.destroy",
                                  {
                                      id: data.id,
                                  }
                              )
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

    //map data to display
    const data = subscriptionPlan.map((plan) => {
        return {
            id: plan.id,
            title: plan.name,
            price: plan.price,
            duration: plan.active_period_in_month,
            features: plan.features,
            premium: plan.is_premium,
            created_at: plan.created_at,
            deleted_at: plan.deleted_at,
            updated_at: plan.updated_at,
        };
    });

    //columns to display
    const columns = [
        {
            name: "Action",
            cell: (row) => (
                <Link
                    href={route("admin.dashboard.subscriptionPlan.edit", {
                        id: row.id,
                    })}
                >
                    Edit
                </Link>
            ),
        },
        {
            name: "Nama Paket",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Harga",
            selector: (row) => row.price,
            sortable: true,
        },
        {
            name: "Durasi / Bulan",
            //date format
            selector: (row) => row.duration,
            sortable: true,
        },
        {
            name: "Premium",
            selector: (row) => row.premium,
            sortable: true,
        },
    ];

    //search filter cara beda dengan movie
    const filteredData = data
        .filter((item) => {
            return (
                item.title.toLowerCase().includes(Search.toLowerCase()) ||
                item.price
                    .toString()
                    .toLowerCase()
                    .includes(Search.toLowerCase()) ||
                item.duration
                    .toString()
                    .toLowerCase()
                    .includes(Search.toLowerCase()) //yang bukan string di convert dlu jadi string
            );
        })
        .map((item) => {
            return {
                id: item.id,
                title: item.title,
                price: item.price,
                duration: item.duration,
                features: item.features,
                //Ternary operator buat ngecek apakah premium atau bukan
                premium: item.premium == true ? "Ya" : "Nggak",
                created_at: item.created_at,
                deleted_at: item.deleted_at,
            };
        })
        .sort((a, b) => {
            return a.id - b.id;
        })
        .reverse();

    return (
        <>
            <Head title="Admin Dashboard - Paket Berlangganan" />
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
