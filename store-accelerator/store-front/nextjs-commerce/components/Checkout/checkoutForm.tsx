import React from 'react'
import { Col } from 'reactstrap'
import './module.css';

interface Props {
    formData:any
    handleSubmit:any
    handleInputChange:any
    selectedCountry:any
    handleCountryChange:any
    countryOptions:any


    // Add other props if needed
  }
  
  export default function CheckoutForm({ formData,handleSubmit,handleInputChange,selectedCountry,handleCountryChange,countryOptions }: Props) {
      return (
        <form onSubmit={handleSubmit}>
            <Col md='12' className='Contact mb-6'>
                <h4>Contact</h4>
                <input
                    type="text"
                    className="w-100 contact-input"
                    placeholder='Email or mobile phone number'
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <div className='d-flex mb-3'>

                    <input
                        type="checkbox"
                        className='form-check-input mt-3'
                        name="subscribe"
                        checked={formData.subscribe}
                        onChange={handleInputChange}
                    />
                    <p> &nbsp;</p>
                    <p className='mt-3'>Email me with news and offers</p>
                </div>
            </Col>
            <Col md='12' className='shipping-address'>
                <h4>Shipping address</h4>
                <div className='md-12 shiping-country mb-3'>
                    <select
                        className='selected-country'
                        value={selectedCountry}
                        onChange={handleCountryChange}
                    >
                        <option value="" disabled>{selectedCountry || 'Select Country'}</option>
                        {countryOptions.map((country:any) => (
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
                            placeholder='first name (optional)' />
                    </Col>
                    <Col md='6' className='mx-md-2'>
                        <input type="text"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            name="lastName"
                            className='form-input' placeholder='last name' />
                    </Col>
                </Col>

                <Col md='12' className=' mb-3' >
                    <input className='address'
                        value={formData.address}
                        onChange={handleInputChange}
                        name='address'
                        type="text" placeholder='Address' />
                </Col>
                <Col md='12' className=' mb-3'>
                    <input type="text"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        name='apartment'
                        className='appartment' placeholder='Apartment,suite,etc. (optional)' />
                </Col>
                <Col md='12' className='d-flex  mb-3'>
                    <Col md='4'>
                        <input type="text"
                            value={formData.city}
                            onChange={handleInputChange}
                            name='city'
                            className='city' placeholder='city' />
                    </Col>
                    <Col md='4' className='mx-md-2'>
                        <input type="text"
                            value={formData.state}
                            onChange={handleInputChange}
                            name='state'
                            className='state' placeholder='state' />

                    </Col>
                    <Col md='4'>
                        <input type="text"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            name='zipCode'
                            className='zip-code' placeholder='ZIP code' />

                    </Col>
                </Col>
                <Col className='d-flex  mb-6'>

                    <input type="checkbox"
                        checked={formData.saveInfo}
                        onChange={handleInputChange}
                        name='saveInfo'
                        className='form-check-input' />
                    <p> &nbsp;</p>
                    <p>Save this information for next time
                    </p>
                </Col>
                <Col md='12' className='d-flex mt-5 return-to-cart'>
                    <Col md='6'>
                        <p>Return to cart</p>
                    </Col>
                    <Col md='6 offset-2' className=''>
                        <button onClick={handleSubmit} className=' btn btn-primary shopping-btn'>
                            Continue to shopping
                        </button>
                    </Col>
                </Col>


            </Col>
        </form>
    )
}