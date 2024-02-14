import React, { useContext, useState } from 'react';
import styles from '../../styles/product-card.module.css';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Context } from '@/app/context';

interface Product {
  id: number;
  title: string;
  price: number;
  imageSrc: string;
}


// ProductCard.tsx


const ProductCard: React.FC<{ product: Product, button: any }> = ({ product, button }) => {
  const [cart, setCart] = useState([]);
  const contextValue= useContext(Context)
  const router = useRouter();
  const { handleAddToCart } = contextValue as { cartItems: any[]; handleAddToCart: (getCurrectItem: any) => void };

  const addToCart=(product:any)=>{

    handleAddToCart(product)
    // router.push("/cart/cart");
  }
const arabicTranslation = button.sections?.translation?.ar;

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
            {Array.isArray(button) && button.map((item: any, index: any) => (
              <button key={index}
                style={{ backgroundColor: item?.sections?.ButtonColor?.hex }} className={styles['add-to-cart']}
                onClick={()=>addToCart(product)}
                >
                {item.sections?.translation?.ar || item.sections?.translation?.en}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


