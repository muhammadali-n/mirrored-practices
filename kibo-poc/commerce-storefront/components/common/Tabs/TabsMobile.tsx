import React from 'react';

import { UncontrolledCollapse, Button, CardBody, Card, Row, Col } from 'reactstrap';

const TabsMobile = () => (
  <div className="custom-collapse">
    <div className="collapse-item">
      <button id="pdpDetails" className="btn-toggle expanded"><span>Product overview</span><i></i></button>
      <UncontrolledCollapse toggler="#pdpDetails" defaultOpen={true}>
        <Card>
          <CardBody>
            <div className="product-overview">
              <div className="product-overview-info">

                <div className="product-overview-badges">
                  <Row>
                    <Col md="6">
                      <div className="icon-card i-svg-warning">
                        <div className="icon-card-content">
                          <span><strong>Product warning</strong></span>
                          <div className="icon-card-message">Choking hazard/small parts/age</div>
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="icon-card i-svg-toy">
                        <div className="icon-card-content">
                          <span><strong>Surprise toy</strong></span>
                          <div className="icon-card-message">Surprise toy message</div>
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="icon-card svg-installation">
                        <div className="icon-card-content">
                          <span><strong>Assembly required</strong></span>
                          <div className="icon-card-message">Assembly message</div>
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="icon-card i-svg-battery">
                        <div className="icon-card-content">
                          <span><strong>Batteries required</strong></span>
                          <div className="icon-card-message">Battery type necessary i.e. AA</div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>

                <ul className="list-dots">
                  <li>Add a little bit of magic to storytelling time with the Disney Frozen Elsa’s Magical Story Cape Doll</li>
                  <li>{"Gather round, it’s time for you to tell stories of Elsa, Anna and Olaf with a touch of magic on Elsa's cape!"}</li>
                  <li>Whip out the water wand (included), brush the cape with it and with a bibbidi bobbidi boo, Anna and Olaf magically appear on the cape!</li>
                  <li>Your little lady will never tire of brushing and revealing her Frozen friends over and over and over again!</li>
                </ul>
                <p className="pdp-description-reference">SKU:943188</p>
              </div>
              <div className="product-overview-composition">
                <div className="composition-product">
                <h3 className="composition-product-title">What&apos;s in the box?‎</h3>
                  <ul className="list-check">
                    <li><span>1 doll with cape and shoes</span></li>
                    <li><span>Water wand</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
    </div>
    <div className="collapse-item">
      <button id="pdpDetails2" className="btn-toggle"><span>Details</span><i></i></button>
      <UncontrolledCollapse toggler="#pdpDetails2">
        <Card>
          <CardBody>
            <p>Minimum Target Age</p>
            <p>3 years</p>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
    </div>
  </div>
);

export default TabsMobile;