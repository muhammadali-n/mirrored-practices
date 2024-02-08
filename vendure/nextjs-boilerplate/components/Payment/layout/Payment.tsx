import React from "react";
import { StripePayments } from "../stripe/StripePayments";

export default function Payment({
  paymentMethods,
  selectedpayment,
  handlePaymentMethod,
  code,
  stripePaymentIntent,
  handleCashOnDelivery,
  activeOrder
}: {
  paymentMethods: any;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-4">Payment Methods</h1>
        <div className="mb-4">
          <label
            htmlFor="paymentMethods"
            className="block text-sm font-medium text-gray-600"
          >
            Select Payment Method
          </label>
          <select
            id="paymentMethods"
            name="paymentMethods"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={handlePaymentMethod}
          >
            <option value="">Please select payment method</option>
            {paymentMethods?.map((item) => (
              <option value={item.code}>{item.name}</option>
            ))}
            {/* Add more payment methods as needed */}
          </select>
        </div>
        {selectedpayment === "stripe" ? (
          <>
           <StripePayments 
           clientSecret={stripePaymentIntent}
           orderCode={code}
           activeOrder={activeOrder}
           />
          </>
        ) : (
          <div className="text-center">
            <button onClick={()=>handleCashOnDelivery()}className="bg-black text-white py-1 px-6 rounded-md">
              Place order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
