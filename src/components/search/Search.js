import styles from './search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue, watchInputValue } from '../../redux/features/search/searchSlice';
import { useRef, useState, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';

const Search = () => {
  const [inputCurrentValue, setInputCurrentValue] = useState('');
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const clearInput = () => {
    dispatch(setInputValue(''));
    setInputCurrentValue('');
    inputRef.current.focus();
  };

  const onChangeInputHandler = useCallback(
    debounce((value) => {
      dispatch(setInputValue(value));
    }, 1000),
    []
  );

  const updateInputValue = (e) => {
    setInputCurrentValue(e.target.value);
  };

  useEffect(() => {
    onChangeInputHandler(inputCurrentValue);
  }, [inputCurrentValue]);

  return (
    <label className={styles.container}>
      {/* control input form what is reacts rec, reqiures us to put a value attr in input tag in order to maintain its displaying value 
      So it helps us to implement a clear button functionality */}
      <input
        type="text"
        ref={inputRef}
        value={inputCurrentValue}
        onChange={(e) => updateInputValue(e)}
        required
      />
      <span className={styles.placeholder}>Search pizza...</span>
      <span className={styles.border}></span>
      {inputCurrentValue && <CloseIcon className={styles.closeIcon} onClick={clearInput} />}
      <SearchIcon className={styles.searchIcon} />
    </label>
  );
};

export default Search;
