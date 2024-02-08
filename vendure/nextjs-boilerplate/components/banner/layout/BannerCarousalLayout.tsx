"use client";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BannerCarousalLayout({ response }: {response:any}) {

  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    }),
    []
  );
  return (
    <section>
      <Slider {...settings}>
        {response.collections.items.map(
          (
            item: {
              name: string;
              featuredAsset: { preview: string | StaticImport };
            },
            index: number
          ) => (
            <div className="h-[457px] w-96 relative" key={index}>
              <Image
                src={item.featuredAsset.preview}
                alt="Picture of the author"
                layout="fill"
                objectFit="cover"
                 />
                    <div className="absolute inset-0  l-4 flex ">
                        <p className="text-white font-semibold text-4xl  text-center mt-52 ml-48">
                            {item.name }
                </p>
              </div> 
            </div>
          )
        )}
      </Slider>
    </section>
  );
}
