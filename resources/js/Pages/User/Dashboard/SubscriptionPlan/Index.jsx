import Authenticated from "@/Layouts/Authenticated/Index";
import SubscriptionCard from "@/Components/SubscriptionCard";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";

export default function SubscriberPlan({ auth, subscriptionPlans, env }) {
    const selectSubscription = (id) => {
        Inertia.post(
            route("user.dashboard.subscriptionPlan.userSubscribe", {
                subscriptionPlan: id,
            }),
            {},
            {
                only: ["userSubscription"],
                onSuccess: ({ props }) => {
                    onSnapMidtrans(props.userSubscription);
                },
            }
        );
    };

    const onSnapMidtrans = (userSubscription) => {
        snap.pay(userSubscription.snap_token, {
            // Optional
            onSuccess: function (result) {
                // /* You may add your own js here, this is just example */ document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
                Inertia.visit(route("user.dashboard.index"));
            },
            // Optional
            onPending: function (result) {
                // /* You may add your own js here, this is just example */ document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
                console.log(result);
            },
            // Optional
            onError: function (result) {
                // /* You may add your own js here, this is just example */ document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
                console.log(result);
            },
        });
    };

    return (
        <>
            <Authenticated auth={auth}>
                <Head title="Paket Berlangganan">
                    <script
                        src="https://app.sandbox.midtrans.com/snap/snap.js"
                        data-client-key={env.MIDTRANS_CLIENTKEY} //share jadi global variable di middleware->HandleInertiaRequest bagian env & panggil propsnya
                    ></script>
                </Head>
                <div className="px-[50px] mx-auto max-w-screen hidden lg:block">
                    <div className="py-20 flex flex-col items-center">
                        <div className="text-black font-semibold text-[26px] mb-3">
                            Nikmati Akses Videonya
                        </div>
                        <p className="text-base text-gray-1 text-center">
                            Investikasikan sedikit uang anda untuk memperkaya
                            saya ... Please
                        </p>

                        {/* <!-- Pricing Card --> */}
                        <div className="flex justify-center gap-10 mt-[70px]">
                            {/* <!-- Basic --> */}
                            {subscriptionPlans.map((subscriptionPlan) => (
                                <SubscriptionCard
                                    name={subscriptionPlan.name}
                                    price={subscriptionPlan.price}
                                    durationInMount={
                                        subscriptionPlan.active_period_in_month
                                    }
                                    features={JSON.parse(
                                        subscriptionPlan.features
                                    )}
                                    isPremium={subscriptionPlan.is_premium}
                                    key={subscriptionPlan.id}
                                    onSelectSubscription={() =>
                                        selectSubscription(subscriptionPlan.id)
                                    }
                                />
                            ))}

                            {/* <!-- For Greatest --> */}
                        </div>
                        {/* <!-- /Pricing Card --> */}
                    </div>
                </div>

                <div className="mx-auto px-4 w-full h-screen lg:hidden flex">
                    <div className="flex items-center justify-center min-h-screen container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {/* Card */}
                            {subscriptionPlans.map((subscriptionPlan) => (
                                <SubscriptionCard
                                    name={subscriptionPlan.name}
                                    price={subscriptionPlan.price}
                                    durationInMount={
                                        subscriptionPlan.active_period_in_month
                                    }
                                    features={JSON.parse(
                                        subscriptionPlan.features
                                    )}
                                    isPremium={subscriptionPlan.is_premium}
                                    key={subscriptionPlan.id}
                                    onSelectSubscription={() =>
                                        selectSubscription(subscriptionPlan.id)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
