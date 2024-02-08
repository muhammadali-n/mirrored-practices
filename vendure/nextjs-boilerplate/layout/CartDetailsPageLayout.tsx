"use client"
import CartContainer from '@/components/cart/container/CartContainer'
import { GET_ACTIVE_ORDER } from '@/queries/active-order.query';
import { useQuery } from '@/services/client';
import React, { useState, useEffect } from 'react'

export default function CartDetailsPageLayout() {
  return (
    <div>
      <CartContainer/>
    </div>
  )
}
