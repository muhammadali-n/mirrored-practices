import React from "react";

export default function Order({orderDetails}:{orderDetails:any}) {
  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {/* Order Confirmation Heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black">
            Successfully Placed Your Order
          </h2>
        </div>

        {/* Order Details */}
        <div className="flex">
          {/* Left Side - Order Information */}
          <div className="flex-1 pr-4 border">
            <div className="mb-4 ">
              <h3 className="text-lg font-semibold mb-2">Order Details</h3>
              {/* You can replace the placeholders with actual order data */}
              <div className="flex justify-between">
                <span className="text-gray-600">Order No:</span>
                <span className="text-black">{orderDetails?.code}</span>
              </div>
              {/* Add more order details as needed */}
            </div>
          </div>

          {/* Right Side - Order Total and Shipping */}
          <div className="flex-1 pl-4 border ml-1">
            <div className="mb-4 ">
              <h3 className="text-lg font-semibold mb-2">Order Total</h3>
              {/* You can replace the placeholders with actual order total data */}
              <div className="flex justify-between mr-1">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-black">{orderDetails?.currencyCode} {orderDetails?.subTotalWithTax/100}</span>
              </div>
              <div className="flex justify-between mr-1">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-black">{orderDetails?.currencyCode} {orderDetails?.shippingWithTax/100}</span>
              </div>
              <div className="flex justify-between mr-1">
                <span className="text-gray-600">Tax:</span>
                <span className="text-black">{orderDetails?.currencyCode} 10.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-4">
          <h3 className="text-lg font-semibold mb-4 col-span-3">
            Product Details
          </h3>
          {orderDetails?.lines?.map((product, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border flex items-start"
            >
              {/* Product Image */}
              <div className="col-span-1">
                <img
                  src={product?.featuredAsset?.preview}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-md mb-4"
                />
              </div>

              {/* Product Details (Name and Quantity) */}
              <div className="col-span-2 ml-4">
                <p className="text-lg font-semibold mb-2">{product?.productVariant?.name}</p>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
                {/* Add more product details as needed */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
