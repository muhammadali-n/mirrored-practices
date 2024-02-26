'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { performCommonIntegration, IntegrationResult } from '../integrations/common-integration';
import { getProducts } from '@/integrations/shopify/shopify-integration';
import Footer from '@/components/layout/footer';


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
       
       const integrationData: IntegrationResult = await performCommonIntegration(getProducts);
        setTransformedData(integrationData);
      } catch (error) {
        console.error('Error fetching and processing data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{ color: 'white' }}>Integrated and Transformed Data</h1>
      {transformedData && transformedData.length > 0 ? (
        <ul>
          {transformedData.map((product) => (
            <li key={product.id} style={{ color: 'white' }}>
              NAME: {product.title}, PRICE: ${product.price}, HANDLE: {product.handle}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
      <Suspense>
          <Footer />
        </Suspense>
    </div>
  );
};

export default Home;
