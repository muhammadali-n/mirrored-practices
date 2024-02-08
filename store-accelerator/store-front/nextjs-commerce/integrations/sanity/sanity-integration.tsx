import { client } from '@/app/lib/sanity';
import { customUi, performTransformation } from '../common-transformer';
import customPageTransformerConfig from "./sanity-transform-config.json"

const getDataByQuery = async (query: string) => {

  return await client.fetch(query);
}


async function getSanity(params: any) {

  const slug = params
  const fetchPageDataBySlug = async (slug: string) => {
    try {
      console.log('sanity');
      // creating page data using slug
      const getPageData = await getDataByQuery(`*[_type == 'nav' && slug.current == "${slug}"]`);

      const { transformedData } = performTransformation(getPageData, customPageTransformerConfig)

      //fixed custom ui
      const result = customUi(transformedData);
      return result
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  const fetchButton = async () => {

    const AddtoCart = await getDataByQuery("*[_type == 'button' && buttonName == 'Add to cart']")
    console.log("AddtoCart", AddtoCart);
    return AddtoCart
  }

  const addToCartButton = await fetchButton()
  const customPageData = await fetchPageDataBySlug(slug);

  return  [customPageData, addToCartButton] 

}

export { getSanity, getDataByQuery }