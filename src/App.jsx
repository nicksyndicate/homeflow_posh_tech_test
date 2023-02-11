import {useState, useEffect, useContext} from 'react';
import Header from './Header';
import PropertyCard from './PropertyCard';
import React from 'react';
import { Context } from './index';

export const initialState = {
  properties: [],
  searchResult: [],
  searchValue: '',
}

// also can be used regexp for finding whole word occurrence `^(.*?(\\b${value}\\b)[^$]*)$`
const searchProperty = (array, value, key) => array.filter(item => item[key].indexOf(value) !== -1);

export const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case 'DATA_LOADED':
      return {...state, properties: action.properties }

    case 'SEARCH_PROPERTY':
      return {
        ...state,
        searchResult: searchProperty(state.properties, action.searchValue, 'short_description'),
        searchValue: action.searchValue
      }

    default: return state;
  }
}

function App() {
  const { state, dispatch } = useContext(Context);

  // use this state to keep track of the user's saved/bookmarked properties
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    const fetchPropertyData = async () => {
      const response = await fetch('/property-data.json');
      const json = await response.json();

      dispatch({ type: 'DATA_LOADED', properties: json.result.properties.elements });
    };

    fetchPropertyData();
  }, []);

  const properties = state.searchValue ? state.searchResult : state.properties;

  return (
    <div className="container mx-auto my-5">
      <Header />

      <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!!properties && properties.map((property) => <PropertyCard key={property.property_id} property={property} />)}
      </div>
    </div>
  );
}

export default App;
