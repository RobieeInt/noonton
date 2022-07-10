import Authenticated from "@/Layouts/Authenticated/Index";
import SubscriptionCard from "@/Components/SubscriptionCard";

export default function SubscriberPlan() {
    return (
        <>
            <Authenticated>
                <div className="px-[50px]">
                    <div className="py-20 flex flex-col items-center">
                        <div className="text-black font-semibold text-[26px] mb-3">
                            Pricing for Everyone
                        </div>
                        <p className="text-base text-gray-1 leading-7 max-w-[302px] text-center">
                            Invest your little money to get a whole new
                            experiences from movies.
                        </p>

                        {/* <!-- Pricing Card --> */}
                        <div className="flex justify-center gap-10 mt-[70px]">
                            {/* <!-- Basic --> */}
                            <SubscriptionCard
                                name="Basic"
                                price={10000}
                                durationInMount={4}
                                features={["1 movie", "1 month", "1 year"]}
                            />

                            {/* <!-- For Greatest --> */}
                            <SubscriptionCard
                                isPremium
                                name="Premium"
                                price={100000}
                                durationInMount={6}
                                features={[
                                    "1 movie",
                                    "1 month",
                                    "1 year",
                                    "1 movie",
                                    "1 month",
                                    "1 year",
                                ]}
                            />
                        </div>
                        {/* <!-- /Pricing Card --> */}
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
