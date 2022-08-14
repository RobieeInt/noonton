import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import Checkbox from "@/Components/Checkbox";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import ValidationErrors from "@/Components/ValidationErrors";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        price: "",
        active_period_in_month: "",
        is_premium: false,
        features: "",
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            //array of features
            event.target.name === "features"
                ? event.target.value.split(",")
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.dashboard.subscriptionPlan.store"));
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
                    <Label forInput="name" value="name" className="mt-4" />
                    <Input
                        className="mb-5"
                        placeholder="Masukin Nama Paket"
                        type="text"
                        name="name"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        isError={errors.name}
                    />
                    <Label forInput="price" value="price" className="mt-4" />
                    <Input
                        className="mb-5"
                        placeholder="Masukin Harga Paket"
                        type="text"
                        name="price"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        isError={errors.price}
                    />
                    <Label
                        forInput="features"
                        value="features"
                        className="mt-4"
                    />
                    {/* input array */}
                    <Input
                        className="mb-5"
                        placeholder="Masukin Fitur Paket, dipisahkan dengan koma"
                        type="text"
                        name="features"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        isError={errors.features}
                    />
                    <Label
                        forInput="active_period_in_month"
                        value="active_period_in_month"
                        className="mt-4"
                    />
                    <Input
                        placeholder="Masukin active_period_in_month"
                        type="number"
                        name="active_period_in_month"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        isError={errors.active_period_in_month}
                    />
                    <div className="flex flex-row mt-4 items-center">
                        <Label
                            forInput="is_premium"
                            value="Premium ?"
                            className="mt-4 mr-3"
                        />
                        <Checkbox
                            name="is_premium"
                            handleChange={(e) =>
                                setData("is_premium", e.target.checked)
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
