// CheckoutForm.tsx
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { FormEvent } from 'react';

export const CheckoutForm = ({ orderCode,activeOrder }: { orderCode: string ,activeOrder:any}) => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event: FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
          return_url: location.origin + `/orderconfirmation/${orderCode}`,
          payment_method_data: {
              billing_details: {
                  address: {
                      city: activeOrder?.shippingAddress?.city,
                      country: activeOrder?.shippingAddress?.countryCode,
                      line1: activeOrder?.shippingAddress?.streetLine1,
                      postal_code: activeOrder?.shippingAddress?.postalCode,
                      state: activeOrder?.shippingAddress?.city
                  },
                  email: activeOrder?.customer?.emailAddress,
                  name: activeOrder?.customer?.firstName,
                  phone: activeOrder?.customer?.phoneNumber,
              }
          }
      },
  });
  

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
    </form>
  );
};