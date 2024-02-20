'use client'
import React, { useEffect, useState } from 'react';
import { performCommonIntegration, IntegrationResult } from '../integrations/common-integration';
import { getShopifyProducts } from '../integrations/shopify/shopify-integration';
import { getContent } from '../integrations/common-integration';
import ProductCardHome from '../components/grid/ProductCardHome';
import ProductGrid from '../components/home/ProductGrid';
import { fetchHomePage } from '../integrations/sanity/sanity-integration';
import ProductGridItem from '../components/home/ProductGridItem';


interface TransformedProduct {
  id: string;
  title: string;
  price: number;
  handle: string;
  imageSrc: string;
}

const Home: React.FC = () => {



  const [transformedData, setTransformedData] = useState<TransformedProduct[] | null>(null);
  const [homePageContent, setHomePageContent] = useState<any[] | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageData = await getContent(fetchHomePage);
        setHomePageContent(pageData)
        console.log("pageData", pageData)
        const integrationData: IntegrationResult = await performCommonIntegration(getShopifyProducts);
        console.log("integrationData", integrationData)
        setTransformedData(integrationData);
      } catch (error) {
        console.error('Error fetching and processing data:', error);
      }
    };

    fetchData();
  }, []);

  return (

    <div className="container">
      {homePageContent?.map((page: any) => (
        page?.sections?.length > 0 && page?.sections?.map((section: any) => (
          <div key={section.id} className='row mt-3'>
            {section?.columns?.length > 0 && section?.columns?.map((column: any) => (
              <div className='col-6' key={column?._id}>
                {column?.widgets?.map((widget: any) => (
                  <div className='row' key={widget?._id}>
                    <div key={widget?._id} className='col-6'>
                      {widget?._type === 'product' && (
                        <div>
             <ProductGridItem product={transformedData}  homePageContent={homePageContent}/>
                        </div>
                      )}
                      {/* {widget?._type === 'banner' && (
                      <div>
             <ProductGridItem product={transformedData} homePageContent={homePageContent}/>
                      </div>
                    )} */}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
      ))}
    </div>
  )
}

export default Home;