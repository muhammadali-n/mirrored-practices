// pagex.tsx
'use client'
import { useEffect, useState } from 'react';
import { Collection, Product } from '../../../lib/types';
import { TransformationResult, getCollections, getProductByCollection } from '../../../integrations/shopify/shopify-integration';
import ProductCard from '@/components/grid/productcard';
import styles from '../../../styles/product.module.css';
import { performCommonIntegration, IntegrationResult, getContent } from '@/integrations/common-integration';
import { sorting } from '@/lib/constants';
import { fetchProductCard, fetchPlpData } from '@/integrations/sanity/sanity-integration';
import Footer from '@/components/layout/footer';

export default function YourComponent() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [collections, setCollections] = useState<Collection[] | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string>('All');
  const [sortKey, setSortKey] = useState<string>('RELEVANCE');
  const [reverse, setReverse] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState({ title: 'Relevance', slug: null, sortKey: 'RELEVANCE', reverse: false });
  const [title, setTitle] = useState<string>('Relevance');
  const [button, setButton] = useState("");
  const [plpData, setPlpData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getContent(fetchPlpData);
        setPlpData(response);
        const transformedData = await performCommonIntegration(getProductByCollection, selectedCollection, sortKey, reverse);
        setProducts(transformedData);
        const transCollectionData = await performCommonIntegration(getCollections);
        setCollections(transCollectionData);
        const button = await getContent(fetchProductCard)
        setButton(button)
      } catch (error) {
        setProducts(null);
        console.error('Error fetching collections:', error);

      }
    };
    fetchData();
  }, []);
  if (products === null && collections === null) {
    return <p>Loading...</p>;
  }
  //  if (products === null ){
  //   return  <p>Loading...</p>;
  //  }


  const handleCategoryClick = async (collectionTitle: string) => {
    try {
      setProducts([])
      const transformedData = await performCommonIntegration(getProductByCollection, collectionTitle, sortKey, reverse);
      setProducts(transformedData);
      setSelectedCollection(collectionTitle);
    } catch (errors) {
      setProducts(null);
      setSelectedCollection(collectionTitle);
      console.error('Error fetching products for collection:', errors);
    }
  };

  const handleSortChange = async (selectedSort: string, reverse: Boolean, title: string) => {
    try {
      const transformedData = await performCommonIntegration(getProductByCollection, selectedCollection, selectedSort, reverse);
      setProducts(transformedData);
      setSortKey(selectedSort);
      setTitle(title);
    }
    catch (errors) {
      setProducts(null);
      setSortKey(selectedSort);
      setTitle(title);
      console.error('Error fetching products for collection:', errors);
    }

  };
  // Render the component once products are available
  return (
    <>
      <div className={styles['page-container']}>

        {collections === null ? (
          <p>Loading collections...</p>
        ) : (
            <div className={styles['collection-list']}>

              {Array.isArray(plpData) && plpData.map((page: any, index: number) => (
                <>
                  <h2>{page?.collections?.translation?.ar || page?.collections?.translation?.en}</h2>
                  <ul className={styles['list']}>
                    {collections.map((collection) => (
                      <li key={collection.id} onClick={() => handleCategoryClick(collection.title)} style={{ listStyleType: 'none' }} className={collection.title === selectedCollection ? styles['selected-option'] : ''}>
                        {collection.title}
                      </li>
                    ))}
                  </ul>
                </>
              ))}
            </div>
         
        )}
        {products === null || products.length == 0 ? (
          <>
            <div className={styles['center-container']}>
              <div className={styles['grid-container']}>
                <p className="{styles['no-products-message']">No products found.</p>
              </div>

            </div>
            <div className={styles['filters']}>
              {Array.isArray(plpData) && plpData.map((page: any, index: number) => (
                <>
                  <label>{page?.sortby?.translation?.ar||page?.sortby?.translation?.en}</label>
                  <ul className={styles['sort-options']}>
                    {sorting.map((option) => (
                      <li key={option.title} onClick={() => handleSortChange(option.sortKey, option.reverse, option.title)} style={{ listStyleType: 'none' }} className={option.title === title ? styles['selected-option'] : ''}>{option.title}</li>
                    ))}
                  </ul>
                </>
              ))}
            </div>
          </>
        ) : (
          <>

            <div className={styles['center-container']}>
              <div className={styles['grid-container']}>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} className={styles['grid-item']} button={button} />
                ))}
              </div>

            </div>
              <div className={styles['filters']}>
                {Array.isArray(plpData) && plpData.map((page: any, index: number) => (
                  <>
                    <label>{page?.sortby?.translation?.ar || page?.sortby?.translation?.en}</label>
                    <ul className={styles['sort-options']}>
                      {sorting.map((option) => (
                        <li key={option.title} onClick={() => handleSortChange(option.sortKey, option.reverse, option.title)} style={{ listStyleType: 'none' }} className={option.title === title ? styles['selected-option'] : ''}>{option.title}</li>
                      ))}
                    </ul>
                  </>
                ))}
              </div>
          </>

        )}

      </div>
      <Footer />
    </>
  );
}

