import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/Button";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import FlashMessage from "@/Components/FlashMessage";

export default function Index({ auth, flashMessage, movies }) {
    const { delete: destroy } = useForm();
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
                {flashMessage?.message && (
                    <FlashMessage message={flashMessage.message} />
                )}
                <table className="w-full border-collapse border-solid cell--width3 border-2">
                    <thead className="border-2">
                        <tr>
                            <th className="border">Title</th>
                            <th className="border">Description</th>
                            <th className="border">Year</th>
                            <th className="border">Category</th>
                            <th className="border">Video URL</th>
                            <th className="border">Thumbnail</th>
                            <th className="border">Rating</th>
                            <th className="border">Featured</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody className="border-bottom-3">
                        {movies.map((movie) => (
                            <tr key={movie.id}>
                                <td className="text-left p-5 border">
                                    {movie.title}
                                </td>
                                <td className="text-left p-5 border">
                                    {movie.description}
                                </td>
                                <td className="text-left p-5 border">
                                    {movie.year}
                                </td>
                                <td className="text-left p-5 border">
                                    {movie.category}
                                </td>
                                <td className="text-left p-5 border">
                                    {movie.video_url}
                                </td>
                                <td className="text-left p-5 border">
                                    <img
                                        alt={movie.title}
                                        src={`/storage/${movie.thumbnail}`}
                                        className="w-32 rounded-md"
                                    />
                                </td>
                                <td className="text-left p-5 border">
                                    {movie.rating}
                                </td>
                                <td className="text-left p-5 border">
                                    {movie.is_featured === 1 ? "Ya" : "Nggak"}
                                </td>
                                <td className="text-left p-5 border">
                                    <Link
                                        href={route(
                                            "admin.dashboard.movie.edit",
                                            {
                                                id: movie.id,
                                            }
                                        )}
                                    >
                                        <Button
                                            type="button"
                                            className="w-auto mb-1 mt-1 hover:bg-green-500 hover:text-black"
                                        >
                                            {" "}
                                            Edit
                                        </Button>
                                    </Link>
                                    <div
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    "Hapus Data Movie?"
                                                )
                                            ) {
                                                destroy(
                                                    route(
                                                        "admin.dashboard.movie.destroy",
                                                        {
                                                            id: movie.id,
                                                        }
                                                    )
                                                );
                                            }
                                        }}
                                    >
                                        <Button type="button" variant="danger">
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Authenticated>
        </>
    );
}
