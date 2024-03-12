"use client"
import Search from '@/components/layout/search';

export default  function SearchPage({searchParams}: {searchParams?:
  { [key: string]: string | string[] | undefined };}) {

 return (
    <>
      <Search searchParams={searchParams}/>
    </>
  );
}
