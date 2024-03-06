
import React, { useEffect, useState, } from "react";
import {productSearch} from "../server";

const Products = (props) => {
  const {
    ingredient_names
  } = props;

  

    const [products, setProducts] = useState([]);


  const handleProductSearch = async (productName) => {
    let searchParameters = {
      "q": productName,
      "query_by":"embedding",
      "prefix":false,
      "exclude_fields":"embedding",
      "collection":"ingredients",
      "filter_by":"",
      "per_page":1
    }
    const results = await productSearch(searchParameters)
    if (results && results.hits && results.hits.length > 0 && results.hits[0].document) {
      return results.hits[0].document;
    }
  }

  useEffect(() => {
    const fetchProductData = async () => {
        const updatedProducts = await Promise.all(ingredient_names.map(async (ingredient) => {
            const productResult = await handleProductSearch(ingredient);
            return productResult;
        }));
        setProducts(updatedProducts.filter(Boolean)); // Filter out any undefined results
    };

    if (ingredient_names && ingredient_names.length > 0) {
        fetchProductData();
    }
  }, [ingredient_names]);

  return (
    <div class="scrollable-cards">
          {products && products.length > 0 && products.map((product) => (
            <div class="small-card">
                <img src={product.image} alt="Product Image"/>
                <div class="small-card-content">
                    <h6>{product.name}</h6>
                    <p>${product.price}</p>
                    <button class="small-card-button">Add to Cart</button>
                </div>
            </div>
          ))}
    </div>
  );
};


export default Products;
