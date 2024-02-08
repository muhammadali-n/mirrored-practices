import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import CheckoutLayout from '../layout/CheckoutLayout';
import { VendureService } from '@/services/vendure.service';
import { useRouter } from 'next/navigation';

interface CustomerDetails {
  title: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

interface ShippingAddress {
  fullName: string;
  streetLine1: string;
  city: string;
  postalCode: string;
  countryCode: string;
  phoneNumber: string;
}

interface ShippingMethod {
  name: string;
  id: string;
}

const gqService = new VendureService();

const CheckoutContainer: React.FC = () => {
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    title: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
  });

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    streetLine1: '',
    city: '',
    postalCode: '',
    countryCode: '',
    phoneNumber: '',
  });

  const router =useRouter();
  const [countries, setCountries] = useState<string[]>([]);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [shippingtMethodId, setShippingtMethodId] = useState<string | undefined>(undefined);

  useEffect(() => {
    getAvailableCountries();
    getAvailableShipmentMethods();
  }, []);

  const getAvailableCountries = async () => {
    const response = await gqService.availableCountries();
    setCountries(response.availableCountries);
  };

  const getAvailableShipmentMethods = async () => {
    const response = await gqService.eligibleShippingMethods();
    setShippingMethods(response.eligibleShippingMethods);
  };

  const handleCustomerDetailsChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setCustomerDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleShippingAddressChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const setCustomerForOrder = async () => {
    if (customerDetails) {
      const response = await gqService.setCustomerForOrder(customerDetails);
      return response;
    }
    return null;
  };

  const setOrderShippingAddress = async () => {
    if (shippingAddress) {
      await gqService.setOrderShippingAddress(shippingAddress);
    }
  };

  const handleShippingMethod = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setShippingtMethodId(value);
  };

  const setOrderShippingMethod = async () => {
    if (shippingtMethodId) {
      const response = await gqService.setOrderShippingMethod(shippingtMethodId);
      return response;
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    const cusRes =await setCustomerForOrder();
    await setOrderShippingAddress();
    const res =await setOrderShippingMethod();
    console.log(res);
    
    if(cusRes.setCustomerForOrder && res?.setOrderShippingMethod){
    router.push(`/payment?code=${res.setOrderShippingMethod.code}`);
    }
  };

  return (
    <div>
      <CheckoutLayout
        handleSubmit={handleSubmit}
        handleShippingAddressChange={handleShippingAddressChange}
        handleCustomerDetailsChange={handleCustomerDetailsChange}
        shippingMethods={shippingMethods}
        countries={countries}
        handleShippingMethod={handleShippingMethod}
      />
    </div>
  );
};

export default CheckoutContainer;
