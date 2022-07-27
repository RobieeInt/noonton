import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/Button";
import { Link, Head } from "@inertiajs/inertia-react";

export default function Index({ auth }) {
    return (
        <>
            <Head title="Admin Dashboard" />
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
            </Authenticated>
        </>
    );
}
