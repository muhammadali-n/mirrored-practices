/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */

/**
 * Copyright(c) 2024 Valoriz Digital.
 *
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Valoriz ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall use it only in
 * accordance with the terms of the contract agreement you entered into with Valoriz.
 *
 * @author Aneesh K
 */
import { useState, useEffect } from "react";
import React from "react";

import Col from "@core/Col";
import Container from "@core/Container";
import Input from "@core/Input";
import Modal from "@core/Modal";
import ModalBody from "@core/ModalBody";
import ModalFooter from "@core/ModalFooter";
import ModalHeader from "@core/ModalHeader";
import Row from "@core/Row";
// import FeedBack from "@components/Modal/FeedBack";
// import RcSlider from "@components/RcSlider";
// import SliderHome from "@components/Slider/SliderHome";
// import FormFeedback from "@core/FormFeedback";
// import BannerSm from "@components/Slider/BannerSm";
// import PopularCategories from "@components/Slider/PopularCategories";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';

import TopPicks from "../widgets/homepage/TopPicks";

// import VideoPlayer from "@components/videoplayer";

function SampleNextArrow(props: { className: any; style: any; onClick: any; }) {
  const { className, style, onClick } = props;
  return (
    <button className="btn-arrow arrow-right" onClick={onClick}><span className="arrow-icon"></span></button>
  );
}

function SamplePrevArrow(props: { className: any; style: any; onClick: any; }) {
  const { className, style, onClick } = props;
  return (
    <button className="btn-arrow arrow-left" onClick={onClick}><span className="arrow-icon"></span></button>
  );
}

const Home = (props: { products: []; }) => {
  const { products } = props;

  //slick slider
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
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          arrows: false,
          infinite: false,
          centerMode: true,
          centerPadding: "0"
        }
      }
    ],
    nextArrow: <SampleNextArrow className={undefined} style={undefined} onClick={undefined} />,
    prevArrow: <SamplePrevArrow className={undefined} style={undefined} onClick={undefined} />
  };

  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setModalOpen(true);
  }, []);

  return (
    <div>
      <main className="home-outer">
        {/* <FeedBack /> */}
        <div className="d-none">
        {/* <SliderHome /> */}
        </div>
        {/* <div className="banner">
          <div className="bnr-left">
            <a href="#">
              <img src="/images/tru/PRODUCTDES-7957-TRU-Electric-vehicles-HP-Banner-Desktop-Eng-100.jpg" alt="TRU" className="img-fluid d-none d-md-block" />
              <img src="/images/tru/PRODUCTDES-8022-TRU-Electric-vehicles-HP-Banner-Mobile-Eng-100.jpg" alt="TRU" className="img-fluid d-block d-md-none" />
            </a>
          </div>
          <div className="bnr-right">
            <a href="#">
              <img src="/images/tru/PRODUCTDES-8002-TRU-EucationalToys-HP-Banner-Desktop-Eng.png" alt="TRU" className="img-fluid d-none d-md-block" />
              <img src="/images/tru/PRODUCTDES-8002-TRU-EucationalToys-HP-Banner-Mobile-Eng.png" alt="TRU" className="img-fluid d-block d-md-none" />
            </a>
          </div>
          <div className="bnr-single d-none">
            <a href="#">
              <img src="/images/tru/PRODUCTDES-8026-TRU-AnniversarySale-HP-Banner-Desktop-Eng.png" alt="TRU" className="img-fluid d-none d-md-block" />
              <img src="/images/tru/PRODUCTDES-8026-TRU-AnniversarySale-HP-Banner-Mobile-Eng.png" alt="TRU" className="img-fluid d-block d-md-none" />
            </a>
          </div>
        </div> */}

        {/* <BannerSm /> */}
        {/* <PopularCategories /> */}

        <TopPicks products={products} />

        <div className="offers-outer">
          <Container>
            <Row>
              <Col xs="12" md="4">
                <Card>
                  <figure>
                    <CardImg className="d-none d-md-block" width="100%" src="/images/tru/PRODUCTDES-8022-TRU-BacktoSchool-Promo-Banner-Desktop-Eng.png" alt="" />
                    <CardImg className="d-block d-md-none" width="100%" src="/images/tru/PRODUCTDES-8022-TRU-BacktoSchool-Promo-Banner-Mobile-Eng.png" alt="" />
                  </figure>
                  <CardBody>
                    <CardTitle>Adventures on the go</CardTitle>
                    <CardText>Explore kids’ gear from backpacks to stationery</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" md="4">
                <Card>
                  <figure>
                    <CardImg className="d-none d-md-block" width="100%" src="/images/tru/PRODUCTDES-8002-TRU-Scooters-Promo-Banner-Desktop-Eng.png" alt="" />
                    <CardImg className="d-block d-md-none" width="100%" src="/images/tru/PRODUCTDES-8002-TRU-Scooters-Promo-Banner-Mobile-Eng.png" alt="" />
                  </figure>
                  <CardBody>
                    <CardTitle>Up to 40% off selected scooters</CardTitle>
                    <CardText>Zippy scooters from brands you love!</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" md="4">
                <Card className="last-item">
                  <figure>
                    <CardImg className="d-none d-md-block" width="100%" src="/images/tru/PRODUCTDES-7998-TRU-Pool&WaterFun-Promo-Banner-Desktop-Eng.png" alt="" />
                    <CardImg className="d-block d-md-none" width="100%" src="/images/tru/PRODUCTDES-7998-TRU-Pool&WaterFun-Promo-Banner-Mobile-Eng.png" alt="" />
                  </figure>
                  <CardBody>
                    <CardTitle>Summer splash fun</CardTitle>
                    <CardText>Pools, water parks, slides and toys to beat the heat</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="category-list-outer">
          <Container>
            <h2 className="title-main">Most popular categories</h2>

            <Row className="category-card">
              <Col xs="12" md="4" lg="3">
                <div className="cg-item left yellow">
                  <div className="cg-col">
                    <figure><img src="images/tru/DUX-6690_HP_LEGO.png" alt="" /></figure>
                    <div className="cg-content">
                      <h4>LEGO & building toys</h4>
                      <i className="i-shape-splat"></i>
                      <a href="#"></a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs="12" md="4" lg="3">
                <div className="cg-item right green">
                  <div className="cg-col">
                    <figure><img src="images/tru/DUX-6917_HP_Blume.png" alt="" /></figure>
                    <div className="cg-content">
                      <h4>Surprise toys & collectibles</h4>
                      <i className="i-shape-blast"></i>
                      <a href="#"></a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs="12" md="4" lg="3">
                <div className="cg-item left teal">
                  <div className="cg-col">
                    <figure><img src="images/tru/DUX-6690_HP_dolls & doll play.png" alt="" /></figure>
                    <div className="cg-content">
                      <h4>Dolls & doll play</h4>
                      <i className="i-shape-cloud"></i>
                      <a href="#"></a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs="12" md="4" lg="3">
                <div className="cg-item right blue">
                  <div className="cg-col">
                    <figure><img src="images/tru/DUX-6690_HP_guns, blasters.png" alt="" /></figure>
                    <div className="cg-content">
                      <h4>Guns, blasters & accessories</h4>
                      <i className="i-shape-pebble"></i>
                      <a href="#"></a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs="12" md="4" lg="3">
                <div className="cg-item left purple">
                  <div className="cg-col">
                    <figure><img src="images/tru/DUX-6690_HP_action figures.png" alt="" /></figure>
                    <div className="cg-content">
                      <h4>Action figures & playsets</h4>
                      <i className="i-shape-spiral"></i>
                      <a href="#"></a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs="12" md="4" lg="3">
                <div className="cg-item right pink">
                  <div className="cg-col">
                    <figure><img src="images/tru/DUX-6907_HP_pools & water fun.png" alt="" /></figure>
                    <div className="cg-content">
                      <h4>Pools & water fun</h4>
                      <i className="i-shape-scribble"></i>
                      <a href="#"></a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs="12" md="4" lg="3">
                <div className="cg-item left yellow">
                  <div className="cg-col">
                    <figure><img src="images/tru/DUX-6690_HP_scooters.png" alt="" /></figure>
                    <div className="cg-content">
                      <h4>Scooters</h4>
                      <i className="i-shape-splat"></i>
                      <a href="#"></a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs="12" md="4" lg="3">
                <div className="cg-item right green">
                  <div className="cg-col">
                    <figure><img src="images/tru/DUX-6907_HP_DXT Electric Drift Trike.png" alt="" /></figure>
                    <div className="cg-content">
                      <h4>Electric vehicles</h4>
                      <i className="i-shape-blast"></i>
                      <a href="#"></a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="toysfinder-outer">
          <div className="toysfinder-title">
            <Container className="d-flex"><a href="#" className="arrow-back d-none"></a> <h3>Find the perfect gift</h3></Container>
          </div>
          <div className="toysfinder-col">
            <div className="toysfinder-col-top">
              <div className="toysfinder-indicator"><span>1</span> of <span>2</span></div>
              <h4 className="toysfinder-subtitle">How old is your child?</h4>
              <div className="toysfinder-selectable">
                <div className="toysfinder-clear"><a href="#">Clear All</a></div>
                <div className="toysfinder-refinement">
                  <div className="toysfinder-refinement-col">
                    <a href="#" className="toysfinder-item color-1 checked">
                      <div className="toysfinder-item-value"><span>0-18 months</span></div>
                    </a>
                    <a href="#" className="toysfinder-item color-2">
                      <div className="toysfinder-item-value"><span>18-36 months</span></div>
                    </a>
                    <a href="#" className="toysfinder-item color-3">
                      <div className="toysfinder-item-value"><span>3-5 years</span></div>
                    </a>
                    <a href="#" className="toysfinder-item color-4">
                      <div className="toysfinder-item-value"><span>6-8 years</span></div>
                    </a>
                    <a href="#" className="toysfinder-item color-5">
                      <div className="toysfinder-item-value"><span>9-11 years</span></div>
                    </a>
                    <a href="#" className="toysfinder-item color-6">
                      <div className="toysfinder-item-value"><span>12 years +</span></div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="toysfinder-steps d-none">
                <div className="toysfinder-price-col">
                  <div className="toysfinder-chest"></div>
                  <div className="toysfinder-price">
                    <span className="current-price max">3000</span>
                    <span className="price-currency">&nbsp; AED</span>
                  </div>
                  <div className="toysfinder-price-slider">
                    {/* <RcSlider /> */}
                  </div>
                </div>
              </div>
              <div className="toysfinder-btn-col">
                <button className="btn btn-info" disabled>Next</button>
                <button className="btn btn-success d-none">Next</button>
              </div>
            </div>
          </div>
        </div>
        <div className="videos-outer">
          <Container>
            <h2 className="title-main">Latest from YouTube</h2>
            <Row>
              <Col xs="12" md="4">
                <Card>
                  {/* <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" width="560" height="315" src="https://www.youtube-nocookie.com/embed/FsfpwpLSMXE?start=4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div> */}
                  {/* <VideoPlayer /> */}
                  <CardBody>
                    <a href="#">
                      <CardTitle>LOL Surprise</CardTitle>
                      <CardText>{"You'll get seven layers of fun with every LOL Surprise Doll"}</CardText>
                    </a>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" md="4">
                <Card>
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" width="560" height="315" src="https://www.youtube-nocookie.com/embed/Sk8LYn4Xo1Q?start=3" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                  <CardBody>
                    <CardTitle>LEGO City</CardTitle>
                    <CardText>Get ready for exciting build and rescue adventures!</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" md="4">
                <Card className="card-last">
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" width="560" height="315" src="https://www.youtube-nocookie.com/embed/GEYjY0tp7M4?start=3" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                  <CardBody>
                    <a href="#">
                      <CardTitle>Blume Dolls</CardTitle>
                      <CardText>Get ready to sprout adorable surprises</CardText>
                    </a>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Container><div className="divider-4"><span></span></div></Container>
        <div className="brands-outer">
          <div className="brands-col">
            <h2 className="title-main">Big brands</h2>
            <div className="brand-img-right">
              <figure><img src="/images/tru/DUX-7060_HP_Frozen.png" alt="" /></figure>
            </div>
            <ul className="brands-list">
              <li><a href="#"><img src="/images/tru/brands/disney-brand-logo.svg" alt="" /></a></li>
              <li><a href="#"><img src="/images/tru/brands/hotWheels-brand-logo.svg" alt="" /></a></li>
              <li><a href="#"><img src="/images/tru/brands/lego-brand-logo.svg" alt="" /></a></li>
              <li><a href="#"><img src="/images/tru/brands/youAndMe-brand-logo.svg" alt="" /></a></li>
              <li><a href="#"><img src="/images/tru/brands/nerf-brand-logo.png" alt="" /></a></li>
              <li><a href="#"><img src="/images/tru/brands/littleTikes-brand-logo.svg" alt="" /></a></li>
              <li><a href="#"><img src="/images/tru/brands/lol-brand-logo.png" alt="" /></a></li>
              <li><a href="#"><img src="/images/tru/brands/sylvanianFamilies-brand-logo.png" alt="" /></a></li>
            </ul>
            <div className="brand-img-left">
              <figure><img src="/images/tru/DUX-7060_HP_Stormtrooper.png" alt="" /></figure>
            </div>
          </div>
        </div>
      </main>

      {/* Newsletter form modal */}
      <Modal isOpen={false} toggle={() => setModalOpen(false)} className="modal-newsletter" centered>
        <ModalHeader toggle={() => setModalOpen(false)} />
        <ModalBody>
          <picture>
            <img src="/images/tru/newsletter-modal.jpg" alt="" className="img-fluid" />
          </picture>
          <div className="title">
            Subscribe to our newletter
          </div>
          <div className="content">
            <p>
              Enjoy 10%  off* your cart total for your first online order.
              Simply enter your email and get the discount code.
            </p>
            <div className="input-item">
              <Input type="email" placeholder="Enter email address" invalid />
              <div className="validation-mark" />
              {/* <FormFeedback> */}
                Error Message
              {/* </FormFeedback> */}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="success">
            Subscribe
          </Button>
          <p>
            <small>
              Read our
              {" "}
              <a href="https://www.toysrusmena.com/en-ae/privacy-policy.html" className="link">
                privacy policy
              </a>
              {" "}
              for processing your personal data. You can unsubscribe at any time
            </small>
          </p>
        </ModalFooter>
      </Modal>

      {/* Newsletter thankyou modal */}
      {/* <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)} className="modal-newsletter" centered>
        <ModalHeader toggle={() => setModalOpen(false)} />
        <ModalBody>
          <picture>
            <img src="/images/tru/newsletter-thankyou.jpg" alt="" className="img-fluid" />
          </picture>
          <div className="title">
            Thank you
          </div>
        </ModalBody>
      </Modal> */}
    </div>
  );
};
Home.propTypes = {};
export default Home;
