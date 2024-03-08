import {SearchClient as TypesenseSearchClient} from 'typesense';
import config from "./config";
import product_dataset from "./data/product_dataset";
import recipe_dataset from "./data/recipe_dataset"; 
const Typesense = require('typesense')


let TYPESENSE_SERVER_CONFIG = {
    apiKey: config.TYPESENSE_ADMIN_API_KEY, 
    nodes: [
      {
        host: config.TYPESENSE_HOST,
        port: config.TYPESENSE_PORT,
        protocol: config.TYPESENSE_PROTOCOL,
      },
    ],
    numRetries: config.TYPESENSE_RETRIES,
};

let typesenseSearchClient = new TypesenseSearchClient(TYPESENSE_SERVER_CONFIG);


let client = new Typesense.Client(TYPESENSE_SERVER_CONFIG)


let recipeSchema = {
    'name': config.TYPESENSE_RECIPE_COLLECTION_NAME,
    'fields': [
      {
        'name': 'recipe_id',
        'type': 'int32'
      },
      {
        'name': 'title',
        'type': 'string'
      },
      {
        'name': 'ingredient_names',
        'type': 'string[]',
        'facet': true
      }
    ],
    'default_sorting_field': 'recipe_id'
}

let productSchema = {
    'name': config.TYPESENSE_PRODUCT_COLLECTION_NAME,
    'fields': [
        {
            "name": "name",
            "type": "string"
        },
        {
            "name": "price",
            "type": "float"
        },
        {
            "name": "image",
            "type": "string"
        },
        {
            "name": "embedding",
            "type": "float[]",
            "embed": {
                "from": [
                    "name"
                ],
                "model_config": {
                    "model_name": "ts/all-MiniLM-L12-v2"
                }
            }
        }
    ]
}

const recipeSearch = async (searchParameters) => {
    return await typesenseSearchClient
    .collections(config.TYPESENSE_RECIPE_COLLECTION_NAME)
    .documents()
    .search(searchParameters);
}

const productSearch = async (searchParameters) => {
    return await typesenseSearchClient
    .collections(config.TYPESENSE_PRODUCT_COLLECTION_NAME)
    .documents()
    .search(searchParameters);
}

const createCollections = async	() => {
    let existingCollectionNames = [];
    // const existingCollections = await client.collections().retrieve();
    // console.log('existingCollections--', existingCollections);
    // if (existingCollections && existingCollections.length > 0) {
    //     existingCollections.forEach((existingCollection) => {
    //         existingCollectionNames.push(existingCollection.name);
    //     })
    // }
    // if (!existingCollectionNames.includes(config.TYPESENSE_RECIPE_COLLECTION_NAME)) {
    //     console.log("-----------------CREATING SCHEMA---------------");
    //     console.log(config.TYPESENSE_RECIPE_COLLECTION_NAME);
    //     const res = await client.collections().create(recipeSchema);
    //     console.log("-----------------RESPONSE---------------");
    //     console.log(res);
    //     console.log("-----------------INDEXING DOCUMENTS---------------");
    //     const res2 = await client.collections(config.TYPESENSE_RECIPE_COLLECTION_NAME).documents().import(recipe_dataset, {action: 'create'});
    //     console.log("-----------------RESPONSE---------------");
    //     console.log(res2);
    // }
    // if (!existingCollectionNames.includes(config.TYPESENSE_PRODUCT_COLLECTION_NAME)) {
    //     console.log("-----------------CREATING SCHEMA---------------");
    //     console.log(config.TYPESENSE_PRODUCT_COLLECTION_NAME);
    //     const res = await client.collections().create(productSchema);
    //     console.log("-----------------RESPONSE---------------");
    //     console.log(res);
    //     console.log("-----------------INDEXING DOCUMENTS---------------");
    //     const res2 = await client.collections(config.TYPESENSE_PRODUCT_COLLECTION_NAME).documents().import(product_dataset, {action: 'create'});
    //     console.log("-----------------RESPONSE---------------");
    //     console.log(res2);
    // }
}


export {
    recipeSearch,
    productSearch,
    createCollections
}