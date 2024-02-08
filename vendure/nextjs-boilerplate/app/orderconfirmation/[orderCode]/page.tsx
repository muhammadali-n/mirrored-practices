import OrderLayout from "@/layout/OrderLayout";
import { VendureService } from "@/services/vendure.service";
import Image from "next/image";
import { string } from "prop-types";
import React from "react";

export default function page({params}: {
  params: { orderCode: string };
}) {
  return (
    <OrderLayout param={params.orderCode} />
  )
}

