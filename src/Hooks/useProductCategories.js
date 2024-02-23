import React, { useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import { API_KEYS, API_URL } from '../Api/api';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../Store/reducers/Auth/authSelector';
import { endLoading, startLoading } from '../Store/reducers/globalLoader/loaderSlice';

const useProductCategories = ({ filters, isPage }) => {
  const api = useAxiosPrivate();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [productCateogry, setProductCategories] = useState([]);
  const {
    data: productCateogryData,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: [API_KEYS.productCateogry],
    queryFn: getProductCategories,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retryDelay: Infinity,
  });

  async function getProductCategories() {
    try {
      let endPoint = '';
      let url = API_URL.productCateogry;

      if (isPage) {
        endPoint = `${url}?page=${isPage}&`;
      } else {
        endPoint = `${url}&`;
      }

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (key && value) {
            endPoint += `${key}=${value}&`;
          }
        });
        endPoint = endPoint.slice(0, endPoint.length - 1);
      }
      const { data } = await api.get(endPoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  useEffect(() => {
    try {
      if (productCateogryData) {
        const { data, status } = productCateogryData;
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
  }, [productCateogryData]);

  useEffect(() => {
    try {
      if (isFetching) {
        dispatch(startLoading());
      } else {
        dispatch(endLoading());
      }
    } catch (error) {
      console.log(error);
    }
  }, [isFetching]);

  return { data: productCateogry, isFetching, error, refetch };
};

export default useProductCategories;
