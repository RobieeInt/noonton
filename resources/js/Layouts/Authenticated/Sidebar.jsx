import { Link } from "@inertiajs/inertia-react";
import SubscriptionDetail from "./SubscriptionDetail";
import MenuItem from "./MenuItem";
import { UserMenu, UserOthers, UserMenuAdmin } from "./MenuList";

export default function Sidebar({ auth, subscriptionPlans, env }) {
    // console.log(env.WhatKey);
    return (
        <>
            <aside className="fixed z-50 w-[300px] h-full">
                <div className="flex flex-col p-[30px] pr-0 border-r border-gray-[#F1F1F1] overflow-y-auto h-full">
                    <a href="/">
                        {/* <img src="/images/moonton.svg" alt="" /> */}
                    </a>
                    <div className="links flex flex-col mt-[60px] h-full gap-[50px]">
                        <div>
                            <div className="text-gray-1 text-sm mb-4">Menu</div>
                            {/* {console.log(auth.whatRole)} */}
                            {auth.whatRole === "admin"
                                ? UserMenuAdmin.map((menu, index) => (
                                      <MenuItem
                                          key={`${index}-${menu.text}`}
                                          link={menu.link}
                                          icon={menu.icon}
                                          text={menu.text}
                                          isActive={
                                              menu.link &&
                                              route().current(menu.link) //misalkan menu.link = "ada" maka route().current("/") = true atau menunya aktif
                                          }
                                          method={menu.method}
                                      />
                                  ))
                                : auth.whatRole === "user"
                                ? UserMenu.map((menu, index) => (
                                      <MenuItem
                                          key={`${index}-${menu.text}`}
                                          link={menu.link}
                                          icon={menu.icon}
                                          text={menu.text}
                                          isActive={
                                              menu.link &&
                                              route().current(menu.link) //misalkan menu.link = "ada" maka route().current("/") = true
                                          }
                                      />
                                  ))
                                : UserMenu.map((menu, index) => (
                                      <MenuItem
                                          key={`${index}-${menu.text}`}
                                          link={menu.link}
                                          icon={menu.icon}
                                          text={menu.text}
                                          isActive={
                                              menu.link &&
                                              route().current(menu.link) //misalkan menu.link = "ada" maka route().current("/") = true atau menunya aktif
                                          }
                                          method={menu.method}
                                      />
                                  ))}
                        </div>
                        <div>
                            <div className="text-gray-1 side-link mb-4">
                                Lainnya
                            </div>
                            {UserOthers.map((menu, index) => (
                                <MenuItem
                                    key={`${index}-${menu.text}`}
                                    link={menu.link}
                                    icon={menu.icon}
                                    text={menu.text}
                                    isActive={
                                        menu.link && route().current(menu.link) //misalkan menu.link = "ada" maka route().current("/") = true atau menunya aktif
                                    }
                                    method={menu.method}
                                />
                            ))}
                        </div>

                        {auth.activePlan && (
                            <SubscriptionDetail
                                name={auth.activePlan.name}
                                isPremium={auth.activePlan.is_premium}
                                remainingActiveDays={
                                    auth.activePlan.remainingActiveDays
                                }
                                activeDays={auth.activePlan.activeDays}
                            />
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
