"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobalContext } from "@/app/store";
import { useQuery } from "@/services/client";
import { GET_ACTIVE_ORDER } from "@/queries/active-order.query";



const CartLogo = () => {
  const [width, setWidth] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const { cartItemCount, setCartItemCount } = useGlobalContext();
  const { loading, data, error } = useQuery(GET_ACTIVE_ORDER);
  const activeOrder = (data as any)?.activeOrder;
  const [cartData, setCartData] = useState(activeOrder);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };

    const changeNavButton = () => {
      setShowButton(window.scrollY >= 400 && window.innerWidth < 768);
    };

    window.addEventListener("resize", updateWidth);
    window.addEventListener("scroll", changeNavButton);

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener("resize", updateWidth);
      window.removeEventListener("scroll", changeNavButton);
    };
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      setCartItemCount(activeOrder?.totalQuantity);
    }
  }, [loading, error, data, setCartItemCount]);

  return (
    <div style={{ position: "relative" }}>
      <Link href="/cart" style={{ display: showButton ? "none" : "block" }}>
        <Image
          src="/images/cart.svg"
          alt="Logo"
          width={width < 1024 ? 20 : 20}
          height={width < 1024 ? 45 : 100}
          className="relative"
        />
        {cartItemCount && (
          <div
            style={{
              right: "-10px",
              position: "absolute",
              bottom: "1",
              background: "black",
              borderRadius: "50%",
              width: "17px",
              height: "17px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          >
            {cartItemCount}
          </div>
        )}
      </Link>
    </div>
  );
};

export default CartLogo;
