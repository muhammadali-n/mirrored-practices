'use client'
import './style.css';
import {Container } from 'reactstrap';

import Cart from '@/components/cart/cart';

export default  function CartPage() {

  return (

    <Container>
      <Cart/>
    </Container>
  );
}
