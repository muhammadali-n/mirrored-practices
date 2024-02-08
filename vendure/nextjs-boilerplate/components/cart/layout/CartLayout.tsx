import React from 'react';
import Image from 'next/image';
import OrderSummeryCard from './OrderSummeryCard';
import ProductCartCard from './ProductCartCard';

interface CartLayoutProps {
    cartResponse: {
        totalQuantity: number;
        shippingWithTax: number;
        currencyCode: string;
        subTotalWithTax: number;
        lines: Array<any>;
    };
    handleIncrease: (id: string, quantity: number) => void;
    handleDecrease: (id: string, quantity: number) => void;
    handleDelete: (id: string) => void;
}

const CartLayout: React.FC<CartLayoutProps> = ({ cartResponse, handleIncrease, handleDecrease, handleDelete }) => {
    return (
        <div className="grid grid-cols-12">
                <div className="col-span-5 pt-3 left-100">
                    {cartResponse?.lines.map((item, i) => (
                        <ProductCartCard
                            key={i}
                            product={item}
                            currencyCode={cartResponse?.currencyCode}
                            handleDecrease={handleDecrease}
                            handleIncrease={handleIncrease}
                            handleDelete={handleDelete}
                        />
                    ))}
                </div>
                <div className="col-span-3"></div>
                <div className="col-span- mt-6 ">
                    <OrderSummeryCard order={cartResponse} />
                </div>
            </div>
    );
};

export default CartLayout;
