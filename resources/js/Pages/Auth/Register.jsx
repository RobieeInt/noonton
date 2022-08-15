import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import ValidationErrors from "@/Components/ValidationErrors";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        // console.log(data);
        post(route("register"));
    };

    return (
        <>
            <Head title="Register" />
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
                                Daftar
                            </div>
                            <p className="text-base text-[#767676] leading-7">
                                Investasikan Ilmu <br />
                                Untuk Hidup yang Lebih Baik, Hiyaa hiyaa hiyaa
                            </p>
                        </div>
                        <ValidationErrors errors={errors} />
                        <form onSubmit={submit} className="w-[370px]">
                            <div className="flex flex-col gap-6">
                                <div>
                                    <Label forInput="fullName" value="Nama" />
                                    <Input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        placeholder={"Enter your full name"}
                                        autoComplete="name"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label
                                        forInput="email"
                                        value="Alamat Email "
                                    />
                                    <Input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        placeholder={"Masukkan Alamat Email"}
                                        autoComplete="username"
                                        handleChange={onHandleChange}
                                        required
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
                                        autoComplete="new-password"
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label
                                        forInput="password_confirmation"
                                        value="Konfirmasi Kata Sandi"
                                    />
                                    <Input
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        placeholder={"Masukkan Kata Sandi Lagi"}
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid space-y-[14px] mt-[30px]">
                                <Button
                                    processing={processing}
                                    type="submit"
                                    variant="primary"
                                >
                                    <span className="text-base font-semibold">
                                        Daftar
                                    </span>
                                </Button>

                                <Link href={route("login")}>
                                    <Button
                                        type="button"
                                        variant="light-outline"
                                    >
                                        <span className="text-base">
                                            Sudah Punya Akun
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
