import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import Checkbox from "@/Components/Checkbox";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import ValidationErrors from "@/Components/ValidationErrors";
import { Inertia } from "@inertiajs/inertia";

export default function Edit({ auth, movie }) {
    const { data, setData, processing, errors } = useForm({
        ...movie, //ambil semua data movie
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            // event.target.type === "checkbox"
            //     ? event.target.checked
            //     : event.target.value,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        //cek thumnail biar ga duplikat
        if (data.thumbnail === movie.thumbnail) {
            delete data.thumbnail;
        }

        Inertia.post(route("admin.dashboard.movie.update", movie.id), {
            ...data,
            _method: "PUT",
        });
    };
    return (
        <>
            <Head title="Admin Update Movie" />
            <Authenticated auth={auth}>
                <h1 className="text-xl mt-4">Update Film : {movie.title} </h1>
                <hr className="mb-4" />

                {/* Error validasi */}
                <ValidationErrors errors={errors} />

                <form onSubmit={submit}>
                    <Label forInput="title" value="title" className="mt-4" />
                    <Input
                        defaultValue={movie.title}
                        className="mb-5"
                        placeholder="Update Judul Filmnya"
                        type="text"
                        name="title"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        isError={errors.title}
                    />
                    <Label
                        forInput="description"
                        value="description"
                        className="mt-4"
                    />
                    <Input
                        defaultValue={movie.description}
                        className="mb-5"
                        placeholder="Masukin Deskripsi Filmnya"
                        type="text"
                        name="description"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        isError={errors.description}
                    />
                    <Label forInput="year" value="year" className="mt-4" />
                    <Input
                        defaultValue={movie.year}
                        className="mb-5"
                        placeholder="Masukin Tahun Filmnya"
                        type="text"
                        name="year"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        isError={errors.year}
                    />
                    <Label
                        forInput="category"
                        value="category"
                        className="mt-4"
                    />
                    <Input
                        defaultValue={movie.category}
                        className="mb-5"
                        placeholder="Masukin Judul Filmnya"
                        type="text"
                        name="category"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        isError={errors.category}
                    />
                    <Label
                        forInput="video_url"
                        value="video_url"
                        className="mt-4"
                    />
                    <Input
                        defaultValue={movie.video_url}
                        className="mb-5"
                        placeholder="Masukin Url Filmnya"
                        type="text"
                        name="video_url"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        isError={errors.video_url}
                    />
                    <Label
                        forInput="thumbnail"
                        value="thumbnail"
                        className="mt-4"
                    />
                    <img
                        src={`/storage/${movie.thumbnail}`}
                        className="w-40 rounded-md"
                        alt=""
                    />
                    <Input
                        placeholder="Masukin thumbnaiL Filmnya"
                        type="file"
                        name="thumbnail"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        isError={errors.thumbnail}
                    />
                    <Label forInput="rating" value="rating" className="mt-4" />
                    <Input
                        defaultValue={movie.rating}
                        placeholder="Masukin rating Filmnya"
                        type="number"
                        name="rating"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        isError={errors.rating}
                    />
                    <div className="flex flex-row mt-4 items-center">
                        <Label
                            forInput="is_featured"
                            value="Daftar Atas ?"
                            className="mt-4 mr-3"
                        />
                        <Checkbox
                            name="is_featured"
                            handleChange={(e) =>
                                setData("is_featured", e.target.checked)
                            }
                            checked={movie.is_featured}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="mt-4 hover:bg-green-500 hover:text-black"
                        processing={processing}
                    >
                        Save
                    </Button>
                </form>
            </Authenticated>
        </>
    );
}
