'use client'
import React, { useEffect, useState } from 'react'
import { getContent } from '@/integrations/common-integration';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../lib/sanity';
import "bootstrap/dist/css/bootstrap.min.css";
import { getDataByQuery } from '@/integrations/sanity/sanity-integration';
import Link from 'next/link';
import { useRouter } from 'next/router';

//identify endpoint in common
export function getSlug(params: any) {
  const slug = params
  const customEndpoint = slug.params.custom;
  console.log("slug", customEndpoint);



  return customEndpoint;

}


function Page(params: any) {


  const currentEndpoint = getSlug(params)
  console.log("get", currentEndpoint);
  const [transformedData, setTransformedData] = useState<Array<any>>([]);
  // to common integration
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageData = await getContent(currentEndpoint);
        setTransformedData(pageData)
      } catch (error) {
        console.error('Error fetching and processing data:', error);
      }
    };

    fetchData();
  }, []);


  // const router = useRouter();

  const handleButtonClick = () => {
  };

  const myPortableTextComponents = {
    types: {
      image: ({ value }: any) => <img src={urlFor(value)?.url()} />,
      callToAction: ({ value, isInline }: any) =>
        isInline ? (
          <a href={value.url}>{value.text}</a>
        ) : (
          <div className="callToAction">{value.text}</div>
        ),
    },


    marks: {
      link: ({ children, value }: any) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
          <a href={value.href} rel={rel}>
            {children}
          </a>
        )
      },
    },
    list: {
      bullet: ({ children }: any) => <ul className="mt-xl rich-text">{children}</ul>,
      number: ({ children }: any) => <ol className="mt-lg rich-text" >{children}</ol>,
    }
  }

  return (
    <div className="container">
      {transformedData.map((page: any) => (
        <div key={page._id} className="sections">
          <h1 className="title mb-8 text-5xl font-bold">{page?.title}</h1>
          {page?.sections
            ?.sort((a: any, b: any) => a.order - b.order)
            .map((section: any) => (
              <div key={section._id}>
                {section._type === 'image' && (
                  <div className="col-sm-12 d-flex justify-content-center">
                    <img src={urlFor(section)?.url()} alt="hero" />
                  </div>
                )}

                {section._type === 'blockImages' && section.enabled ? (
                  <div className="image-container">
                    <div className="row">
                      {section?.images?.map((image: any) => (
                        <div className="col-sm-4" key={image._id}>
                          <br />
                          <img
                            key={image._id}
                            src={urlFor(image)?.url()}
                            alt={image.altText}
                            className="img-fluid"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : ""}

                {section._type === 'file' && section?.asset && (
                  <div className="col-sm-12 portable-text justify-content-center">
                    <br />
                    <video width="640" height="360" controls>
                      {/* <source src={urlForFile(section[0])} type="video/mp4" /> */}
                      Your browser does not support the video tag.
                    </video>

                  </div>
                )}

                {
                  section._type === 'richText' && (
                    <div className="row">
                      <div className="col-sm-12 portable-text justify-content-center">
                        <br />
                        <PortableText value={section?.content} components={myPortableTextComponents} />
                      </div>
                    </div>
                  )
                }

              </div>
            ))}
        </div>
      ))}
    </div>
  )
}

export default Page