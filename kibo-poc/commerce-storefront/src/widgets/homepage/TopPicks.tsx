import React from "react";

import Slider from 'react-slick'
import { Container, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";

interface TopPicksProps {
  products: {
    content: any;
    productCode: string;
    productName: string;
    productImages: {
      imageUrl: string;
      altText: string;
    }[];
    price: {
      price: number;
      salePrice: number;
    };
    isPurchasable: boolean;
    inventoryInfo: {
      onlineStockAvailable: number;
    };
  }[];
}

const SampleNextArrow: React.FC<{ className?: string; style?: React.CSSProperties; onClick?: () => void }> = (props) => (
  <button className={`btn-arrow arrow-right ${props.className}`} onClick={props.onClick}>
    <span className="arrow-icon"></span>
  </button>
);

const SamplePrevArrow: React.FC<{ className?: string; style?: React.CSSProperties; onClick?: () => void }> = (props) => (
  <button className={`btn-arrow arrow-left ${props.className}`} onClick={props.onClick}>
    <span className="arrow-icon"></span>
  </button>
);

const TopPicks: React.FC<TopPicksProps> = ({ products }) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: true,
    responsive: [
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          arrows: false,
          infinite: false,
          centerMode: true,
          centerPadding: "0",
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="top-picks-outer">
      <Container>
        <h2 className="title-main">Top Picks</h2>
        <Slider {...settings} className="custom-card slick-card-list">
          {products.map((product) => (
            <Card key={product.productCode}>
              <div className="card-outer">
                <figure>
                  <CardImg width="100%" src={product?.content?.productImages[0]?.imageUrl} alt={product?.content?.productImages[0]?.altText} />
                </figure>
                <CardBody>
                  <CardTitle>{product.productName}</CardTitle>
                  <div className="pricing-card">
                    <CardSubtitle>
                      <span>{product.price.price} AED</span>
                    </CardSubtitle>
                    <CardText className="offer-price">{product.price.salePrice} AED</CardText>
                  </div>
                  {product.isPurchasable ? (
                    <p className="availability">
                      {product.inventoryInfo.onlineStockAvailable > 0 ? (
                        <span>In Stock</span>
                      ) : (
                        <span>Out of Stock</span>
                      )}
                    </p>
                  ) : (
                    <p className="availability">
                      <span>Not Available for Purchase</span>
                    </p>
                  )}
                </CardBody>
              </div>
            </Card>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default TopPicks;
