// File: StripePayments.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

const getStripe = (publicKey: string) => {
    return loadStripe(publicKey);
  };
type StripePaymentsProps = {
  clientSecret: string;
  orderCode: string;
  activeOrder:any;
}
const stripePromise = getStripe("pk_test_51KzxABSHEeIvLWQVoRosNj1Ye9BJ1JOP8K8rqLAUlGpnnlmlALqkXesr9olY1QdsumIjkMB7gyGGdmB3AliLVV6c00AAFUMFqD");
const StripePayments = ({ clientSecret, orderCode,activeOrder }: StripePaymentsProps) => {
  const options = {
    clientSecret,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm orderCode={orderCode} activeOrder={activeOrder} />
    </Elements>
  );
};

export { StripePayments };
