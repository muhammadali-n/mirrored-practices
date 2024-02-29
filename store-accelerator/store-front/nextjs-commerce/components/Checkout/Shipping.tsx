import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'

function Shipping({cmsShipping, formData}:any) {

  const [selectedShippingMethod, setSelectedShippingMethod] = useState('');
  const handleShippingMethodChange = (e) => {
    setSelectedShippingMethod(e.target.value);
  };

  return (

    <>
      <h2>
        {cmsShipping?.contact.ar}
      </h2>
      <div className='shipping-info'>
        <><Row className='shipping-contact'>
          <Col md='4'>
            <h6>
              {cmsShipping?.contact.ar || cmsShipping?.cmsShipping?.contact?.en}
            </h6>
          </Col>
          <Col md='6'>
            <h6>
              {formData.name}
            </h6>
          </Col>
          <Col md='2'>
            <a href="#" >
              <h6>
                {cmsShipping?.change.ar || cmsShipping?.cmsShipping?.change?.en}
              </h6>
            </a>
          </Col>
        </Row><Row className='shipping-ship-to mt-3'>
            <Col md='4'>
              <h6>
                {cmsShipping?.shippingTo.ar || cmsShipping?.cmsShipping?.shippingTo?.en}
              </h6>
            </Col>
            <Col md='6'>
              <h6>
                {formData.address}
              </h6>
            </Col>
            <Col md='2'>
              <a href="#" >
                <h6>
                  {cmsShipping?.change.ar || cmsShipping?.cmsShipping?.change?.en}
                </h6>
              </a>
            </Col>
          </Row></>

      </div>
      <div className='mt-5'>
        <h4>
          {cmsShipping?.title?.ar || cmsShipping?.cmsShipping?.title?.en}
        </h4>
        <div className='shipping-method'>
          <Row className=''>
            <Col md='10'>
              <label className='economy'>
                <div className='d-flex'>

                  <input type="radio" name="shippingMethod" value="economy" className="form-check-input" disabled={true} checked={selectedShippingMethod === 'economy'}
                  // onChange={handleShippingMethodChange}
                  />
                  <p>&nbsp;</p><p>&nbsp;</p>
                  <h6 >
                    {cmsShipping?.economy?.ar || cmsShipping?.cmsShipping?.economy?.en}
                  </h6>

                </div>
                <p>5 to 8 business days</p>
              </label>
            </Col>
            <Col md='2'>
              <h6>$ 00</h6>
            </Col>
          </Row>
          <Row className=''>
            <Col md='10'>
              <label>
                <div className='d-flex'>

                  <input type="radio" name="shippingMethod" value="standard" className="form-check-input" disabled={true} checked={selectedShippingMethod === 'standard'}
                  // onChange={handleShippingMethodChange} 
                  />
                  <p>&nbsp;</p><p>&nbsp;</p>
                  <h6>
                    {cmsShipping?.standard?.ar || cmsShipping?.cmsShipping?.standard?.en}

                    {/* {shipmentData.standardArabic || shipmentData.standardEnglish} */}
                  </h6>
                </div>
                <p>3 to 4 business days</p>
              </label>
            </Col>
            <Col md='2'>
              <h6>$00</h6>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Shipping