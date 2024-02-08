'use client'
import React, { useEffect, useState } from 'react';
import { performCommonIntegration, IntegrationResult } from '../integrations/common-integration';
import { getShopifyProducts } from '@/integrations/shopify/shopify-integration';


interface TransformedProduct {
  id: string;
  title: string;
  price: number;
  handle: string;
}

const Home: React.FC = () => {

  
  
  const [transformedData, setTransformedData] = useState<TransformedProduct[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
       const integrationData: IntegrationResult = await performCommonIntegration(getShopifyProducts);
        setTransformedData(integrationData);
      } catch (error) {
        console.error('Error fetching and processing data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Integrated and Transformed Data</h1>
      {transformedData && transformedData.length > 0 ? (
        <ul>
          {transformedData.map((product) => (
            <li key={product.id}>
              NAME: {product.title}, PRICE: ${product.price}, HANDLE: {product.handle}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Home;
