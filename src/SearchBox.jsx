import { FaSearch } from 'react-icons/fa';
import { useContext } from 'react';
import { Context } from './index';
import debounce from './utils/debounce'

function SearchBox() {
  const { dispatch } = useContext(Context);

  // added 500ms debounce to optimize UX and requests to the data
  const handleInput = debounce((event) => {
    dispatch({ type: 'SEARCH_PROPERTY', searchValue: event.target.value });
  }, 500);

  return (
    <div className="mt-5 relative">
      <input placeholder="Enter a search term" className="px-5 py-3 border-gray-400 border rounded w-full"
             onInput={handleInput}
      />

      <FaSearch className="absolute top-3.5 right-3.5 text-gray-400" size={20} />
    </div>
  );
}

export default SearchBox;
