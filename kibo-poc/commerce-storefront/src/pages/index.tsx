import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import TRUHome from '../layouts/TRUHome';
import { homePageResultMock } from '@/__mocks__/stories'
import KiboHeroCarousel from '@/components/home/Carousel/KiboHeroCarousel'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import type { CategoryTreeResponse, NextPageWithLayout } from '@/lib/types'

import type { GetStaticPropsContext } from 'next'

interface HomePageProps {
  carouselItem: any
  products: []
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context
  const categoriesTree: CategoryTreeResponse = (await getCategoryTree()) || null

  return {
    props: {
      categoriesTree,
      carouselItem: homePageResultMock,
      ...(await serverSideTranslations(locale as string, ['common'])),
      products: [
        {
            "productCode": "VALPRD001",
            "productSequence": 1,
            "productUsage": "Standard",
            "fulfillmentTypesSupported": [
                "DirectShip",
                "InStorePickup",
                "Delivery"
            ],
            "goodsType": "Physical",
            "content": {
                "productName": "LEGO Icons Flower Bouquet 10280 Building Blocks Toy Set; Flowers Botanical Collection; Valentine Gifts for Her (756 Pieces)",
                "productFullDescription": "<ul class=\"list-dots success\" style=\"box-sizing: border-box; margin: 0px; list-style: none; padding: 0px; font-family: &quot;Nunito Sans&quot;, &quot;El Messiri&quot;, sans-serif; font-size: 16px;\"><li style=\"box-sizing: border-box; width: 748.703px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">Relax, unplug and build a beautiful floral arrangement with the 10280 LEGO Creator Botanical Collection Flower Bouquet (756 Pieces),</li><li style=\"box-sizing: border-box; width: 748.703px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">Each detailed flower is made of LEGO components which create a unique display</li><li style=\"box-sizing: border-box; width: 748.703px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">Most flower petals can be repositioned to enjoy different arrangements</li><li style=\"box-sizing: border-box; width: 748.703px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">Take the stems apart and recombine to adjust the height and shape of the flowers</li><li></li></ul>",
                "productShortDescription": "<ul class=\"list-dots success\" style=\"box-sizing: border-box; margin: 0px; list-style: none; padding: 0px; font-family: &quot;Nunito Sans&quot;, &quot;El Messiri&quot;, sans-serif; font-size: 16px;\"><li style=\"box-sizing: border-box; width: 748.703px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">Relax, unplug and build a beautiful floral arrangement with the 10280 LEGO Creator Botanical Collection Flower Bouquet (756 Pieces)</li></ul>",
                "metaTagTitle": "LEGO Icons Flower Bouquet 10280 Building Blocks Toy Set; Flowers Botanical Collection; Valentine Gifts for Her (756 Pieces)",
                "metaTagDescription": "Relax, unplug and build a beautiful floral arrangement with the 10280 LEGO Creator Botanical Collection Flower Bouquet (756 Pieces),Each detailed flower is made of LEGO components which create a unique displayMost flower petals can be repositioned to enjoy different arrangementsTake the stems apart and recombine to adjust the height and shape of the flowers",
                "seoFriendlyUrl": "lego-icons-flower-bouquet-10280-building-blocks-toy-set-flowers-botanical-collection-valentine-gifts-for-her-756-pieces-",
                "productImages": [
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/b4d74618-a964-4e26-be9c-e0a5054aaf7b",
                        "cmsId": "b4d74618-a964-4e26-be9c-e0a5054aaf7b",
                        "sequence": 1,
                        "productImageGroupId": "default"
                    },
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/1f9cd250-ea5f-4dff-bca5-4bdaad80387d",
                        "cmsId": "1f9cd250-ea5f-4dff-bca5-4bdaad80387d",
                        "sequence": 2,
                        "productImageGroupId": "default"
                    },
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/e7dda522-92c1-4e29-baa0-7c9405539483",
                        "cmsId": "e7dda522-92c1-4e29-baa0-7c9405539483",
                        "sequence": 3,
                        "productImageGroupId": "default"
                    },
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/35eb63c1-a9f7-41a3-9b71-e0481b36513e",
                        "cmsId": "35eb63c1-a9f7-41a3-9b71-e0481b36513e",
                        "sequence": 4,
                        "productImageGroupId": "default"
                    }
                ]
            },
            "purchasableState": {
                "isPurchasable": true
            },
            "isActive": true,
            "publishState": "Live",
            "price": {
                "price": 299.0000,
                "priceType": "List",
                "salePrice": 229.0000,
                "salePriceType": "CatalogSalePrice",
                "catalogSalePrice": 229.0000,
                "catalogListPrice": 299.0000
            },
            "productType": "toy",
            "productTypeId": 17,
            "isTaxable": true,
            "isRecurring": false,
            "pricingBehavior": {
                "discountsRestricted": false
            },
            "inventoryInfo": {
                "manageStock": true,
                "outOfStockBehavior": "DisplayMessage",
                "onlineStockAvailable": 20,
                "onlineSoftStockAvailable": 20,
                "onlineLocationCode": "64880",
                "isSubstitutable": false
            },
            "createDate": "2024-02-15T09:30:44.049Z",
            "updateDate": "2024-02-29T12:03:07.939Z",
            "dateFirstAvailableInCatalog": "2024-02-16T12:00:00.000Z",
            "daysAvailableInCatalog": 17,
            "upc": "5702016913767",
            "upCs": [
                "5702016913767"
            ],
            "mfgPartNumber": "TUSKU0065032",
            "mfgPartNumbers": [
                "TUSKU0065032"
            ],
            "categories": [
                {
                    "categoryId": 6,
                    "parentCategory": {
                        "categoryId": 1,
                        "categoryCode": "tru_toys",
                        "content": {
                            "name": "Toys",
                            "description": "",
                            "pageTitle": "Buy Toys Online | Kids' Toys | Toys 'R' Us UAE",
                            "metaTagTitle": "Buy Toys Online | Kids' Toys | Toys 'R' Us UAE",
                            "metaTagDescription": "Discover our collection of toys online today. Shop kids' toys from brands like Barbie & enjoy 20 - 50 % OFF. Start shopping now to enjoy our wide selection.",
                            "metaTagKeywords": "Toys",
                            "slug": "toys",
                            "categoryImages": [
                                {
                                    "altText": "",
                                    "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/6221e9ad-a5c1-4bd7-83b7-2fe2da34f3c6",
                                    "cmsId": "6221e9ad-a5c1-4bd7-83b7-2fe2da34f3c6",
                                    "sequence": 1
                                }
                            ]
                        },
                        "sequence": 1,
                        "isDisplayed": true,
                        "count": 0,
                        "updateDate": "0001-01-01T00:00:00.000Z",
                        "shouldSlice": false
                    },
                    "categoryCode": "tru_lego_building_toys",
                    "content": {
                        "name": "LEGO & building toys",
                        "description": "",
                        "pageTitle": "Building Blocks | Shop Building Toys Online | Toys 'R' Us UAE",
                        "metaTagTitle": "",
                        "metaTagDescription": " Find the best building blocks at Toys 'R' Us. Shop our range of building toys from top brands & enjoy our wide selection.",
                        "metaTagKeywords": "",
                        "slug": "toys-lego-and-building-toys-",
                        "categoryImages": [
                            {
                                "altText": "",
                                "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/ef95d56d-2edc-4079-a3b4-97549d4d1609",
                                "cmsId": "ef95d56d-2edc-4079-a3b4-97549d4d1609",
                                "sequence": 1
                            }
                        ]
                    },
                    "sequence": 2,
                    "isDisplayed": true,
                    "count": 0,
                    "updateDate": "0001-01-01T00:00:00.000Z",
                    "shouldSlice": false
                },
                {
                    "categoryId": 1,
                    "categoryCode": "tru_toys",
                    "content": {
                        "name": "Toys",
                        "description": "",
                        "pageTitle": "Buy Toys Online | Kids' Toys | Toys 'R' Us UAE",
                        "metaTagTitle": "Buy Toys Online | Kids' Toys | Toys 'R' Us UAE",
                        "metaTagDescription": "Discover our collection of toys online today. Shop kids' toys from brands like Barbie & enjoy 20 - 50 % OFF. Start shopping now to enjoy our wide selection.",
                        "metaTagKeywords": "Toys",
                        "slug": "toys",
                        "categoryImages": [
                            {
                                "altText": "",
                                "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/6221e9ad-a5c1-4bd7-83b7-2fe2da34f3c6",
                                "cmsId": "6221e9ad-a5c1-4bd7-83b7-2fe2da34f3c6",
                                "sequence": 1
                            }
                        ]
                    },
                    "sequence": 1,
                    "isDisplayed": true,
                    "count": 0,
                    "updateDate": "0001-01-01T00:00:00.000Z",
                    "shouldSlice": false
                }
            ],
            "measurements": {
                "packageHeight": {
                    "unit": "in",
                    "value": 1.000
                },
                "packageWidth": {
                    "unit": "in",
                    "value": 1.000
                },
                "packageLength": {
                    "unit": "in",
                    "value": 1.000
                },
                "packageWeight": {
                    "unit": "lbs",
                    "value": 1.000
                }
            },
            "isPackagedStandAlone": true,
            "properties": [
                {
                    "attributeFQN": "tenant~popularity",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "TextBox",
                        "dataType": "Number",
                        "usageType": "Property",
                        "dataTypeSequence": 1,
                        "name": "Popularity",
                        "searchableInStorefront": true,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": 5
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~rating",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "TextBox",
                        "dataType": "Number",
                        "usageType": "Property",
                        "dataTypeSequence": 2,
                        "name": "Rating",
                        "searchableInStorefront": true,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": 5
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~color-filter",
                    "isHidden": true,
                    "isMultiValue": true,
                    "attributeDetail": {
                        "valueType": "Predefined",
                        "inputType": "List",
                        "dataType": "String",
                        "usageType": "Property",
                        "dataTypeSequence": 0,
                        "name": "color filter",
                        "description": "",
                        "searchableInStorefront": true,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": "Green",
                            "stringValue": "Green"
                        },
                        {
                            "value": "Grey",
                            "stringValue": "Grey"
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~isrecommended",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "Predefined",
                        "inputType": "List",
                        "dataType": "String",
                        "usageType": "Property",
                        "dataTypeSequence": 0,
                        "name": "isRecommended",
                        "description": "",
                        "searchableInStorefront": true,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": "Employee",
                            "stringValue": "Employee"
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~bundle-extras-in-cart",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "YesNo",
                        "dataType": "Bool",
                        "usageType": "Property",
                        "dataTypeSequence": 0,
                        "name": "Bundle Extras In Cart",
                        "description": "",
                        "searchableInStorefront": true,
                        "searchDisplayValue": true,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": false
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~availability",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "Predefined",
                        "inputType": "List",
                        "dataType": "String",
                        "usageType": "Property",
                        "dataTypeSequence": 1,
                        "name": "Availability",
                        "searchableInStorefront": true,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": "24-72hrs",
                            "stringValue": "Usually Ships in 24 to 72 Hours"
                        }
                    ],
                    "propertyType": "StandardProperty"
                }
            ],
            "slicingAttributeFQN": "",
            "productImageGroups": [],
            "productCollections": [],
            "score": 0,
            "personalizationScore": 0,
            "costPriceMargin": 34.5
        },
        {
            "productCode": "VALPRD002",
            "productSequence": 2,
            "productUsage": "Standard",
            "fulfillmentTypesSupported": [
                "DirectShip",
                "InStorePickup",
                "Delivery"
            ],
            "goodsType": "Physical",
            "content": {
                "productName": "LEGO Icons Bonsai Tree 10281 Building Blocks Toy Set",
                "productFullDescription": "<font face=\"roboto, sans-serif\"><span style=\"font-size: 13px;\">​The LEGO Botanical Collection Bonsai Tree 10281 Building Toy Set is a unique gift or mindful project for anyone who loves bonsai trees plants or building creatively with LEGO pieces.Includes interchangeable pieces so you can style the bonsai tree model with classic green leaves or vibrant pink cherry blossom blooms.Check out the sweet frog design hidden in the pink blossom. With a rectangular pot and a slatted LEGO wood-effect stand, it’s easy to display the elegant tree once built.\",</span></font><br>",
                "productShortDescription": "<font face=\"roboto, sans-serif\"><span style=\"font-size: 13px;\">​The LEGO Botanical Collection Bonsai Tree 10281 Building Toy Set is a unique gift or mindful project for anyone who loves bonsai trees, plants or building creatively with LEGO pieces.</span></font><br>",
                "metaTagTitle": "LEGO Icons Bonsai Tree 10281 Building Blocks Toy Set",
                "metaTagDescription": "​The LEGO Botanical Collection Bonsai Tree 10281 Building Toy Set is a unique gift or mindful project for anyone who loves bonsai trees, plants or building creatively with LEGO pieces.Includes interchangeable pieces so you can style the bonsai tree model with classic green leaves or vibrant pink cherry blossom blooms.Check out the sweet frog design hidden in the pink blossom. With a rectangular pot and a slatted LEGO wood-effect stand, it’s easy to display the elegant tree once built.\",",
                "seoFriendlyUrl": "lego-icons-bonsai-tree-10281-building-blocks-toy-set",
                "productImages": [
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/8e18e221-1407-4ab2-a07c-87b379553117",
                        "cmsId": "8e18e221-1407-4ab2-a07c-87b379553117",
                        "sequence": 1,
                        "productImageGroupId": "default"
                    },
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/9cb55695-8900-4e13-8d61-c98879246a31",
                        "cmsId": "9cb55695-8900-4e13-8d61-c98879246a31",
                        "sequence": 2,
                        "productImageGroupId": "default"
                    },
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/66548330-8e74-4c00-826a-35e3c3127e1d",
                        "cmsId": "66548330-8e74-4c00-826a-35e3c3127e1d",
                        "sequence": 3,
                        "productImageGroupId": "default"
                    },
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/30a6c4c4-5b5d-46a9-ad94-efab70edb04d",
                        "cmsId": "30a6c4c4-5b5d-46a9-ad94-efab70edb04d",
                        "sequence": 4,
                        "productImageGroupId": "default"
                    },
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/bd7fc967-2b9b-4727-973d-2531f9da7a30",
                        "cmsId": "bd7fc967-2b9b-4727-973d-2531f9da7a30",
                        "sequence": 5,
                        "productImageGroupId": "default"
                    }
                ]
            },
            "purchasableState": {
                "isPurchasable": true
            },
            "isActive": true,
            "publishState": "Live",
            "price": {
                "price": 379.0000,
                "priceType": "List",
                "salePrice": 379.0000,
                "salePriceType": "CatalogSalePrice",
                "catalogSalePrice": 379.0000,
                "catalogListPrice": 379.0000
            },
            "productType": "toy",
            "productTypeId": 17,
            "isTaxable": true,
            "isRecurring": false,
            "pricingBehavior": {
                "discountsRestricted": false
            },
            "inventoryInfo": {
                "manageStock": true,
                "outOfStockBehavior": "DisplayMessage",
                "onlineStockAvailable": 20,
                "onlineSoftStockAvailable": 20,
                "onlineLocationCode": "64880",
                "isSubstitutable": false
            },
            "createDate": "2024-02-15T09:37:57.709Z",
            "updateDate": "2024-02-22T15:00:11.679Z",
            "dateFirstAvailableInCatalog": "2024-02-16T12:00:00.000Z",
            "daysAvailableInCatalog": 17,
            "upc": "5702016914177",
            "upCs": [
                "5702016914177"
            ],
            "mfgPartNumber": "5702016914177",
            "mfgPartNumbers": [
                "5702016914177"
            ],
            "categories": [
                {
                    "categoryId": 6,
                    "parentCategory": {
                        "categoryId": 1,
                        "categoryCode": "tru_toys",
                        "content": {
                            "name": "Toys",
                            "description": "",
                            "pageTitle": "Buy Toys Online | Kids' Toys | Toys 'R' Us UAE",
                            "metaTagTitle": "Buy Toys Online | Kids' Toys | Toys 'R' Us UAE",
                            "metaTagDescription": "Discover our collection of toys online today. Shop kids' toys from brands like Barbie & enjoy 20 - 50 % OFF. Start shopping now to enjoy our wide selection.",
                            "metaTagKeywords": "Toys",
                            "slug": "toys",
                            "categoryImages": [
                                {
                                    "altText": "",
                                    "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/6221e9ad-a5c1-4bd7-83b7-2fe2da34f3c6",
                                    "cmsId": "6221e9ad-a5c1-4bd7-83b7-2fe2da34f3c6",
                                    "sequence": 1
                                }
                            ]
                        },
                        "sequence": 1,
                        "isDisplayed": true,
                        "count": 0,
                        "updateDate": "0001-01-01T00:00:00.000Z",
                        "shouldSlice": false
                    },
                    "categoryCode": "tru_lego_building_toys",
                    "content": {
                        "name": "LEGO & building toys",
                        "description": "",
                        "pageTitle": "Building Blocks | Shop Building Toys Online | Toys 'R' Us UAE",
                        "metaTagTitle": "",
                        "metaTagDescription": " Find the best building blocks at Toys 'R' Us. Shop our range of building toys from top brands & enjoy our wide selection.",
                        "metaTagKeywords": "",
                        "slug": "toys-lego-and-building-toys-",
                        "categoryImages": [
                            {
                                "altText": "",
                                "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/ef95d56d-2edc-4079-a3b4-97549d4d1609",
                                "cmsId": "ef95d56d-2edc-4079-a3b4-97549d4d1609",
                                "sequence": 1
                            }
                        ]
                    },
                    "sequence": 2,
                    "isDisplayed": true,
                    "count": 0,
                    "updateDate": "0001-01-01T00:00:00.000Z",
                    "shouldSlice": false
                },
                {
                    "categoryId": 1,
                    "categoryCode": "tru_toys",
                    "content": {
                        "name": "Toys",
                        "description": "",
                        "pageTitle": "Buy Toys Online | Kids' Toys | Toys 'R' Us UAE",
                        "metaTagTitle": "Buy Toys Online | Kids' Toys | Toys 'R' Us UAE",
                        "metaTagDescription": "Discover our collection of toys online today. Shop kids' toys from brands like Barbie & enjoy 20 - 50 % OFF. Start shopping now to enjoy our wide selection.",
                        "metaTagKeywords": "Toys",
                        "slug": "toys",
                        "categoryImages": [
                            {
                                "altText": "",
                                "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/6221e9ad-a5c1-4bd7-83b7-2fe2da34f3c6",
                                "cmsId": "6221e9ad-a5c1-4bd7-83b7-2fe2da34f3c6",
                                "sequence": 1
                            }
                        ]
                    },
                    "sequence": 1,
                    "isDisplayed": true,
                    "count": 0,
                    "updateDate": "0001-01-01T00:00:00.000Z",
                    "shouldSlice": false
                }
            ],
            "measurements": {
                "packageHeight": {
                    "unit": "in",
                    "value": 1.000
                },
                "packageWidth": {
                    "unit": "in",
                    "value": 1.000
                },
                "packageLength": {
                    "unit": "in",
                    "value": 1.000
                },
                "packageWeight": {
                    "unit": "lbs",
                    "value": 1.000
                }
            },
            "isPackagedStandAlone": true,
            "properties": [
                {
                    "attributeFQN": "tenant~product-crosssell",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "TextBox",
                        "dataType": "String",
                        "usageType": "Property",
                        "dataTypeSequence": 2,
                        "name": "Product Cross-Sells",
                        "searchableInStorefront": false,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": "VALPRD001",
                            "stringValue": "VALPRD001"
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~popularity",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "TextBox",
                        "dataType": "Number",
                        "usageType": "Property",
                        "dataTypeSequence": 1,
                        "name": "Popularity",
                        "searchableInStorefront": true,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": 4
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~rating",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "TextBox",
                        "dataType": "Number",
                        "usageType": "Property",
                        "dataTypeSequence": 2,
                        "name": "Rating",
                        "searchableInStorefront": true,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": 5
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~product-related",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "TextBox",
                        "dataType": "String",
                        "usageType": "Property",
                        "dataTypeSequence": 4,
                        "name": "Related Products",
                        "searchableInStorefront": false,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": "VALPRD001",
                            "stringValue": "VALPRD001"
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~product-upsell",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "TextBox",
                        "dataType": "String",
                        "usageType": "Property",
                        "dataTypeSequence": 7,
                        "name": "Product Upsells",
                        "searchableInStorefront": false,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": "VALPRD001",
                            "stringValue": "VALPRD001"
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~bundle-extras-in-cart",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "YesNo",
                        "dataType": "Bool",
                        "usageType": "Property",
                        "dataTypeSequence": 0,
                        "name": "Bundle Extras In Cart",
                        "description": "",
                        "searchableInStorefront": true,
                        "searchDisplayValue": true,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": false
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~availability",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "Predefined",
                        "inputType": "List",
                        "dataType": "String",
                        "usageType": "Property",
                        "dataTypeSequence": 1,
                        "name": "Availability",
                        "searchableInStorefront": true,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": "24-48hrs",
                            "stringValue": "Usually Ships in 24 to 48 Hours"
                        }
                    ],
                    "propertyType": "StandardProperty"
                }
            ],
            "slicingAttributeFQN": "",
            "productImageGroups": [],
            "productCollections": [],
            "score": 0,
            "personalizationScore": 0,
            "costPriceMargin": 60.42
        },
        {
            "productCode": "TUPRD0077204",
            "productSequence": 3,
            "productUsage": "Standard",
            "fulfillmentTypesSupported": [
                "DirectShip",
                "InStorePickup",
                "Delivery"
            ],
            "goodsType": "Physical",
            "content": {
                "productName": "Barbie Dreamhouse Pool Party Playset (2023) with 75+ Pieces",
                "productFullDescription": "<span style=\"color: rgb(0, 0, 0); font-family: roboto, sans-serif; font-size: 13px;\">​</span><font face=\"roboto, sans-serif\"><span style=\"font-size: 13px;\">This iconic dollhouse boasts 360-degree play, sprawling across 3 storeys and 10 living areas for Barbie and her friends to explore.</span></font><span style=\"font-size: 13px; font-family: roboto, sans-serif;\">\"Dive into the pool party fun as Barbie and her friends slide down the tallest slide in the Barbie Dreamhouse series.</span><span style=\"font-size: 13px; font-family: roboto, sans-serif;\">The dollhouse doubles as a pet paradise with pet elevator, slide, pool, pet bed, doggie door, pet house, and a pet puppy figure</span><div style=\"\"><font face=\"roboto, sans-serif\"><span style=\"font-size: 13px;\">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></font></div>",
                "productShortDescription": "<span style=\"color: rgb(0, 0, 0); font-family: roboto, sans-serif; font-size: 13px;\">​</span><font face=\"roboto, sans-serif\"><span style=\"font-size: 13px;\">Kids will never run out of stories at the Barbie Dreamhouse Pool Party Playset (2023) with 75+ Pieces</span></font><span style=\"font-size: 13px; font-family: roboto, sans-serif;\">&nbsp; &nbsp; &nbsp;</span>",
                "metaTagTitle": "Barbie Dreamhouse Pool Party Playset (2023) with 75+ Pieces",
                "metaTagDescription": "​This iconic dollhouse boasts 360-degree play, sprawling across 3 storeys and 10 living areas for Barbie and her friends to explore.\"Dive into the pool party fun as Barbie and her friends slide down the tallest slide in the Barbie Dreamhouse series.The dollhouse doubles as a pet paradise with pet elevator, slide, pool, pet bed, doggie door, pet house, and a pet puppy figure",
                "seoFriendlyUrl": "barbie-dreamhouse-pool-party-playset-2023-with-75-pieces",
                "productImages": [
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/dfda03ae-12f3-4ab3-8a7a-eeb47b6489ca",
                        "cmsId": "dfda03ae-12f3-4ab3-8a7a-eeb47b6489ca",
                        "sequence": 1,
                        "productImageGroupId": "default"
                    },
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/8c355d13-5ace-41f7-85e6-b2e7e988a4a9",
                        "cmsId": "8c355d13-5ace-41f7-85e6-b2e7e988a4a9",
                        "sequence": 2,
                        "productImageGroupId": "default"
                    },
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/0c6c4c75-8d50-42d5-b487-a48e65a7f594",
                        "cmsId": "0c6c4c75-8d50-42d5-b487-a48e65a7f594",
                        "sequence": 3,
                        "productImageGroupId": "default"
                    },
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/ad21d1bb-487e-496b-a8f9-06591637efdb",
                        "cmsId": "ad21d1bb-487e-496b-a8f9-06591637efdb",
                        "sequence": 4,
                        "productImageGroupId": "default"
                    },
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/af22b2d2-3a6f-43e1-b849-099cb4d90031",
                        "cmsId": "af22b2d2-3a6f-43e1-b849-099cb4d90031",
                        "sequence": 5,
                        "productImageGroupId": "default"
                    }
                ]
            },
            "purchasableState": {
                "isPurchasable": true
            },
            "isActive": true,
            "publishState": "Live",
            "price": {
                "price": 1699.0000,
                "priceType": "List",
                "salePrice": 1699.0000,
                "salePriceType": "CatalogSalePrice",
                "catalogSalePrice": 1699.0000,
                "catalogListPrice": 1699.0000
            },
            "productType": "toy",
            "productTypeId": 17,
            "isTaxable": true,
            "isRecurring": false,
            "pricingBehavior": {
                "discountsRestricted": false
            },
            "inventoryInfo": {
                "manageStock": true,
                "outOfStockBehavior": "DisplayMessage",
                "onlineStockAvailable": 50,
                "onlineSoftStockAvailable": 50,
                "onlineLocationCode": "64880",
                "isSubstitutable": false
            },
            "createDate": "2024-02-15T09:43:37.553Z",
            "updateDate": "2024-02-16T13:48:12.985Z",
            "dateFirstAvailableInCatalog": "2024-02-16T13:48:12.841Z",
            "daysAvailableInCatalog": 17,
            "upc": "194735134267",
            "upCs": [
                "194735134267"
            ],
            "mfgPartNumber": "2272245",
            "mfgPartNumbers": [
                "2272245"
            ],
            "categories": [
                {
                    "categoryId": 10,
                    "parentCategory": {
                        "categoryId": 1,
                        "categoryCode": "tru_toys",
                        "content": {
                            "name": "Toys",
                            "description": "",
                            "pageTitle": "Buy Toys Online | Kids' Toys | Toys 'R' Us UAE",
                            "metaTagTitle": "Buy Toys Online | Kids' Toys | Toys 'R' Us UAE",
                            "metaTagDescription": "Discover our collection of toys online today. Shop kids' toys from brands like Barbie & enjoy 20 - 50 % OFF. Start shopping now to enjoy our wide selection.",
                            "metaTagKeywords": "Toys",
                            "slug": "toys",
                            "categoryImages": [
                                {
                                    "altText": "",
                                    "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/6221e9ad-a5c1-4bd7-83b7-2fe2da34f3c6",
                                    "cmsId": "6221e9ad-a5c1-4bd7-83b7-2fe2da34f3c6",
                                    "sequence": 1
                                }
                            ]
                        },
                        "sequence": 1,
                        "isDisplayed": true,
                        "count": 0,
                        "updateDate": "0001-01-01T00:00:00.000Z",
                        "shouldSlice": false
                    },
                    "categoryCode": "tru_dolls_doll_play",
                    "content": {
                        "name": "Dolls & doll play",
                        "description": "",
                        "pageTitle": "Dolls | Baby Dolls & Dollhouses Online | Toys 'R' Us UAE",
                        "metaTagTitle": "",
                        "metaTagDescription": " Shop the latest range of dolls online at Toys 'R' Us. Find your favorite baby dolls & dollhouses & enjoy our wide selection.",
                        "metaTagKeywords": "",
                        "slug": "toys-dolls-and-doll-play-",
                        "categoryImages": [
                            {
                                "altText": "",
                                "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/f7fae0d8-84ac-412a-8ece-39da4465db32",
                                "cmsId": "f7fae0d8-84ac-412a-8ece-39da4465db32",
                                "sequence": 1
                            }
                        ]
                    },
                    "sequence": 3,
                    "isDisplayed": true,
                    "count": 0,
                    "updateDate": "0001-01-01T00:00:00.000Z",
                    "shouldSlice": false
                },
                {
                    "categoryId": 1,
                    "categoryCode": "tru_toys",
                    "content": {
                        "name": "Toys",
                        "description": "",
                        "pageTitle": "Buy Toys Online | Kids' Toys | Toys 'R' Us UAE",
                        "metaTagTitle": "Buy Toys Online | Kids' Toys | Toys 'R' Us UAE",
                        "metaTagDescription": "Discover our collection of toys online today. Shop kids' toys from brands like Barbie & enjoy 20 - 50 % OFF. Start shopping now to enjoy our wide selection.",
                        "metaTagKeywords": "Toys",
                        "slug": "toys",
                        "categoryImages": [
                            {
                                "altText": "",
                                "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/6221e9ad-a5c1-4bd7-83b7-2fe2da34f3c6",
                                "cmsId": "6221e9ad-a5c1-4bd7-83b7-2fe2da34f3c6",
                                "sequence": 1
                            }
                        ]
                    },
                    "sequence": 1,
                    "isDisplayed": true,
                    "count": 0,
                    "updateDate": "0001-01-01T00:00:00.000Z",
                    "shouldSlice": false
                }
            ],
            "measurements": {
                "packageHeight": {
                    "unit": "in",
                    "value": 1.000
                },
                "packageWidth": {
                    "unit": "in",
                    "value": 1.000
                },
                "packageLength": {
                    "unit": "in",
                    "value": 1.000
                },
                "packageWeight": {
                    "unit": "lbs",
                    "value": 1.000
                }
            },
            "isPackagedStandAlone": true,
            "properties": [
                {
                    "attributeFQN": "tenant~product-crosssell",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "TextBox",
                        "dataType": "String",
                        "usageType": "Property",
                        "dataTypeSequence": 2,
                        "name": "Product Cross-Sells",
                        "searchableInStorefront": false,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": "VALPRD002",
                            "stringValue": "VALPRD002"
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~product-related",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "TextBox",
                        "dataType": "String",
                        "usageType": "Property",
                        "dataTypeSequence": 4,
                        "name": "Related Products",
                        "searchableInStorefront": false,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": "VALPRD002",
                            "stringValue": "VALPRD002"
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~product-upsell",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "TextBox",
                        "dataType": "String",
                        "usageType": "Property",
                        "dataTypeSequence": 7,
                        "name": "Product Upsells",
                        "searchableInStorefront": false,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": "VALPRD001",
                            "stringValue": "VALPRD001"
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~bundle-extras-in-cart",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "YesNo",
                        "dataType": "Bool",
                        "usageType": "Property",
                        "dataTypeSequence": 0,
                        "name": "Bundle Extras In Cart",
                        "description": "",
                        "searchableInStorefront": true,
                        "searchDisplayValue": true,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": false
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~availability",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "Predefined",
                        "inputType": "List",
                        "dataType": "String",
                        "usageType": "Property",
                        "dataTypeSequence": 1,
                        "name": "Availability",
                        "searchableInStorefront": true,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": "1-2days",
                            "stringValue": "Usually Ships in 1 to 2 Days"
                        }
                    ],
                    "propertyType": "StandardProperty"
                }
            ],
            "slicingAttributeFQN": "",
            "productImageGroups": [],
            "productCollections": [],
            "score": 0,
            "personalizationScore": 0,
            "costPriceMargin": 41.14
        },
        {
            "productCode": "VALPRD0003",
            "productSequence": 4,
            "productUsage": "Standard",
            "fulfillmentTypesSupported": [
                "DirectShip",
                "InStorePickup",
                "Delivery"
            ],
            "goodsType": "Physical",
            "content": {
                "productName": "LeapStart 3D Learning System (Green)",
                "productFullDescription": "<ul class=\"list-dots success\" style=\"box-sizing: border-box; margin: 0px; list-style: none; padding: 0px; font-family: &quot;Nunito Sans&quot;, &quot;El Messiri&quot;, sans-serif; font-size: 16px;\"><li style=\"box-sizing: border-box; width: 698.167px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">Perfect for young learners, the books are designed to enhance your child's learning from preschool to first grade level</li><li style=\"box-sizing: border-box; width: 698.167px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">Interactive animations with fun characters help develop reading, math, problem-solving skills and more</li><li style=\"box-sizing: border-box; width: 698.167px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">The 30+ replayable activities are designed with 2 levels for kids to play and learn, and increase difficulty when they are ready</li></ul>",
                "productShortDescription": "<ul class=\"list-dots success\" style=\"box-sizing: border-box; margin: 0px; list-style: none; padding: 0px; font-family: &quot;Nunito Sans&quot;, &quot;El Messiri&quot;, sans-serif; font-size: 16px;\"><li style=\"box-sizing: border-box; width: 698.167px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">Get your little one ready for school with the LeapFrog LeapStart 3D Learning System (Green)</li><li style=\"box-sizing: border-box; width: 698.167px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">This all-in-one interactive system helps enhance your child's learning through touch-and-talk games and 3D-like animations</li></ul>",
                "metaTagTitle": "LeapStart 3D Learning System (Green)",
                "metaTagDescription": "Perfect for young learners, the books are designed to enhance your child's learning from preschool to first grade levelInteractive animations with fun characters help develop reading, math, problem-solving skills and moreThe 30+ replayable activities are designed with 2 levels for kids to play and learn, and increase difficulty when they are ready",
                "seoFriendlyUrl": "leapstart-3d-learning-system-green-",
                "productImages": [
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/cdc81045-9e25-41d7-b855-1d2010ce0566",
                        "cmsId": "cdc81045-9e25-41d7-b855-1d2010ce0566",
                        "sequence": 1,
                        "productImageGroupId": "default"
                    },
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/18a27cee-acdd-40c8-9686-12459013587c",
                        "cmsId": "18a27cee-acdd-40c8-9686-12459013587c",
                        "sequence": 2,
                        "productImageGroupId": "default"
                    },
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/7239b69f-d9a7-4964-ab78-fdad9c70cfa3",
                        "cmsId": "7239b69f-d9a7-4964-ab78-fdad9c70cfa3",
                        "sequence": 3,
                        "productImageGroupId": "default"
                    }
                ]
            },
            "purchasableState": {
                "isPurchasable": true
            },
            "isActive": true,
            "publishState": "Live",
            "price": {
                "price": 499.0000,
                "priceType": "List",
                "salePrice": 424.0000,
                "salePriceType": "CatalogSalePrice",
                "catalogSalePrice": 424.0000,
                "catalogListPrice": 499.0000
            },
            "productType": "toy",
            "productTypeId": 17,
            "isTaxable": true,
            "isRecurring": false,
            "pricingBehavior": {
                "discountsRestricted": false
            },
            "inventoryInfo": {
                "manageStock": true,
                "outOfStockBehavior": "DisplayMessage",
                "onlineStockAvailable": 15,
                "onlineSoftStockAvailable": 15,
                "onlineLocationCode": "64880",
                "isSubstitutable": false
            },
            "createDate": "2024-02-16T11:22:16.229Z",
            "updateDate": "2024-02-16T13:48:13.087Z",
            "dateFirstAvailableInCatalog": "2024-02-16T13:48:13.073Z",
            "daysAvailableInCatalog": 17,
            "upc": "1930164",
            "upCs": [
                "1930164"
            ],
            "mfgPartNumber": "1930164",
            "mfgPartNumbers": [
                "1930164"
            ],
            "categories": [],
            "measurements": {
                "packageHeight": {
                    "unit": "in",
                    "value": 1.000
                },
                "packageWidth": {
                    "unit": "in",
                    "value": 1.000
                },
                "packageLength": {
                    "unit": "in",
                    "value": 1.000
                },
                "packageWeight": {
                    "unit": "lbs",
                    "value": 1.000
                }
            },
            "isPackagedStandAlone": true,
            "properties": [
                {
                    "attributeFQN": "tenant~bundle-extras-in-cart",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "YesNo",
                        "dataType": "Bool",
                        "usageType": "Property",
                        "dataTypeSequence": 0,
                        "name": "Bundle Extras In Cart",
                        "description": "",
                        "searchableInStorefront": true,
                        "searchDisplayValue": true,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": false
                        }
                    ],
                    "propertyType": "StandardProperty"
                }
            ],
            "slicingAttributeFQN": "",
            "productImageGroups": [],
            "productCollections": [],
            "score": 0,
            "personalizationScore": 0,
            "costPriceMargin": 52.83
        },
        {
            "productCode": "VALPRD0005",
            "productSequence": 5,
            "productUsage": "Standard",
            "fulfillmentTypesSupported": [
                "DirectShip",
                "InStorePickup",
                "Delivery"
            ],
            "goodsType": "Physical",
            "content": {
                "productName": "KidKraft Camila Mansion Dollhouse",
                "productFullDescription": "<ul class=\"list-dots success\" style=\"box-sizing: border-box; margin: 0px; list-style: none; padding: 0px; font-family: &quot;Nunito Sans&quot;, &quot;El Messiri&quot;, sans-serif; font-size: 16px;\"><li style=\"box-sizing: border-box; width: 748.703px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">The dollhouse comes with a total of 30 pieces ; features 8 rooms and 4 levels</li><li style=\"box-sizing: border-box; width: 748.703px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">Transparent roofs, a gliding elevator and a hot tub at the rooftop make the dollhouse chic</li><li style=\"box-sizing: border-box; width: 748.703px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">Working lights and sounds in the fridge, toilet and lamp make playtime engaging and fun</li><li style=\"box-sizing: border-box; width: 748.703px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">Dolls can unwind at the patio with a countertop bar</li><li style=\"box-sizing: border-box; width: 748.703px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">Made with sturdy wooden construction to last a lifetime ; fits dolls up to 30 cm</li><li style=\"box-sizing: border-box; width: 748.703px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">No dolls included</li><li style=\"box-sizing: border-box; width: 748.703px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">The dollhouse measures 113.0 cm long, 31.5 cm wide and 123.49 cm high</li></ul>",
                "productShortDescription": "<ul class=\"list-dots success\" style=\"box-sizing: border-box; margin: 0px; list-style: none; padding: 0px; font-family: &quot;Nunito Sans&quot;, &quot;El Messiri&quot;, sans-serif; font-size: 16px;\"><li style=\"box-sizing: border-box; width: 748.703px; margin: 0px 0px 0.75rem; position: relative; padding: 0px 0px 0px 1.25rem;\">Kids will have a blast playing with dolls in the modern and glamorous KidKraft Camila Mansion Dollhouse</li></ul>",
                "metaTagTitle": " KidKraft Camila Mansion Dollhouse",
                "metaTagDescription": "The dollhouse comes with a total of 30 pieces ; features 8 rooms and 4 levelsTransparent roofs, a gliding elevator and a hot tub at the rooftop make the dollhouse chicWorking lights and sounds in the fridge, toilet and lamp make playtime engaging and funDolls can unwind at the patio with a countertop barMade with sturdy wooden construction to last a lifetime ; fits dolls up to 30 cmNo dolls includedThe dollhouse measures 113.0 cm long, 31.5 cm wide and 123.49 cm high",
                "seoFriendlyUrl": "-kidkraft-camila-mansion-dollhouse",
                "productImages": [
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/6167538c-87f9-4b4b-b1dd-8dea6a480998",
                        "cmsId": "6167538c-87f9-4b4b-b1dd-8dea6a480998",
                        "sequence": 1,
                        "productImageGroupId": "default"
                    },
                    {
                        "altText": "",
                        "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/9949af50-4519-47d8-abb8-91fe16557730",
                        "cmsId": "9949af50-4519-47d8-abb8-91fe16557730",
                        "sequence": 2,
                        "productImageGroupId": "default"
                    }
                ]
            },
            "purchasableState": {
                "isPurchasable": true
            },
            "isActive": true,
            "publishState": "Live",
            "price": {
                "price": 1199.0000,
                "priceType": "List",
                "salePrice": 999.0000,
                "salePriceType": "CatalogSalePrice",
                "catalogSalePrice": 999.0000,
                "catalogListPrice": 1199.0000
            },
            "productType": "toy",
            "productTypeId": 17,
            "isTaxable": true,
            "isRecurring": false,
            "pricingBehavior": {
                "discountsRestricted": false
            },
            "inventoryInfo": {
                "manageStock": true,
                "outOfStockBehavior": "DisplayMessage",
                "onlineStockAvailable": 90,
                "onlineSoftStockAvailable": 90,
                "onlineLocationCode": "64880",
                "isSubstitutable": false
            },
            "createDate": "2024-02-16T13:18:01.850Z",
            "updateDate": "2024-02-16T13:48:13.169Z",
            "dateFirstAvailableInCatalog": "2024-02-16T17:14:17.000Z",
            "daysAvailableInCatalog": 17,
            "categories": [
                {
                    "categoryId": 10,
                    "parentCategory": {
                        "categoryId": 1,
                        "categoryCode": "tru_toys",
                        "content": {
                            "name": "Toys",
                            "description": "",
                            "pageTitle": "Buy Toys Online | Kids' Toys | Toys 'R' Us UAE",
                            "metaTagTitle": "Buy Toys Online | Kids' Toys | Toys 'R' Us UAE",
                            "metaTagDescription": "Discover our collection of toys online today. Shop kids' toys from brands like Barbie & enjoy 20 - 50 % OFF. Start shopping now to enjoy our wide selection.",
                            "metaTagKeywords": "Toys",
                            "slug": "toys",
                            "categoryImages": [
                                {
                                    "altText": "",
                                    "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/6221e9ad-a5c1-4bd7-83b7-2fe2da34f3c6",
                                    "cmsId": "6221e9ad-a5c1-4bd7-83b7-2fe2da34f3c6",
                                    "sequence": 1
                                }
                            ]
                        },
                        "sequence": 1,
                        "isDisplayed": true,
                        "count": 0,
                        "updateDate": "0001-01-01T00:00:00.000Z",
                        "shouldSlice": false
                    },
                    "categoryCode": "tru_dolls_doll_play",
                    "content": {
                        "name": "Dolls & doll play",
                        "description": "",
                        "pageTitle": "Dolls | Baby Dolls & Dollhouses Online | Toys 'R' Us UAE",
                        "metaTagTitle": "",
                        "metaTagDescription": " Shop the latest range of dolls online at Toys 'R' Us. Find your favorite baby dolls & dollhouses & enjoy our wide selection.",
                        "metaTagKeywords": "",
                        "slug": "toys-dolls-and-doll-play-",
                        "categoryImages": [
                            {
                                "altText": "",
                                "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/f7fae0d8-84ac-412a-8ece-39da4465db32",
                                "cmsId": "f7fae0d8-84ac-412a-8ece-39da4465db32",
                                "sequence": 1
                            }
                        ]
                    },
                    "sequence": 3,
                    "isDisplayed": true,
                    "count": 0,
                    "updateDate": "0001-01-01T00:00:00.000Z",
                    "shouldSlice": false
                },
                {
                    "categoryId": 1,
                    "categoryCode": "tru_toys",
                    "content": {
                        "name": "Toys",
                        "description": "",
                        "pageTitle": "Buy Toys Online | Kids' Toys | Toys 'R' Us UAE",
                        "metaTagTitle": "Buy Toys Online | Kids' Toys | Toys 'R' Us UAE",
                        "metaTagDescription": "Discover our collection of toys online today. Shop kids' toys from brands like Barbie & enjoy 20 - 50 % OFF. Start shopping now to enjoy our wide selection.",
                        "metaTagKeywords": "Toys",
                        "slug": "toys",
                        "categoryImages": [
                            {
                                "altText": "",
                                "imageUrl": "//cdn-sb.mozu.com/42380-64880/cms/64880/files/6221e9ad-a5c1-4bd7-83b7-2fe2da34f3c6",
                                "cmsId": "6221e9ad-a5c1-4bd7-83b7-2fe2da34f3c6",
                                "sequence": 1
                            }
                        ]
                    },
                    "sequence": 1,
                    "isDisplayed": true,
                    "count": 0,
                    "updateDate": "0001-01-01T00:00:00.000Z",
                    "shouldSlice": false
                }
            ],
            "measurements": {
                "packageHeight": {
                    "unit": "in",
                    "value": 1.000
                },
                "packageWidth": {
                    "unit": "in",
                    "value": 1.000
                },
                "packageLength": {
                    "unit": "in",
                    "value": 1.000
                },
                "packageWeight": {
                    "unit": "lbs",
                    "value": 1.000
                }
            },
            "isPackagedStandAlone": true,
            "properties": [
                {
                    "attributeFQN": "tenant~product-crosssell",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "TextBox",
                        "dataType": "String",
                        "usageType": "Property",
                        "dataTypeSequence": 2,
                        "name": "Product Cross-Sells",
                        "searchableInStorefront": false,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": "TUPRD0077204",
                            "stringValue": "TUPRD0077204"
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~popularity",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "TextBox",
                        "dataType": "Number",
                        "usageType": "Property",
                        "dataTypeSequence": 1,
                        "name": "Popularity",
                        "searchableInStorefront": true,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": 5
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~rating",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "TextBox",
                        "dataType": "Number",
                        "usageType": "Property",
                        "dataTypeSequence": 2,
                        "name": "Rating",
                        "searchableInStorefront": true,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": 5
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~product-related",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "TextBox",
                        "dataType": "String",
                        "usageType": "Property",
                        "dataTypeSequence": 4,
                        "name": "Related Products",
                        "searchableInStorefront": false,
                        "searchDisplayValue": false,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": "TUPRD0077204",
                            "stringValue": "TUPRD0077204"
                        }
                    ],
                    "propertyType": "StandardProperty"
                },
                {
                    "attributeFQN": "tenant~bundle-extras-in-cart",
                    "isHidden": false,
                    "isMultiValue": false,
                    "attributeDetail": {
                        "valueType": "AdminEntered",
                        "inputType": "YesNo",
                        "dataType": "Bool",
                        "usageType": "Property",
                        "dataTypeSequence": 0,
                        "name": "Bundle Extras In Cart",
                        "description": "",
                        "searchableInStorefront": true,
                        "searchDisplayValue": true,
                        "allowFilteringAndSortingInStorefront": true,
                        "customWeightInStorefrontSearch": false,
                        "availableForOrderRouting": false
                    },
                    "values": [
                        {
                            "value": false
                        }
                    ],
                    "propertyType": "StandardProperty"
                }
            ],
            "slicingAttributeFQN": "",
            "productImageGroups": [],
            "productCollections": [],
            "score": 0,
            "personalizationScore": 0,
            "costPriceMargin": 100
        }
    ],
    },
  }
}

const Home: NextPageWithLayout<HomePageProps> = (props) => {
  console.info({ props })
  const { carouselItem, products } = props
  return (
    <>
      <KiboHeroCarousel carouselItem={carouselItem || []}></KiboHeroCarousel>
      <TRUHome products={products} />
    </>
  )
}

export default Home
