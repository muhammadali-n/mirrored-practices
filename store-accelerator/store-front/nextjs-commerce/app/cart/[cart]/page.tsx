'use client'
import './style.css';
import {Container } from 'reactstrap';
import CartContainer from '@/components/cart/cartContainer';

export default  function CartPage() {

  return (

    <Container>
      <CartContainer/>
    </Container>
  );
}
