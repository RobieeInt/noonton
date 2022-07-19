import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Authenticated({ auth, children }) {
    return (
        <>
            <div className="mx-auto max-w-screen hidden lg:block">
                {/* Awal Sidebar */}
                <Sidebar auth={auth} />
                {/* Akhir Sidebar */}

                {/* Awal Konten */}
                <div className="ml-[300px] px-[50px] py-[50px]">
                    <div className="flex flex-col gap-[50px]"></div>
                    {/* Awal Topbar */}
                    <Topbar name={auth.user.name} />
                    {/* Akhir Topbar */}
                    <main>{children}</main>
                </div>
                {/* Akhir Konten */}
            </div>

            <div className="mx-auto px-4 w-full h-screen lg:hidden flex bg-black">
                <div className="text-white text-2xl text-center leading-snug font-medium my-auto">
                    Sorry, this page only supported on 1024px screen or above
                </div>
            </div>
        </>
    );
}
