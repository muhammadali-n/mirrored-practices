import { getConfig, getConfigForProvider } from "@/config";
import { collectionList } from "@/queries/collection.query";
import { productsList } from "@/queries/products.query";
import { collectionProductsList } from "@/queries/collectionProductsList.query";
import { dataTransformer, transformPdpData } from "./vendure-transformer";
import transformerJsonConfig from './vendure-transform-config.json'
import { productDetails } from "@/queries/productDetails";
import { createCartQuery } from "@/queries/createCart.mutation";
import { fetchCart } from "@/queries/activeCart.query";
import { nextOrderStates } from "@/queries/nextOrderStates.query";
import { removeCartItemQuery } from "@/queries/removeItemFromCart.mutation";
import { updateCartItemQuery } from "@/queries/updateCartItem.mutation";
import { performCartTransformation } from "./vendure-transformer";
import { addItemToCartQuery } from "@/queries/addItemToCart.mutation";

const vendureApi = async (provider, methodName: String, ...args) => {
    console.log("Entered VendureAPI method");
    if (vendureMethods.hasOwnProperty(methodName)) {
        const { commerceConfig } = getConfigForProvider(provider);
        const { apiEndpoint } = commerceConfig;
        return await vendureMethods[methodName](apiEndpoint, ...args);
    }
}

export const apiFetch = async (endPoint, query) => {
      async function wait(ms) {
          return new Promise(resolve => {
              setTimeout(resolve, ms);
          });
      }
    
      try {
          let retry = 0, result;
      
          do {
              if (retry !== 0) {
                  await wait(Math.pow(2, retry));
  
              }
              result = await fetch(endPoint, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(query),
              });
              retry++;
            //   console.log(retry,"re")
          } while (result.status === 429 || result.status === 400 || result.status=== 401 && (Math.pow(2, retry) <= fetchApiConfig.max_wait));
      
          return result;
      } catch (error) {
          console.error('Error in API fetch:', error);
          throw error;
      }
  };

const getCollectionDetails = async (endPoint : string) => {
    try {
        if (endPoint !== null) {
            const response = await apiFetch(endPoint, { query: collectionList });
            const responseData = await response.json();
            
            const transferData = responseData?.data?.collections?.items;
            const transformedData = dataTransformer(transferData, transformerJsonConfig);
            return transformedData;
        } else {
            return "Configuration != Vendure";
        }
    } catch (error) {
        console.error('Error in getCollectionDetails:', error);
        throw error; 
    }
}


const getProductDetails = async (endPoint: string) => {
    try {
        if (endPoint !== null) {
            const response = await apiFetch(endPoint, { query: productsList });
            const responseData = await response.json();
            return responseData;
        } else {
            return "Configuration != Vendure";
        }
    } catch (error) {
        console.error('Error in getProductDetails:', error);
        throw error; 
    }
};

const getCollectionProductDetails = async (endPoint: string, collectionName: string) => {
    try {
        if (endPoint !== null) {
            const response = await apiFetch(endPoint, {
                query: collectionProductsList,
                variables: { slug: `${collectionName.toLowerCase()}` }
            });
            const responseData = await response.json();
            const transferData = responseData?.data?.collection?.productVariants?.items;
            const transformedResponse = transferData.map(item => ({
                id: item.id,
                title: item.name,
                price: item.price,
                imageSrc: item.product.featuredAsset.preview,
                handle: item.product.slug
              }));
            // const transformedResponse = dataTransformer(transferData, transformerJsonConfig);
            return transformedResponse;
        } else {
            return "Configuration != Vendure";
        }
    } catch (error) {
        console.error('Error in getCollectionProductDetails:', error);
        throw error; 
    }
};

const getProductsByHandle = async (endPoint: string, handle: string, uppercaseLanguage:string) => {
    try {
        if (endPoint !== null) {
            const response = await apiFetch(endPoint, {
                query: productDetails,
                variables: { slug: `${handle.toLowerCase()}` }
            });
            const responseData = await response.json();

            const data = responseData.data.product;
            if (data == null) {
              throw Error;
            }
            const transformedResponse=transformPdpData(data);
            return transformedResponse;
        } else {
            return "Configuration != Vendure";
        }
    } catch (error) {
        console.error('Error in getCollectionProductDetails:', error);
        throw error; 
    }
};

const createCart = async (endPoint, productVariantId, quantity) => {
    if (endPoint !== null) {
        await fetch(endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: createCartQuery,
                variables: {
                    productVariantId: `${productVariantId}`,
                    quantity: quantity || 1
                }
            })
        }).then(async (res) => {
            const response = await res.json();
            return response;
        })
            .catch(err => console.log(err))
    } else {
        return ("Configuration != Vendure")
    }
}

const addItemToCart = async (endPoint) => {
    var responseData;
    const sessionToken = 'eyJ0b2tlbiI6Ijc5YzVlYTJhMzU4YjkwOWNiMTQ1ZDcyODE2MjFiZGJiZDExNWUwYzU1OTFlNzk2NjE4MjZlZGNjYTg2MzJhMTUifQ=='
    console.log(decodeURIComponent(sessionToken));
    if (endPoint !== null) {
        await fetch(endPoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${decodeURIComponent(sessionToken)}`
            },
            body: JSON.stringify({
                query: addItemToCartQuery,
            })
        })
            .then(async (res) => {
                const response = await res.json();
                responseData = response;
            })
            .catch(err => console.log(err));
            const transformedData = performCartTransformation(responseData,transformerJsonConfig);
            return transformedData;
    } else {
        return ("Configuration != Vendure")
    }
}

const getCart = async (endPoint) => {
    var responseData;
    console.log("Get Cart Invoked");
    const token = 'dfb86375251e7ea886f2436d512b15283b2ce308371f97224b238b08ec38829d'
    if (endPoint !== null) {
        await fetch(endPoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                query: fetchCart,
            })
        })
            .then(async (res) => {
                const response = await res.json();
                responseData = response;
            })
            .catch(err => console.log(err));
            const transformedData = performCartTransformation(responseData, transformerJsonConfig);
            return transformedData;
    } else {
        return ("Configuration != Vendure")
    }
}

const nextCartState = async (endPoint) => {
    console.log("Entered NextCartState");
    if (endPoint !== null) {
        await fetch(endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: nextOrderStates
            })
        }).then(res => res.json())
            .catch(err => console.log(err))
    } else {
        return ("Configuration != Vendure")
    }
}

const removeFromCart = async (endPoint, orderLineId) => {
    var responseData;
    console.log("remove OrderLine :", orderLineId)
    if (endPoint !== null) {
        await fetch(endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: removeCartItemQuery,
                variables: {
                    orderLineId: orderLineId
                }
            })
        }).then(res => res.json())
        .then(data => responseData = data)
            .catch(err => console.log(err));
        const transformedData = performCartTransformation(responseData,transformerJsonConfig);
        return transformedData;
    } else {
        return ("Configuration != Vendure")
    }
}

const updateCartItem = async (endPoint,orderLineId,quantity) => {
    var responseData;
    if(endPoint !== null){
        await fetch(endPoint,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                query: updateCartItemQuery,
                variables:{
                    orderLineId:orderLineId,
                    quantity:quantity
                }
            })
        }).then((res)=>res.json()).then(data => responseData = data).catch(err => console.log(err));
        return performCartTransformation(responseData,transformerJsonConfig);
    }else{
        return ("Configuration != Vendure")
    }
}


const vendureMethods = {
    "getCollectionDetails": getCollectionDetails,
    "getCollectionProductDetails": getCollectionProductDetails,
    "getProductDetails": getProductDetails,
        "getProductsByHandle": getProductsByHandle,
    "createCart": createCart,
    "getCart": getCart,
    "nextCartState": nextCartState,
    "removeFromCart": removeFromCart,
    "updateCartItem":updateCartItem,
    "addItemToCart":addItemToCart
    }

export default vendureApi