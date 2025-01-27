import './index.scss';
import { ISearch } from '@/icons';

const Search = () => {
  return (
    <div className='card search'>
      <div className='search__input'>
        <input type='text' id='search-input' />
      </div>
      <label
        className='search__ctrl'
        id='search-btn'
        title='搜索'
        htmlFor='search-input'
      >
        <ISearch />
      </label>
    </div>
  );
};

export default Search;
