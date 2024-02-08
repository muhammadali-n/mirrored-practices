'use client'
import React, { useEffect, useState } from 'react';
import { performCommonIntegration, IntegrationResult } from '../integrations/common-integration';
import { getConfig, Config } from '../config';

interface TransformedProduct {
  objectID: string;
  product_name: string;
  product_price: number;
  handles: string;
}

const Home: React.FC = () => {

  
  
  const [transformedData, setTransformedData] = useState<TransformedProduct[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
       console.log("pageLevel");
       
        const integrationData: IntegrationResult = await performCommonIntegration();
        console.log("integrationData",integrationData);
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
            <li key={product.objectID}>
              NAME: {product.product_name}, PRICE: ${product.product_price}, HANDLE: {product.handles}
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
