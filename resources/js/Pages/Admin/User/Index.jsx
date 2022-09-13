import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/Button";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import FlashMessage from "@/Components/FlashMessage";

export default function Index({ auth, user, flashMessage }) {
    console.log(user);
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
            </Authenticated>
        </>
    );
}
