import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import Checkbox from "@/Components/Checkbox";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import ValidationErrors from "@/Components/ValidationErrors";
import { Inertia } from "@inertiajs/inertia";

export default function Index({ auth, user, flashMessage }) {
    const { data, setData, processing, errors } = useForm({
        ...user, //ambil semua data user
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
    console.log(user);
    return (
        <>
            <Head title="Profil" />
            <Authenticated auth={auth}>
                <h1 className="text-xl mt-4">Update User : {user.name} </h1>
                <hr className="mb-4" />
                <h1 className="text-xl mt-4">
                    {/* //Ternary operator */}
                    {user.last_active_user_subscription
                        ? "Paket " +
                          user.last_active_user_subscription.subscription_plan
                              .name +
                          " Sampai " +
                          user.last_active_user_subscription.expired_date
                        : "Kamu belum punya Paket"}
                </h1>
                <hr className="mb-4" />

                {/* Error validasi */}
                <ValidationErrors errors={errors} />

                <form onSubmit={submit}>
                    <Label forInput="name" value="Nama" className="mt-4" />
                    <Input
                        className="mb-5"
                        placeholder="Masukin Nama"
                        defaultValue={user.name}
                        type="text"
                        name="name"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        isError={errors.name}
                    />
                    <Label forInput="email" value="Email" className="mt-4" />
                    <Input
                        className="mb-5"
                        placeholder="Masukin Email"
                        defaultValue={user.email}
                        type="text"
                        name="email"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        isError={errors.email}
                    />
                    <Label
                        forInput="password"
                        value="Password"
                        className="mt-4"
                    />
                    <Input
                        className="mb-5"
                        placeholder="Ganti Password"
                        defaultValue={user.password}
                        type="password"
                        name="password"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        isError={errors.password}
                    />

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
