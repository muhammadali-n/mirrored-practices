import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductCardProps {
    product: {
        productName: string;
        currencyCode: string;
        slug: string;
        productAsset: { preview: string };
        priceWithTax: { max: number, value: number };
    };
}

export default function ProductCardLayout({ product }: ProductCardProps) {
    return (
        <div className="max-w-80 mx-auto bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
            <Link href={`/product/${product.slug}`}>
                    <div className="h-[300px] w-60 relative">
                        <Image
                            className="w-full h-44 object-cover"
                            layout="fill"
                            objectFit="fill"
                            src={product.productAsset.preview}
                            alt={product.productName}
                        />
                    </div>
                    <div className="px-4 py-2">
                        <p className="block mt-1 text-lg leading-tight font-medium text-black hover:text-gray-600">
                            {product.productName}
                        </p>
                        <p className="mt-2 text-gray-600">
                            {product.currencyCode} {product?.priceWithTax?.max /100|| product?.priceWithTax?.value/100}
                        </p>
                    </div>
            </Link>
        </div>
    );
}
