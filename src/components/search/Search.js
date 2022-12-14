import styles from './search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { clearInput, watchInputValue } from '../../redux/features/search/searchSlice';

const Search = () => {
  const searchValue = useSelector((store) => store.search);
  const dispatch = useDispatch();
  return (
    <label className={styles.container}>
      {/* control input form what is reacts rec, reqiures us to put a value attr in input tag in order to maintain its displaying value 
      So it helps us to implement a clear button functionality */}
      <input
        type="text"
        value={searchValue}
        onChange={(event) => dispatch(watchInputValue(event.target.value))}
        required
      />
      <span className={styles.placeholder}>Search pizza...</span>
      <span className={styles.border}></span>
      {searchValue && (
        <CloseIcon className={styles.closeIcon} onClick={() => dispatch(clearInput())} />
      )}
      <SearchIcon className={styles.searchIcon} />
    </label>
  );
};

export default Search;
