import styles from './PrdouctGrid.module.css'
import { getProductById } from '../../integrations/shopify/shopify-integration';
import React, { useState, useEffect } from 'react';


interface Product {
  id: number;
  title: string;
  price: number;
  imageSrc: string;
}

interface HomePageContent{
    sections:any;
  
  }

// const ProductGridItem: React.FC<{ product: Product }> = ({ product }) => {
const ProductGridItem = ({ homePageContent }: { homePageContent: HomePageContent }) => {
    console.log("hbgtvfcrxd")

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            console.log("hbgtvfcrxd")
        try {
            const productIds = extractProductIds(homePageContent); // Extract product IDs from the section
            const productsData = await Promise.all(productIds.map(productId => getProductById(productId))); // Fetch products by ID
            setProducts(productsData);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, [homePageContent]);

      const extractProductIds = (section: any): string[] => {
        console.log("productIds")

        let productIds: string[] = [];
        // Iterate through sections
        section.sections.forEach((section: any) => {
            // Iterate through columns in each section
            section.columns.forEach((column: any) => {
                // Iterate through widgets in each column
                column.widgets.forEach((widget: any) => {
                    // Check if the widget is of type 'product' and has a productId
                    if (widget._type === 'product' && widget.productId) {
                        // Push the productId to the productIds array
                        productIds.push(widget.productId);
                    }
                });
            });
        });
        console.log("productIds", productIds);

        return productIds;
      }

      
  return (
    <h1>sdvds</h1>
    // <<div className={styles["style-34"]}>
    //   <a className={styles["style-35"]} href={`/product/${product.title}`}>
    //     <div className={styles["style-36"]}>
    //       <img
    //         alt={product.title}
    //         fetchpriority="high"
    //         decoding="async"
    //         data-nimg="fill"
    //         className={styles["style-37"]}
    //         sizes="(min-width: 768px) 66vw, 100vw"
    //         src={product.imageSrc}
    //       />
    //       <div className={styles["style-38"]}>
    //         <div className={styles["style-39"]}>
    //           <h3 className={styles["style-40"]}>{product.title}</h3>
    //           <p className={styles["style-41"]}>
    //             ${product.price.toFixed(2)}<span className={styles["style-42"]}>USD</span>
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </a>
    // </div>>
  );
};

export default ProductGridItem;
