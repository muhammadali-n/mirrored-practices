import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import productImage from '../../public/630e6f8694c33de6936b5cd0_2.png'


function Cart() {

  const [quantity, setQuantity] = useState(1);
  return (
    <Row>
      <Col md='12'>
        <div className='cart'>
          <div>
            <Link href='#'>
              <Button className='close-button'>X </Button>
            </Link>
            <Col className='mt-3'>
              <h4>My Cart</h4>
            </Col>
          </div>

          <Row className='cart-item'>
            <Col md='8'>
              <Row>
                <Col md='4' className='product-card'>
                  <Image src={productImage} alt='aaa' width={80} height={80} />
                  {/* <Button className='' >X</Button> */}
                </Col>
                <Col md='8' className=''>
                  <h6 className='font-weight-800'>Acme Drawstring Bag</h6>
                  <p className='text-secondary'>White / 10 x 15 inch</p>
                </Col>

              </Row>
            </Col>

            <Col md='4' className='quantity text-end'>
              <div className='price'>
                - $10.00 USD
              </div>
              <div className='quantity-control text-end' >

                <Button className='quantity-control-btn' onClick={() => setQuantity(quantity - 1)}>-</Button>
                {quantity}
                <Button className='quantity-control-btn' onClick={() => setQuantity(quantity + 1)}>+</Button>
              </div>
            </Col>
          </Row>
          <Row >
            <Col md='12'>
              <div className='bottom'>
                <Row className='taxes'>
                  <Col md='6' >
                    <p className='font-weight-bold'>Taxes:</p>
                  </Col>
                  <Col md='6' className='text-end'>
                    <h5>$0.00 USD</h5>
                  </Col>
                </Row>

                <Row className='shipping'>
                  <Col md='6'>
                    <p className="font-weight-bold">Shipping:</p>
                  </Col>
                  <Col md='6' className='text-end'><p> Calculated at checkout</p></Col>

                </Row>
                <Row className='total'>
                  <Col md='6'>
                    <p className='font-weight-bold'> Total</p>
                  </Col>
                  <Col md='6' className='text-end'>
                    <h5> ${(10 * quantity).toFixed(2)} USD</h5>
                  </Col>
                </Row>
                <Row className='text-center mt-4'>
                  <Col >
                    <Button className='proceed-checkout font-weight-bold'> Proceed to Checkout</Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Col>


    </Row>
  )
}

export default Cart