import React from 'react';
import styles from './PrdouctGrid.module.css';

interface Product {
  id: number;
  title: string;
  price: number;
  imageSrc: string;
}

interface HomePageContent{
  sections:any;

}

const ProductCarousel: React.FC<{ product: any }> = ({ product }) => {
  return(
    <div className={styles["style-61"]}>
      <ul className={styles["style-62"]}>
        {product.map(item=>(
          <li key={item.id} className={styles["style-63"]}>
            <a className={styles["style-64"]} href="/product/acme-mug">
              <div className={styles["style-65"]}>
                <img
                  alt="Acme Mug"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className={styles["style-66"]}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  src={item.imageSrc}
                />
                <div className={styles["style-67"]}>
                  <div className={styles["style-68"]}>
                    <h3 className={styles["style-69"]}>{item.title}</h3>
                    <p className={styles["style-70"]}>
                      <span className={styles["style-71"]}>USD</span>
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}