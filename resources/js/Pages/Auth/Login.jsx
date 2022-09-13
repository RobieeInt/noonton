import React, { useEffect } from "react";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Button from "@/Components/Button";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import ValidationErrors from "@/Components/ValidationErrors";
import Checkbox from "@/Components/Checkbox";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <>
            <Head title="Login" />
            <div className="mx-auto max-w-screen min-h-screen bg-black text-white md:px-10 px-3">
                <div className="fixed top-[-50px] hidden lg:block">
                    <img
                        src="/images/signup-image.png"
                        className="hidden laptopLg:block laptopLg:max-w-[450px] laptopXl:max-w-[640px]"
                        alt=""
                    />
                </div>
                <div className="py-24 flex laptopLg:ml-[680px] laptopXl:ml-[870px]">
                    <div>
                        {/* <img src="/images/moonton-white.svg" alt="" /> */}
                        <div className="my-[70px]">
                            <div className="font-semibold text-[26px] mb-3">
                                Selamat Datang
                            </div>
                            <p className="text-base text-[#767676] leading-7">
                                Investasikan Ilmu <br />
                                Untuk Hidup yang Lebih Baik
                            </p>
                        </div>

                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-600">
                                {status}
                            </div>
                        )}

                        <ValidationErrors errors={errors} />
                        <form onSubmit={submit} className="w-[370px]">
                            <div className="flex flex-col gap-6">
                                <div>
                                    {/* <label className="text-base block mb-2">Email Address</label> */}
                                    <Label forInput="email" value="Email" />
                                    <Input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        placeholder={"Masukkan Alamat Email"}
                                        autoComplete="username"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                    />
                                </div>
                                <div>
                                    <Label
                                        forInput="password"
                                        value="Kata Sandi"
                                    />
                                    <Input
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        placeholder={"Masukkan Kata Sandi"}
                                        autoComplete="current-password"
                                        handleChange={onHandleChange}
                                    />
                                </div>
                                <div className=" mt-1 flex items-center gap-36">
                                    <label className="">
                                        <Checkbox
                                            name="remember"
                                            value={data.remember}
                                            handleChange={onHandleChange}
                                        />

                                        <span className="ml-2 text-sm hover:text-alerange text-green-600">
                                            Ingetin Saya
                                        </span>
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="underline right-1 text-sm text-green-600 hover:text-alerange"
                                        >
                                            Lupa password?
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <div className="grid space-y-[14px] mt-[30px]">
                                <Button
                                    processing={processing}
                                    variant="primary"
                                >
                                    <span className="text-base font-semibold">
                                        Masuk
                                    </span>
                                </Button>

                                <Link href={route("register")}>
                                    <Button
                                        type="button"
                                        variant="light-outline"
                                    >
                                        <span className="text-base">
                                            Buat Akun
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
