import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import TRUHome from '../layouts/TRUHome';
import { homePageResultMock } from '@/__mocks__/stories'
// import KiboHeroCarousel from '@/components/home/Carousel/KiboHeroCarousel'
import { productSearch } from '@/lib/api/operations';
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import type { CategoryTreeResponse, NextPageWithLayout } from '@/lib/types'

import { Product } from '@/lib/gql/types';
import type { GetStaticPropsContext } from 'next'

interface HomePageProps {
  carouselItem: any
  products: any
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context
  const categoriesTree: CategoryTreeResponse = (await getCategoryTree()) || null
  const topProducts: any = (await productSearch(
    {
      categoryCode: "tru_toys",
      pageSize: 1,
    })) || null;
  const products = topProducts?.data;
  console.info( { products })

  return {
    props: {
      categoriesTree,
      carouselItem: homePageResultMock,
      ...(await serverSideTranslations(locale as string, ['common'])),
      products,
    },
  }
}

const Home: NextPageWithLayout<HomePageProps> = (props) => {
  const { carouselItem, products } = props
  const items = products?.products?.items;

  return (
    <>
      <TRUHome products={items} carouselItem={carouselItem} />
    </>
  )
}

export default Home
