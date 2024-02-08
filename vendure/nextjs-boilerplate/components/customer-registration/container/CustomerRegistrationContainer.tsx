import React, { useState } from 'react'
import CustomerRegistration from '../layout/CustomerRegistration'
import { VendureService } from '@/services/vendure.service';

export default function CustomerRegistrationContainer() {
    const [formData, setFormData] = useState({
        firstName: '',
        emailAddress: '',
        phoneNumber: '',
        age: '',
      });
    
      const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const { age, ...restFormData } = formData;
        const input={...restFormData,customFields: {
            customFieldCustomerAge: age || '',
          },}
const gqService = new VendureService();
const response = await gqService.setCustomerRegister(input);

        
        // Add your form submission logic here
        console.log('Form submitted:', response);
        // You can send the form data to an API, perform validation, etc.
      };
    
  return (
    <CustomerRegistration
    handleSubmit={handleSubmit}
    handleChange={handleChange}
    formData={formData}
    />
  )
}
