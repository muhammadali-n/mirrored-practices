import { SchemaType } from '@sanity/types';
import { defineArrayMember, defineField } from 'sanity';
import menuItems from './menuItems';

export default {
    name: 'footer',
    title: 'footer',
    type: 'document',
    fields: [
        {
            name: 'storeLogo',
            title: 'Store Logo',
            type: 'storeLogo',
        },
        {
            name: 'storeName',
            title: 'Store Name',
            type: 'string',
        },
        defineField({
            name: 'button',
            title: 'button',
            type: 'button',

        }),
        {
            name: 'copyright',
            title: 'copy right',
            type: 'object',
            fields: [
                {
                    name: 'Name',
                    title: 'copy right',
                    type: 'string',
                },
                defineField({
                    title: 'translation',
                    name: 'translation',
                    type: 'localeString',
                }),
            ],
        },
        {
            name: 'menuItems',
            title: 'custom-pages',
            type: 'array',
            of: [menuItems], 
            validation: (Rule: { max: (arg0: number) => any; }) => Rule.max(10)
        },
        {
            name: 'designCredit',
            title: 'Designed By',
            type: 'object',
            fields: [
                {
                    name: 'Name',
                    title: 'Designed By',
                    type: 'string',
                },
                defineField({
                    title: 'translation',
                    name: 'translation',
                    type: 'localeString',
                }),
            ],
        },
        {
            name: 'poweredBy',
            title: 'Powered By',
            type: 'object',
            fields: [
                {
                    name: 'Name',
                    title: 'powered by',
                    type: 'string',
                    description: 'Default text indicating the platform used to craft the website, e.g., "Crafted by ▲ Vercel"',
                },
                defineField({
                    title: 'translation',
                    name: 'translation',
                    type: 'localeString',
                }),
            ],
        },
    ],
};