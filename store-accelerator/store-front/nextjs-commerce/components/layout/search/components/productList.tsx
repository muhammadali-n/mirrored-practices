"use client"

import styles from '../../../../styles/product.module.css';
import ProductCard from '@/components/grid/productcard';

export default function ProductList(props:any) {
    

    return (
        <>
            {props.searchValue ? (
                <p className="mb-4">
                    {props.products?.length === 0
                        ? 'There are no products that match '
                        : `Showing ${props.products?.length} ${props.resultsText} for `}
                    <span className="font-bold">&quot;{props.searchValue}&quot;</span>
                </p>
            ) : null}
            {<div className={styles['center-container']}>
                <div className={styles['grid-container']}>
                    {props.products?.map((product) => (
                        <ProductCard key={product.id} product={product} className={styles['grid-item']} button={props.button} />
                    ))}
                </div>

            </div>}
        </>
    );
}
