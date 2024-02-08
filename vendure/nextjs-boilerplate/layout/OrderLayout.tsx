"use client"
import OrderContainer from '@/components/order/container/OrderContainer'
import React from 'react'

export default function OrderLayout({param}:{param:string}) {
  return (
    <OrderContainer param={param}/>
  )
}
