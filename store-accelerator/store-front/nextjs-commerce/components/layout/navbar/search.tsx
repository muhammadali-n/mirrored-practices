'use client';

import { createUrl } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getContent } from '@/integrations/common-integration';
import { fetchHeader } from '@/integrations/sanity/sanity-integration';
import { urlFor } from '@/app/lib/sanity';
import Image from 'next/image';


export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  interface MenuItem {
    _key: string;
    path: string;
    translation: {
      ar: string;
      en: string;
    };
  }

  interface HeaderData {
    storeNameTranslation: {
      ar: string;
      en: string;
    };
    storeLogo: string;
    storeLogoTranslation: {
      ar: string;
      en: string;
    };
    searchBar: string;
    searchBarAltTranslation: {
      ar: string;
      en: string;
    };
    menuItems: MenuItem[];
    cartIcon: string;
    cartIconAltTranslation: {
      ar: string;
      en: string;
    };
    placeholder: {
      ar: string;
      en: string;
    }
  }
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        // Fetch header data from the API
        const response = await getContent(fetchHeader);
        setHeaderData(response);
      } catch (error) {
        console.error('Error fetching header data:', error);
      }
    };

    fetchHeaderData();
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/product-search/collection', newParams));
  }

  return (
    <form onSubmit={onSubmit} className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        key={searchParams?.get('q')}
        type="text"
        name="search"
        placeholder={headerData?.searchBarAltTranslation?.ar || headerData?.searchBarAltTranslation?.en || "Search for products..."} autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <Image
        src={urlFor(headerData?.searchBar)?.url()}
        alt={headerData?.placeholder?.ar || headerData?.placeholder?.en}
        width={20}
        height={20}
        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} // Position search icon
      />
    </form>
  );

}
