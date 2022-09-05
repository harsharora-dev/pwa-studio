import React from 'react';
import { gql, useQuery } from '@apollo/client'

import classes from "./searchBar.css";

const SearchBar = (props) => {
  // Destructures the props object into variables
//   const { categoriesListData } = props;

//   const { categories } = categoriesListData;

//   // Returns nothing if there are no categories
//   if (!categories) {
//     return null;
//   }

//   // Converts the array of tag strings into an array of Tag components
//   const tagList = categories.map((category) => {
//     return <Tag key={category.name} value={category} />;
//   });
    const { data: storeConfigData } = useQuery(GET_STORE_CONFIG_DATA, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    console.log(storeConfigData);

  // Returns the list of Tag components inside a div container
  return <div className={classes.root}>Search</div>;
};

export default SearchBar;

export const GET_STORE_CONFIG_DATA = gql`
    query getStoreConfigData {
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        storeConfig 
    }
`;
