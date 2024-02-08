"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const WishlistLogo = () => {
  const [width, setWidth] = useState(0);
  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);
  const [showButton, setShowButton] = useState(false);
  const changeNavButton = () => {
    if (window.scrollY >= 400 && window.innerWidth < 768) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeNavButton);
  }, []);
  return (
    <div>
      <Link href="/" style={{ display: showButton ? "none" : "block" }}>
        <Image
          src="/images/wishlist.svg"
          alt="Logo"
          width={width < 1024 ? "20" : "20"}
          height={width < 1024 ? "45" : "100"}
          className="relative"
        />
      </Link>
      <div
        style={{
          display: showButton ? "block" : "none",
        }}
      ></div>
    </div>
  );
};

export default WishlistLogo;
