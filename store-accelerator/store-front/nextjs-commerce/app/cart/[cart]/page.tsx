'use client'
import { useState } from 'react';
import './style.css';
import Link from 'next/link';
import { Button, Col, Container, Row } from 'reactstrap';
import image from '../../../public/630e6f8694c33de6936b5cd0_2.png'
import Image from 'next/image';
import { getDataByQuery } from '@/integrations/sanity/sanity-integration';
import Cart from '@/components/cart/cart';

export default  function CartPage() {
  const [quantity, setQuantity] = useState(1);

  // const button = await getDataByQuery("*[_type == 'button' && buttonName == 'Proceed to checkout']");
  
// console.log("nnnn", button);

  return (

    <Container>
      <Cart/>
    </Container>
  );
}
