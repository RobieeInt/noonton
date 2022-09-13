import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import Checkbox from "@/Components/Checkbox";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import ValidationErrors from "@/Components/ValidationErrors";
import { Inertia } from "@inertiajs/inertia";

export default function Edit({ auth, subscriptionPlan }) {
    const { data, setData, processing, errors } = useForm({
        ...subscriptionPlan, //ambil semua data subscriptionPlan
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            // event.target.type === "checkbox"
            //     ? event.target.checked
            //     : event.target.value,
            //array of features
            event.target.name === "features"
                ? event.target.value.split(",")
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        //cek thumnail biar ga duplikat
        if (data.thumbnail === subscriptionPlan.thumbnail) {
            delete data.thumbnail;
        }

        Inertia.post(
            route(
                "admin.dashboard.subscriptionPlan.update",
                subscriptionPlan.id
            ),
            {
                ...data,
                _method: "PUT",
            }
        );
    };
    return (
        <>
            <Head title="Admin Update subscriptionPlan" />
            <Authenticated auth={auth}>
                <h1 className="text-xl mt-4">
                    Update Paket : {subscriptionPlan.name}{" "}
                </h1>
                <hr className="mb-4" />

                {/* Error validasi */}
                <ValidationErrors errors={errors} />

                <form onSubmit={submit}>
                    <Label forInput="name" value="name" className="mt-4" />
                    <Input
                        className="mb-5"
                        placeholder="Masukin Nama Paket"
                        defaultValue={subscriptionPlan.name}
                        type="text"
                        name="name"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        isError={errors.name}
                    />
                    <Label forInput="price" value="price" className="mt-4" />
                    <Input
                        className="mb-5"
                        defaultValue={subscriptionPlan.price}
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
                        defaultValue={JSON.parse(subscriptionPlan.features)}
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
                        defaultValue={subscriptionPlan.active_period_in_month}
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
                            checked={data.is_premium}
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
