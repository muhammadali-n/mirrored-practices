import Link from 'next/link';
import React from 'react';

interface OrderSummeryCardProps {
    order: {
        totalQuantity: number;
        shippingWithTax: number;
        currencyCode: string;
        subTotalWithTax: number;
    };
}

const OrderSummeryCard: React.FC<OrderSummeryCardProps> = ({ order }) => {
    return (
        <div className="bg-white rounded-lg  max-w-md mx-auto">
            {/* Product Details */}
            <div className="mb-4">
                <p className="text-lg text-start font-semibold">Order Summary</p>
                <p className="text-gray-700">Total Quantity: {order?.totalQuantity}</p>
                <p className="text-gray-700">Shipping With Tax: {order?.shippingWithTax/100}</p>
            </div>
            {/* Total Details */}
            <div className="mb-4">
                <p className="text-lg font-semibold">
                    Order Total: {order?.currencyCode} {order?.subTotalWithTax/100}
                </p>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout">
                <button className="bg-black text-white w-80 h-10 rounded">Checkout</button>
            </Link>
        </div>
    );
};

export default OrderSummeryCard;
