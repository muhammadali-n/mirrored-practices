import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import CartLogo from "./CartlLogo";
import WishlistLogo from "./WishlistLogo";
import UserLogo from "./UserLogo";
import SearchLogo from "./SearchLogo";

const Navbar = ({
  toggle,
  response,
}: {
  toggle: () => void;
  response: any;
}) => {
  return (
    <div className="">
      <div className="w-full h-30 bg-black sticky top-0">
        <div className="flex flex-row ">
          <div className="basis-1/3  flex justify-center pt-6"/>
          <div className="basis-1/3  flex justify-center pt-6">
            <Logo />
          </div>
          <div className="basis-1/3  flex justify-end  space-x-6  pt-6 pr-2">
            <SearchLogo/>
            <CartLogo  />
            <WishlistLogo />
            <UserLogo/>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="pb-4 pt-7">
            <ul className="flex justify-end  space-x-6  text-white">
              {response.collections.items.map(
                (items: { name: string; slug: string }) => (
                  <li key={items.slug}>
                    <Link href={"/collections/" + items.slug}>
                      <p>{items.name}</p>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
