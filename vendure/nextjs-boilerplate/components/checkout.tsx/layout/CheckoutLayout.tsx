import React, { ChangeEvent, FormEvent } from 'react';
interface CheckoutLayoutProps {
  handleShippingAddressChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleCustomerDetailsChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  countries: any[];
  shippingMethods: any[];
  handleShippingMethod: (e:ChangeEvent<HTMLSelectElement | HTMLSelectElement>) => void;
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({
  handleShippingAddressChange,
  handleCustomerDetailsChange,
  handleSubmit,
  shippingMethods,
  countries,
  handleShippingMethod,
}) => {
    return (
        <div className="container mx-auto p-4 grid grid-cols-2 gap-8">
            <div>
                <h2 className="text-2xl font-semibold mb-4">Customer Details</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="mt-1 p-2 border w-full rounded-md"
                            onChange={handleCustomerDetailsChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="mt-1 p-2 border w-full rounded-md"
                            onChange={handleCustomerDetailsChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            onChange={handleCustomerDetailsChange}
                            className="mt-1 p-2 border w-full rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
                            emailAddress
                        </label>
                        <input
                            type="text"
                            id="emailAddress"
                            onChange={handleCustomerDetailsChange}
                            name="emailAddress"
                            className="mt-1 p-2 border w-full rounded-md"
                        />
                    </div>
                </div>

            </div>

            {/* Shipping Address Column */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input onChange={handleShippingAddressChange} type="text" id="fullName" name="fullName" className="mt-1 p-2 border w-full rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="streetLine1" className="block text-sm font-medium text-gray-700">
                            House Name
                        </label>
                        <input
                            onChange={handleShippingAddressChange}
                            type="text"
                            id="streetLine1"
                            name="streetLine1"
                            className="mt-1 p-2 border w-full rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                        </label>
                        <input
                            type="email"
                            id="city"
                            onChange={handleShippingAddressChange}
                            name="city"
                            className="mt-1 p-2 border w-full rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <select
                            id="countryCode"
                            name="countryCode"
                            className="mt-1 p-2 border w-full rounded-md text-black"
                            onChange={handleShippingAddressChange}
                        >
                            <option value="" >
                                Please select a country
                            </option>
                            {countries?.map((item: { code: string | number | readonly string[] | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) =>
                                <option value={item?.code}>
                                    {item?.name}
                                </option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            onChange={handleShippingAddressChange}
                            className="mt-1 p-2 border w-full rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">
                        Postal Code
                        </label>
                        <input
                            type="text"
                            id="postalCode"
                            onChange={handleShippingAddressChange}
                            name="postalCode"
                            className="mt-1 p-2 border w-full rounded-md"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold mb-4"> Shipment Method</h2>
                    <label htmlFor="shipmentMethod" className="block text-sm font-medium text-gray-700">
                        Shipment Method
                    </label>
                    <select
                        id="shipmentMethod"
                        name="shipmentMethod"
                        className="mt-1 p-2 border w-full rounded-md"
                        onChange={handleShippingMethod}
                    >
                        <option value="">
                            Please select a shipping method
                        </option>
                        {
                            shippingMethods?.map((item: { name: string,id:string }) =>
                                <option key={item.name} value={item.id}>
                                    {item.name}
                                </option>)
                        }
                    </select>
                </div>
                <div className="text-center">
                    <button type="button" className="bg-black text-white p-3 rounded-md w-80" onClick={handleSubmit}>
                    Proceed to Payment
                    </button>
                </div>
                {/* Button inside Shipping Address Column */}
            </div>
        </div>
    );
};

export default CheckoutLayout;
