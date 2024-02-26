import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@mantine/core';
import { Select } from '@mantine/core';
import useProductCategories from '../../Hooks/useProductCategories';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedCategory } from '../../Store/reducers/SelectedCategory/selectedCategory.selector';
import { setSelectedCategory } from '../../Store/reducers/SelectedCategory/selectedCategorySlice';
import { setSearchQuery } from '../../Store/reducers/searchProduct/searchProduct';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const selectedCategory = useSelector(selectSelectedCategory);
  const { data: categoryData } = useProductCategories({
    isPage: 1,
    filters: {
      rowCount: 100,
    },
  });

  const handleSearch = () => {
    dispatch(setSearchQuery(search));
    navigate(`/search-page/${selectedCategory?.value || ''}`);
  };

  const categorySelect = (
    <div className="cursor-pointer">
      <Select
        placeholder="All Category"
        data={categoryData}
        value={selectedCategory?.value || null}
        onChange={(_, option) => {
          return dispatch(setSelectedCategory(option));
        }}
      />
    </div>
  );

  const searchBtn = (
    <button
      onClick={handleSearch}
      className="bg-orange_100 text-darkblue-1000 rounded-r-md h-[105%] p-2 border border-orange_100"
    >
      <Search />
    </button>
  );

  return (
    <div className="flex items-center h-full flex-1">
      <Input
        size="md"
        variant="unstyled"
        placeholder="Search Amazon"
        className="px-3 bg-white w-full rounded-md focus-within:outline focus-within:outline-orange_100"
        leftSectionWidth={'15%'}
        leftSectionPointerEvents="all"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        leftSection={categorySelect}
        rightSectionPointerEvents="all"
        rightSection={searchBtn}
      />
    </div>
  );
};

export default Searchbar;
