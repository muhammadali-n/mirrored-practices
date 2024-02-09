import React from 'react';
import styles from '../../styles/product-card.module.css';

interface Product {
  id: number;
  title: string;
  price: number;
  imageSrc: string;
}


// ProductCard.tsx


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  console.log("pro", product);

  return (
    <div className={styles['product-card-container']}>
      <div className={styles['flex-container']}>
      <div>
          <img src={product.imageSrc} alt={product.title} className={styles['product-image']} />
        </div>
        <div className={styles['product-title']}>
          {product.title}
        </div>
       
        <div className={styles['product-price']}>
          ${product.price}
        </div>
        <div className={styles['product-price']}>
          <button> Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


