import OrderLayout from '@/layout/OrderLayout'
import { VendureService } from '@/services/vendure.service';
import React, { useEffect, useState } from 'react'
import Order from '../layout/Order';

export default function OrderContainer({param}:{param:string}) {
const [orderDetails,setOrderDetails]=useState();
    const gqService = new VendureService();
    const getOrderByCode =async ()=>{
       const response: any = await gqService.getOrderByCode(param);
       setOrderDetails(response)
    }
    useEffect(() => {
        getOrderByCode();
    }, [])
    
  return (
    <Order orderDetails={orderDetails} />
  )
}
