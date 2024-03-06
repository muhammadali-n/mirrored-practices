# Algolia Connector

This Java application serves as a connector for seamless integration with Algolia, offering a convenient way to index
data. The primary feature of this connector is its simplified configuration through a `configuration.json` file, which
includes Algolia credentials and source details.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Features

The main features of the Algolia Connector Java Application include:

- Streamlined integration with Algolia for indexing data.
- Simple configuration using a `configuration.json` file.
- Inclusion of Algolia credentials and source details for ease of use.

## Installation

To install the Algolia Connector, follow these steps:

1. Clone the repository: `git clone https://github.com/DhaneshKJ/valoriz.git`
2. Navigate to the project directory: `yourPathName/valoriz`
3. Build the application: `gradlew clean build`

## Usage

To use the Algolia Connector, follow these steps:

1. Create a `configuration.json` file in the `src/main/resources/files`.
   ```json
   // configuration.json
   {
   "algoliaApplicationId": "@applicationId",
   "algoliaAdminApiKey": "@adminApiKey",
   "algoliaIndexName": "@IndexName",
   "sourceConfiguration": {
   "type": "@provideType",
   "collectionConfiguration": ["@mappingDetails"]
      }
   }
2. Add a `transformer.json` file to transform attributes or values in the JSON data.

   ```json
   // transformer.json
   "transformer": [
        {
            "inputFieldName": "@inputFieldName",
            "outputFieldName": "@outputFieldName",
            "convertTo": "@integerToString"
        },
