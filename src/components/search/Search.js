import styles from './search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { searchContext } from '../../context/SearchContext';
import CloseIcon from '@mui/icons-material/Close';

const Search = () => {
  const { searchValue, setSearchValue } = useContext(searchContext);
  console.log(searchValue);

  return (
    <label className={styles.container}>
      {/* control input form what is reacts rec, reqiures us to put a value attr in input tag in order to maintain its displaying value 
      So it helps us to implement a clear button functionality */}
      <input
        type="text"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        required
      />
      <span className={styles.placeholder}>Search pizza...</span>
      <span className={styles.border}></span>
      {searchValue && <CloseIcon className={styles.closeIcon} onClick={() => setSearchValue('')} />}
      <SearchIcon className={styles.searchIcon} />
    </label>
  );
};

export default Search;
