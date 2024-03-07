import React, { useEffect, useState } from 'react';
import './App.css';
import Products from './widgets/Products';
import { recipeSearch, createCollections } from "./server";

const App =() => {
    
const [searchResults, setSearchResults] = useState([]);
const [searchFacets, setSearchFacets] = useState([]);
const [selectedRecipe, setSelectedRecipe] = useState(null);
const [searchTerm, setSearchTerm] = useState("*");
const [selectedFacets, setSelectedFacets] = useState([]);

useEffect(() => {
  const fetchProductData = async () => {
      await handleSearch(searchTerm)
  };
  fetchProductData();
}, []);


const handleFacetSearch = async (facet) => {
  if (selectedFacets.includes(facet.value)) {
    selectedFacets.filter(item => item !== facet.value);
  } else {
    selectedFacets.push(facet.value);
  }
  selectedFacets.push(facet.value);
  setSelectedFacets(selectedFacets);
  handleSearch(searchTerm, true);
}

const getFacetQuery = (facets) => {
  if (facets && facets.length > 0) {
    return facets.map(facet => `ingredient_names:=[${facet}]`).join(" && ");
  }
}

const handleSearch = async (search, isFacet) => {
  setSearchTerm(search);
  setSearchResults([])
  let searchParameters = {
    "q": search ? searchTerm : "*",
    "query_by":"title",
    "sort_by":"",
    "highlight_full_fields":"title",
    "collection":"temp_search_two",
    "filter_by":selectedFacets.length > 0 && isFacet ? getFacetQuery(selectedFacets) : "",
    "facet_by":"ingredient_names",
    "max_facet_values":100,
    "page":1,
    "per_page":20
  }
  const results = await recipeSearch(searchParameters);
  if (results && results.hits && results.hits.length > 0) {
    setSearchResults(results.hits);
  }
  if (results && results.facet_counts && results?.facet_counts[0]?.counts?.length > 0) {
    setSearchFacets(results.facet_counts[0].counts.slice(0, 30));
  } else {
    setSearchFacets([]);
  }
}

const handleRecipeSearch = (search)=> {
  setSelectedFacets([]);
  setSearchFacets([]);
  handleSearch(search, false);
}

const getIngredientList = (ingredient_names) => {
  if (ingredient_names && ingredient_names.length > 0) {
    return ingredient_names.join(", ")
  }
}
const openModal = async (recipe) => {
  setSelectedRecipe(recipe);
  document.getElementById("myModal").style.display = "block";
}

const closeModal = () => {
  setSelectedRecipe(null);
  document.getElementById("myModal").style.display = "none";
}

window.onclick = function(event) {
  if (event.target == document.getElementById("myModal")) {
      closeModal();
  }
}

const handleIndexing = () => {
  createCollections();
}


  return (
  <>
<div class="search-bar">
{/* <button class="small-card-button" onClick={handleIndexing()}>Activate search</button> */}
    <input type="text" class="search-input" placeholder="Search the recipe you want..." onChange={(e) => handleRecipeSearch(e.target.value)}/>
</div>

<div class="container">
    <div class="facet">
      {searchFacets && searchFacets.length > 0 &&
        <h6>Filter by Ingredients...</h6>
      }
        <ul>
          {searchFacets && searchFacets.length > 0 && 
            searchFacets.map((searchFacet) => (
            <li class="facet-option">
              <input type="checkbox" checked={selectedFacets.includes(searchFacet?.value)} id={`option_${searchFacet?.value}`}  onClick={() => handleFacetSearch(searchFacet)}/>
              <label htmlFor={`option_${searchFacet?.value}`}>{searchFacet?.value} - {searchFacet?.count}</label>
            </li>
            ))}
        </ul>
    </div>
    <div class="card-container">
        {searchResults && searchResults.length > 0 &&
          searchResults.map((recipe) => (
            <div class="card">
            <h6>{recipe?.document?.title}</h6>
            <p>{getIngredientList(recipe?.document?.ingredient_names)}</p>
              <button onClick={() => openModal(recipe?.document)}>Know more</button>
        </div>
          ))}
    </div>
</div>

<div class="modal" id="myModal">
    <div class="modal-content">
        <span class="close" onclick={closeModal}>&times;</span>
        <h3>{selectedRecipe?.title}</h3>
        <h5>Ingredients</h5>
        <ul>
        {selectedRecipe && selectedRecipe.ingredients_with_measurements.length > 0 && selectedRecipe.ingredients_with_measurements.map((ingredients) => (
            <li>{ingredients}</li>
        ))}
        </ul>
        <h5>Cooking Directions</h5>
        <ol>
        {selectedRecipe && selectedRecipe.directions.length > 0 && selectedRecipe.directions.map((direction) => (
            <li>{direction}</li>
        ))}
        </ol>
        <h5>Missing ingredients?</h5>
        <Products ingredient_names={selectedRecipe?.ingredient_names} />
        <button class="small-card-button">Buy all ingredients</button>
    </div>
</div>
</>
)
}
export default App;
