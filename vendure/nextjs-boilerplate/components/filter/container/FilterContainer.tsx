import React, { useEffect, useMemo } from 'react'
import FilterLayout from '../layout/FilterLayout'
import { useSearchParams, usePathname, useRouter, useParams } from 'next/navigation'

interface FilterContainerProps {
  facetsResponse: any; // Replace 'any' with the actual type of 'facetsResponse'
  getProducts: any;// Replace 'string' with the actual type of filter items
}

export default function FilterContainer({ facetsResponse, getProducts }: FilterContainerProps) {
  const searchParam = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const param = useParams();
  const filter = searchParam.get('filter')
  const filterArray = useMemo(() => filter?.split("|") || [], [filter])
  const onFilterChange = (id: string) => {
    let filterValues = filter?.split("|") || [];
    if (filterValues.includes(id)) {
       filterValues = filterValues.filter(item => item !== id);
    } else {
      filterValues?.push(id);
    }
    if (filterValues.length>0) {
      router.push(path + `?filter=${filterValues?.join("|")}`);
    } else {
      router.push(path);
    }


  }


  useEffect(() => {
    getProducts(filterArray)
  }, [searchParam,path])
  

  return (
    <FilterLayout facetsResponse={facetsResponse}
      filterArray={filterArray}
      onFilterChange={onFilterChange} />
  )
}
