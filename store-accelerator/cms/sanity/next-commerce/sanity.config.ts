import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import storeAccelaratorStructure from "./schemas/structure/structure";
import { colorInput } from '@sanity/color-input';

export default defineConfig({
  name: 'default',
  title: 'Next commerce',

  projectId: 'c11ge1m8',
  dataset: 'production',

  plugins: [structureTool({ structure: storeAccelaratorStructure }), visionTool(), colorInput()],

  schema: {
    types: schemaTypes,
  },
})
