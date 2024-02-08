import BannerCarousal from '@/components/banner/container/BannerCarousal';
import React from 'react'
interface HomeLayoutProps {
  response: any;
}
export default function HomeLayout(props: HomeLayoutProps) {
  const { response } = props;
  return (
    <>
        <BannerCarousal response={response} />
    </>
      




    


  )
}
