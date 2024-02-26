import { defineField } from 'sanity';
import menuItems from './menuItems';

export default{
  name: 'header',
  title: 'header',
  type: 'document',
  fields: [
    {
      name: 'itemName',
      title: 'Name',
      type: 'string',
  },
    {
      name: 'storeLogo',
      title: 'store Logo',
      type: 'storeLogo',
    },
    {
      name: 'storeName',
      title: 'Store Name',
      type: 'storeName',
    },
    {
        name: 'menuItems',
        title: 'categories',
        type: 'array',
        of: [menuItems], 
        validation: (Rule: { max: (arg0: number) => any; })=>Rule.max(6)
    },
    {
      name: 'searchBar',
      title: 'Search Bar',
      type: 'searchBar',
    },
    defineField(
        {
            name: 'cartIcon',
            title: 'Cart Icon',
            type: 'cartIcon',
            // validation: Rule=> Rule.max(2)
          },
    )
    
  ],
};