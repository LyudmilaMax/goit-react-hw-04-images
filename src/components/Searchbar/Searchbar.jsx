import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-hot-toast';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchLabel,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export default function Searchbar(param) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = evt => {
    setSearchValue(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchValue.trim() === '') {
      return toast.error('Add text in search');
    }

    param.onSubmit(searchValue);
    //setSearchValue('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <ImSearch style={{ marginRight: 8 }} />
          <SearchLabel>Search</SearchLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleChange}
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
