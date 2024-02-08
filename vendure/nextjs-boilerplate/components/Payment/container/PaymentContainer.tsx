import React, { use, useEffect, useState } from "react";
import Payment from "../layout/Payment";
import { VendureService } from "@/services/vendure.service";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { GET_ACTIVE_ORDER } from "@/queries/active-order.query";
import { useQuery } from "@/services/client";

export default function PaymentContainer() {
  const searchParam = useSearchParams();
  const orderCode = searchParam.get("code");
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState();
  const [selectedpayment, setSelectedpayment] = useState();
  const [stripePaymentIntent, setStripePaymentIntent] = useState();
  const gqService = new VendureService();
  let stripeError: string | undefined;
  const getPaymentMethods = async () => {
    const response = await gqService.eligiblePaymentMethods();
    setPaymentMethods(response?.eligiblePaymentMethods);
    if (
      response?.eligiblePaymentMethods.find(
        (method: { code: string | string[] }) => method.code.includes("stripe")
      )
    ) {
      try {
        const stripePaymentIntentResult = await gqService.createStripePaymentIntent();
        setStripePaymentIntent(
          stripePaymentIntentResult.createStripePaymentIntent ?? undefined
        );
      } catch (e) {
        stripeError = e.message;
      }
    }
  };
  const handleCashOnDelivery = async () =>{
    if(selectedpayment==="cash-on-delivery"){
      const res = await gqService.AddPaymentToOrder();
      if (res.state === "PaymentAuthorized") {
        router.push(`/orderconfirmation/${orderCode}`)
      }
    }
  }
  const transitionToState = async () =>{
    const res = await gqService.TransitionToState();
  }

  useEffect(() => {
    getPaymentMethods();
    transitionToState();
  }, []);

  const handlePaymentMethod = (e: {
    target: { value: React.SetStateAction<undefined> };
  }) => {
    setSelectedpayment(e.target.value);
  };

  const { data, error } = useQuery(GET_ACTIVE_ORDER);
  const activeOrder = (data as any)?.activeOrder;
  return (
    <Payment
      paymentMethods={paymentMethods}
      handlePaymentMethod={handlePaymentMethod}
      selectedpayment={selectedpayment}
      code={orderCode}
      stripePaymentIntent={stripePaymentIntent}
      handleCashOnDelivery={handleCashOnDelivery}
      activeOrder={activeOrder}
    />
  );
}
