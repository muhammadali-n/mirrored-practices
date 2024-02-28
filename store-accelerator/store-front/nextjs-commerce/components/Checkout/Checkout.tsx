'use client'
import React, { useState } from 'react'
import { Button, Col, Form, Label, Row } from 'reactstrap'
import './module.css';
import Image from 'next/image';
import Shipping from './Shipping';
function Checkout({ cartProducts, subTotal, sanityContent, shipmentFromSanity, onFormSubmit, products, price }: any) {
  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ];
  const [selectedCountry, setSelectedCountry] = useState<any>()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const handleCountryChange = (e: any) => {
    setFormData((prevData) => ({
      ...prevData,
      country: e.target.value,
    }))
  };

  const [formData, setFormData] = useState({
    email: '',
    subscribe: false,
    country: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    saveInfo: false,
  });

  // console.log("formData", formData);


  // Handler for input changes
  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log('Form submitted with data:', formData);
    setFormSubmitted(true);
    onFormSubmit(formData);

  };

  return (
    <Row>
      <Col md='12' className='checkout'>
        <Row>
          <Col md='6' className=' mt-3 checkout-left '>
            {
              Array.isArray(sanityContent) && sanityContent.map((checkoutProcess: any) => (
                <div key={checkoutProcess._id} className='accordion d-flex '>

                  <p style={{ marginRight: '10px' }}>{checkoutProcess?.checkoutProcess?.cart.ar || checkoutProcess?.checkoutProcess?.cart?.en}</p>
                  <b>&gt; </b>
                  <p> &nbsp;</p>
                  <p style={{ marginRight: '10px' }}>{checkoutProcess?.checkoutProcess?.shipping?.ar || checkoutProcess?.checkoutProcess?.shipping?.en}</p>
                  <b>&gt; </b>
                  <p> &nbsp;</p>
                  <p>{checkoutProcess?.checkoutProcess?.payment?.ar || checkoutProcess?.checkoutProcess?.payment?.en}</p>
                </div>
              ))}


            {
              Array.isArray(sanityContent) && sanityContent.map((checkoutProcess: any) => (
                // eslint-disable-next-line react/jsx-key
                formSubmitted ? <Shipping shipmentFromSanity={shipmentFromSanity} formData={formData} />
                  :
                  <>

                    <form onSubmit={handleSubmit}>
                      <Col md='12' className='Contact mb-6'>
                        <h4>{checkoutProcess?.Contact?.title?.ar || checkoutProcess?.Contact?.title?.en}</h4>
                        <input
                          type="text"
                          className="w-100 contact-input"
                          placeholder={checkoutProcess?.Contact?.placeholder?.ar || checkoutProcess?.Contact?.placeholder?.en}
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange} />
                        <div className='d-flex mb-3'>

                          <input
                            type="checkbox"
                            className='form-check-input mt-3'
                            name="subscribe"
                            checked={formData.subscribe}
                            onChange={handleInputChange} />
                          <p> &nbsp;</p>
                          <p className='mt-3'>{checkoutProcess?.Contact?.subscription?.ar || checkoutProcess?.Contact?.subscription?.en}</p>
                        </div>
                      </Col>
                      <Col md='12' className='shipping-address'>
                        <h4>{checkoutProcess?.shipping?.title?.ar || checkoutProcess?.shipping?.title?.en}</h4>
                        <div className='md-12 shiping-country mb-3'>
                          <select
                            className='selected-country'
                            value={selectedCountry}
                            onChange={handleCountryChange}
                          >
                            <option value="" disabled>{selectedCountry || 'Select Country'}</option>
                            {countryOptions.map((country) => (
                              <option key={country.value} value={country.value}>
                                {country.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <Col md='12' className='d-flex form-name'>
                          <Col md='6' className='mb-3 mr-md-2'>
                            <input type="text" className='form-input'
                              value={formData.firstName}
                              onChange={handleInputChange}
                              name="firstName"
                              placeholder={checkoutProcess?.shipping?.firstName?.ar || checkoutProcess?.shipping?.firstName?.en} />
                          </Col>
                          <Col md='6' className='mx-md-2'>
                            <input type="text"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              name="lastName"
                              className='form-input' placeholder={checkoutProcess?.shipping?.lastName?.ar || checkoutProcess?.shipping?.lastName?.en} />
                          </Col>
                        </Col>

                        <Col md='12' className=' mb-3'>
                          <input className='address'
                            value={formData.address}
                            onChange={handleInputChange}
                            name='address'
                            type="text" placeholder={checkoutProcess?.shipping?.address?.ar || checkoutProcess?.shipping?.address?.en} />
                        </Col>
                        <Col md='12' className=' mb-3'>
                          <input type="text"
                            value={formData.apartment}
                            onChange={handleInputChange}
                            name='apartment'
                            className='appartment' placeholder={checkoutProcess?.shipping?.apartment.ar || checkoutProcess?.shipping?.apartment?.en} />
                        </Col>
                        <Col md='12' className='d-flex  mb-3'>
                          <Col md='4'>
                            <input type="text"
                              value={formData.city}
                              onChange={handleInputChange}
                              name='city'
                              className='city' placeholder={checkoutProcess?.shipping?.city?.ar || checkoutProcess?.shipping?.city?.en} />
                          </Col>
                          <Col md='4' className='mx-md-2'>
                            <input type="text"
                              value={formData.state}
                              onChange={handleInputChange}
                              name='state'
                              className='state' placeholder={checkoutProcess?.shipping?.state?.ar || checkoutProcess?.shipping?.state?.en} />

                          </Col>
                          <Col md='4'>
                            <input type="text"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              name='zipCode'
                              className='zip-code' placeholder={checkoutProcess?.shipping?.zip?.ar || checkoutProcess?.shipping?.zip?.en} />

                          </Col>
                        </Col>
                        <Col className='d-flex  mb-6'>

                          <input type="checkbox"
                            checked={formData.saveInfo}
                            onChange={handleInputChange}
                            name='saveInfo'
                            className='form-check-input' />
                          <p> &nbsp;</p>
                          <p>{checkoutProcess?.shipping?.saveInfo?.ar || checkoutProcess?.shipping?.saveInfo?.en}
                          </p>
                        </Col>



                      </Col>
                    </form>


                  </>

              ))

            }
            {
              Array.isArray(sanityContent) && sanityContent.map((checkoutProcess: any) => (
                <><Col md='12' className='d-flex mt-5 return-to-cart'>
                  <Col md='6'>
                    <p>{checkoutProcess?.bottomButtons?.returnToCart?.ar || checkoutProcess?.bottomButtons?.returnToCart?.en}</p>
                  </Col>
                  <Col md='6 offset-2' className=''>
                    <button onClick={handleSubmit} className=' btn btn-primary shopping-btn'>
                      {checkoutProcess?.bottomButtons?.continueShoppingButton?.ar || checkoutProcess?.bottomButtons?.continueShoppingButton?.en}
                    </button>
                  </Col>
                </Col><div className='d-flex mt-3'>

                    <p className=''>{checkoutProcess?.copyrightNotice?.rights?.ar || checkoutProcess?.copyrightNotice?.rights?.ern}</p>
                    <p> &nbsp;</p>
                    <p>{checkoutProcess?.copyrightNotice?.shopName?.ar || checkoutProcess?.copyrightNotice?.shopName?.en}</p>
                  </div></>
              ))
            }

          </Col>
          <Col md='6' className='checkout-right'>
            {/* <Row className='cart-item mb-4'>
              {cartProducts && Object.keys(cartProducts).length > 0 &&
                Object.values(cartProducts).map((cartItem: any) => (
                  <React.Fragment key={cartItem.productId}>
                    <Col md='8'>
                      <Row>
                        <Col md='4' className='product-card'>
                          <div className="image-container">
                            <div className="label-container">
                              <span className="label">1</span>
                            </div>
                            <Image src={cartItem.imageSrc} alt={cartItem.title} width={80} height={80} />

                          </div>
                        </Col>
                        <Col md='8'>
                          <h6 className='font-weight-800'>{cartItem.title}</h6>
                          <p className='text-secondary'>{cartItem.description}</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col md='4' className='quantity text-end' key={cartItem.productId}>
                      <div className='price text-end'>
                        ${cartItem.price} USD
                      </div>
                    </Col>
                  </React.Fragment>
                ))
              }
            </Row> */}
            {products &&
              products.map((product: any) => (
                <Row key={product.id} className='mb-3'>
                  <Col md='2' className='product-card'>
                    <Image src={product.merchandise.product.featuredImage.url} alt={product.merchandise.product.title} width={80} height={80} />
                    <Button className='remove-button'>
                        {product.quantity}
                        </Button>
                  </Col>
                  <Col md='4' className=''>
                    <h6 className='font-weight-800'>{product.merchandise.product.title}</h6>
                    <p className='text-secondary'>{product.merchandise.product.description}</p>
                  </Col>
                </Row>
              ))
            }

            <Row key={''}>
              <Col md='12'>
                {Array.isArray(sanityContent) && sanityContent.map((checkoutProcess: any) => (
                  <div key={checkoutProcess.id} className='bottom'>
                    <Row className='taxes'>
                      <Col md='6'>
                        {checkoutProcess?.quantityInfo?.subTotal?.ar || checkoutProcess?.quantityInfo?.subTotal?.en}
                      </Col>
                      <Col md='6' className='text-end'>
                        <h5>{price?.subtotalAmount?.amount}&nbsp; {price?.subtotalAmount?.currencyCode}</h5>
                      </Col>
                    </Row>

                    <Row className='shipping'>
                      <Col md='6'>
                        {checkoutProcess?.quantityInfo?.shipping?.ar || checkoutProcess?.quantityInfo?.shipping?.en}

                      </Col>
                      <Col md='6' className='text-end muted'><h5>{price?.totalTaxAmount?.amount}&nbsp; {price?.totalTaxAmount?.currencyCode}</h5></Col>
                    </Row>

                    <Row className='total'>
                      <Col md='6'>
                        <h4>
                          {checkoutProcess?.quantityInfo?.total?.ar || checkoutProcess?.quantityInfo?.total?.en}
                        </h4>
                      </Col>
                      <Col md='6' className='text-end'>
                        <h4>{price?.totalAmount?.amount}&nbsp; {price?.totalAmount?.currencyCode}</h4>
                      </Col>
                    </Row>

                  </div>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Checkout