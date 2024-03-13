import React, { FunctionComponent } from 'react'

import Link from 'next/link'
import Slider, { Settings } from 'react-slick'

interface SliderHomeProps {
  carouselItem: {
    buttonText: string
    buttonLink: string
    description: string
    imageUrl: string
    imageAlt: string
    mobileImageUrl?: string // Optional property with a default value of undefined
    subtitle: string
    title: string
    contentPosition: 'left' | 'right' // Enforces "left" or "right" for contentPosition
  }[]
}

const SampleNextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
  <button className="btn-arrow arrow-right" onClick={onClick}>
    <span className="arrow-icon"></span>
  </button>
)

const SamplePrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
  <button className="btn-arrow arrow-left" onClick={onClick}>
    <span className="arrow-icon"></span>
  </button>
)

interface ArrowProps {
  className?: string
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const SliderHome: FunctionComponent<SliderHomeProps> = ({ carouselItem }) => {
  // slick slider settings
  const settings: Settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  return (
    <Slider {...settings} className="banner-sm">
      {carouselItem.map((item, index) => (
        <div key={`banner-sm-${index+1}`}>
          <picture>
            <Link href={item?.buttonLink}>
                <source media="(max-width:768px)" srcSet="/images/tru/banner/banner-sm-1.jpg" />
                <img src={item?.imageUrl} alt={item?.imageAlt} />
            </Link>
          </picture>
        </div>
      ))}
    </Slider>
  )
}

export default SliderHome
