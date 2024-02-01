import { useEffect, useState } from 'react';
import { performCommonIntegration } from '../integrations/common-integration';

import { getConfig } from '../config';

export default function Home() {
  const [transformedData, setTransformedData] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const integrationData = await performCommonIntegration();

        setTransformedData(integrationData);
      } catch (error) {
        console.error("Error fetching and processing data:", error);
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
              NAME : {product.product_name}  , PRICE: ${product.product_price} , HANDLE:{product.handles}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}

    </div>
  );
}
