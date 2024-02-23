import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@mantine/core';
import { Select } from '@mantine/core';
import { API_KEYS, API_URL, useGetFetch } from '../../Api/api';
import { selectToken } from '../../Store/reducers/Auth/authSelector';
import { useDispatch, useSelector } from 'react-redux';
import { endLoading, startLoading } from '../../Store/reducers/globalLoader/loaderSlice';

const Searchbar = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [productCateogry, setProductCategories] = useState([]);

  const { data: categoryData, isFetching: isFetchingCategories } = useGetFetch({
    queryKey: [API_KEYS.productCateogry],
    url: API_URL.productCateogry,
    isPage: 1,
    filters: {
      rowCount: 100,
    },
    token,
  });

  console.log('🚀 ~ Searchbar ~ categoryData:', categoryData);
  useEffect(() => {
    try {
      if (categoryData) {
        const { data, status } = categoryData;
        if (data && status) {
          const res = data.map(({ name, _id }) => {
            return { label: name, value: _id };
          });
          setProductCategories(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [categoryData]);

  useEffect(() => {
    try {
      if (isFetchingCategories) {
        dispatch(startLoading());
      } else {
        dispatch(endLoading());
      }
    } catch (error) {
      console.log(error);
    }
  }, [isFetchingCategories]);

  return (
    <div className="flex items-center h-full flex-1">
      <Input
        size="md"
        variant="unstyled"
        placeholder="Search Amazon"
        className="px-3 bg-white w-full rounded-md focus-within:outline focus-within:outline-orange_100"
        leftSectionWidth={'15%'}
        leftSectionPointerEvents="all"
        leftSection={
          <div className="cursor-pointer">
            <Select placeholder="Pick value" data={productCateogry} />
          </div>
        }
        rightSectionPointerEvents="all"
        rightSection={
          <button className="bg-orange_100 text-darkblue-1000 rounded-r-md h-[105%] p-2 border border-orange_100">
            <Search />
          </button>
        }
      />
    </div>
  );
};

export default Searchbar;
