import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'

function Shipping(shipmentFromSanity: any, formData: any) {

  console.log("formData", formData);

  const shipmentFromSanit = shipmentFromSanity.shipmentFromSanity[0];
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('');

  const handleShippingMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedShippingMethod(e.target.value);
  };

  const [shipmentData] = useState({
    contactArabic: shipmentFromSanit?.shippingInfo?.contact?.ar,
    contactEnglish: shipmentFromSanit?.shippingInfo?.contact?.en,
    changeArabic: shipmentFromSanit?.shippingInfo?.change?.ar,
    changeEnglish: shipmentFromSanit?.shippingInfo?.change?.en,
    shipToArabic: shipmentFromSanit?.shippingInfo?.shippingTo?.ar,
    shipToEnglish: shipmentFromSanit?.shippingInfo?.shippingTo?.en,

    economyArabic: shipmentFromSanit?.shippingMethod?.economy?.ar,
    economyEnglish: shipmentFromSanit?.shippingMethod?.economy?.en,

    standardArabic: shipmentFromSanit?.shippingMethod?.standard?.ar,
    standardEnglish: shipmentFromSanit?.shippingMethod?.standard?.en,

    shippingMethodTitleArabic: shipmentFromSanit?.shippingMethod?.title?.ar,
    shippingMethodTitleEnglish: shipmentFromSanit?.shippingMethod?.title?.en,

  })
  return (

    <>

      <><div className='shipping-info'>
        <><Row className='shipping-contact'>
          <Col md='4'>
            <h6>   {shipmentData.contactArabic}
            </h6>
          </Col>
          <Col md='6'>
            <h6>ajai.kc@valoriz.com</h6>
          </Col>
          <Col md='2'>
            <a href="#" >
              <h6>{shipmentData.changeArabic || shipmentData.changeEnglish}</h6>
            </a>
          </Col>
        </Row><Row className='shipping-ship-to mt-3'>
            <Col md='4'>
              <h6>{shipmentData.shipToArabic || shipmentData.shipToEnglish}</h6>
            </Col>
            <Col md='6'>
              <h6>
                kazhakoottam, kristal, tvm GA 30010, United States</h6>
            </Col>
            <Col md='2'>
              <a href="#" >
                <h6>{shipmentData.changeArabic || shipmentData.changeEnglish}</h6>
              </a>
            </Col>
          </Row></>

      </div>
        <div className='mt-5'>
          <h4>{shipmentData.shippingMethodTitleArabic}</h4>
          <div className='shipping-method'>
            <Row className=''>
              <Col md='10'>
                <label className='economy'>
                  <div className='d-flex'>

                    <input type="radio" name="shippingMethod" value="economy" className="form-check-input" checked={selectedShippingMethod === 'economy'}
                      onChange={handleShippingMethodChange} />
                    <p>&nbsp;</p><p>&nbsp;</p>
                    <h6 >{shipmentData.economyArabic || shipmentData.economyEnglish}</h6>

                  </div>
                  <p>5 to 8 business days</p>
                </label>
              </Col>
              <Col md='2'>
                <h6>$ 4.90</h6>
              </Col>
            </Row>
            <Row className=''>
              <Col md='10'>
                <label>
                  <div className='d-flex'>

                    <input type="radio" name="shippingMethod" value="standard" className="form-check-input" checked={selectedShippingMethod === 'standard'}
                    onChange={handleShippingMethodChange} />
                    <p>&nbsp;</p><p>&nbsp;</p>
                    <h6>{shipmentData.standardArabic || shipmentData.standardEnglish}</h6>
                  </div>
                  <p>3 to 4 business days</p>
                </label>
              </Col>
              <Col md='2'>
                <h6>$9.90</h6>
              </Col>
            </Row>
          </div>
        </div></>
    </>


  )
}

export default Shipping