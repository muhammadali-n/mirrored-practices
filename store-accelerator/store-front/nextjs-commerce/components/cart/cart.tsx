import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import { Context } from '@/app/context';

interface CartProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: string;
  imageSrc: string;
  quantity: number;
}

interface LocaleString {
  ar: string;
  _type: string;
  en: string;
}

interface CheckoutButton {
  buttonName: string;
  _type: string;
  translation: LocaleString;
  ButtonColor: {
    alpha: number;
    _type: string;
    hex: string;
  };
}
interface CartProps {
  cartProducts: CartProduct;
  CheckoutButton: CheckoutButton;
  removeFromCart: (productId: string) => void;
  handleClick: () => void;
  totalPrice: number;
}


const Cart: React.FC<CartProps> = ({ cartProducts, CheckoutButton, removeFromCart, handleClick, totalPrice }) => {
  const contextValue= useContext(Context)
  const { handleAddToCart } = contextValue as { cartItems: any[]; handleAddToCart: (getCurrectItem: any) => void };

  const addToCart=(product:any)=>{

    handleAddToCart(product)
    // router.push("/cart/cart");
  }
  console.log("cartProducts", CheckoutButton);
  
  return (
    <Row>
      <Row>
        <Col md='8'>
          <div>.
            {/* <h4>My Cart</h4> */}
          </div>
        </Col>
      </Row>
      <Col md='2'>
        <div className='cart'>
          <div>
            <Button className='close-button' onClick={handleClick}>X </Button>
            <Col className='mt-3'>
              <h4>My Cart</h4>
            </Col>
          </div>
          <Row className='cart-items'>
            {Object.keys(cartProducts).length > 0 ? (
              Object.values(cartProducts).map((cartItem: any) => (
                <Row className='cart-item' key={cartItem.id}>
                  <Col md='8'>
                    <Row>
                      <Col md='4' className='product-card'>
                        <Image src={cartItem.imageSrc} alt={cartItem.title} width={80} height={80} />
                        <Button className='remove-button' onClick={() => removeFromCart(cartItem.id)}>
                          X
                        </Button>
                        {/* <Button className='' >X</Button> */}
                      </Col>
                      <Col md='8' className=''>
                        <h6 className='font-weight-800'>{cartItem.title}</h6>
                        <p className='text-secondary'>{cartItem.description}</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col md='4' className='quantity text-end'>
                    <div className='price text-center'> $ {cartItem.price} USD</div>
                    <div className='quantity-control text-end'>
                      <Button
                        className='quantity-control-btn'
                        onClick={() => removeFromCart(cartItem.id)}
                      >
                        -
                      </Button>
                      {cartItem.quantity}
                      <Button
                        className='quantity-control-btn'
                        // onClick={() => addToCart(cartItem.id)}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                </Row>
              ))
            ) : (
              <p className="text-center d-grid">No items in the cart</p>
            )}
          </Row>
          {Object.keys(cartProducts).map((itemId) => (
            <Row key={itemId}>
              <Col md='12'>
                <div className='bottom'>
                  <Row className='taxes'>
                    <Col md='6'>
                      <p className='font-weight-bold muted'>Taxes:</p>
                    </Col>
                    <Col md='6' className='text-end'>
                      <h5>$ 0.00 USD</h5>
                    </Col>
                  </Row>

                  <Row className='shipping'>
                    <Col md='6'>
                      <p className="font-weight-bold muted">Shipping:</p>
                    </Col>
                    <Col md='6' className='text-end muted'><p> Calculated at checkout</p></Col>
                  </Row>

                  <Row className='total'>
                    <Col md='6'>
                      <p className='font-weight-bold muted'> Total</p>
                    </Col>
                    <Col md='6' className='text-end'>
                      <h5>$ {totalPrice} USD</h5>
                    </Col>
                  </Row>

                  <Row className='text-center mt-4'>
                    <Col>
                      {Array.isArray(CheckoutButton) && CheckoutButton.map((item: any, index: any) => (
                        <button key={index}
                          style={{ backgroundColor: item?.sections?.ButtonColor?.hex }}
                          className='proceed-checkout'
                        >
                          {item.sections?.translation?.ar || item.sections?.translation?.en}
                        </button>
                      ))}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          ))}

        </div>
      </Col>


    </Row>
  )
}

export default Cart