import { getContent } from '@/integrations/common-integration'
import { fetchShipment } from '@/integrations/sanity/sanity-integration'
import React, { useEffect, useState } from 'react'
import Shipping from '../Checkout/Shipping'

function ShipmentContainer() {
  const [shipmentFromSanity, setShipmentFromSanity] = useState({})

  useEffect(() => {
    const fetchData = async () => {

      const shipment = await getContent(fetchShipment)
      setShipmentFromSanity(shipment)
    }
    fetchData()

  })

  console.log("shipmentFromSanity", shipmentFromSanity);
  

  return (
    <Shipping shipmentFromSanity={shipmentFromSanity}/>
  )
}

export default ShipmentContainer