import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import Checkbox from "@/Components/Checkbox";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import ValidationErrors from "@/Components/ValidationErrors";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        year: "",
        category: "",
        video_url: "",
        thumbnail: "",
        rating: "",
        is_featured: false,
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

        post(route("admin.dashboard.movie.store"));
    };
    return (
        <>
            <Head title="Admin Create Movie" />
            <Authenticated auth={auth}>
                <h1 className="text-xl mt-4">Masukin Film Baru</h1>
                <hr className="mb-4" />

                {/* Error validasi */}
                <ValidationErrors errors={errors} />

                <form onSubmit={submit}>
                    <Label forInput="title" value="title" className="mt-4" />
                    <Input
                        className="mb-5"
                        placeholder="Masukin Judul Filmnya"
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
