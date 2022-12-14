import { createContext, useState } from 'react';

const searchContext = createContext();

const SearchContext = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <searchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </searchContext.Provider>
  );
};

export default SearchContext;
export { searchContext };
