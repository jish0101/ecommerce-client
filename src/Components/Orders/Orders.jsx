import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosPrivate } from '../../Api/api';
import LoaderComponent from '../../Components/Layout/Loader';
import { Breadcrumbs, Anchor } from '@mantine/core';

const Orders = () => {
  const url = useLocation().pathname;
  const { data, isFetching, isLoading } = useQuery({
    queryKey: 'address',
    queryFn: async () => {
      const { data, status } = await axiosPrivate.get('/orders');
      if (status === 200) {
        return data.data;
      }
      return null;
    },
  });

  if (isFetching || isLoading) {
    return (
      <div>
        <LoaderComponent />
      </div>
    );
  }

  const splitUrl = url.split('/').filter(Boolean);
  const generateUrl = (index) => {
    let url = '';
    for (let i = 0; i <= index; i++) {
      url = url.concat(splitUrl[i], '/');
    }
    return url;
  };

  const breadcrums = splitUrl.map((link, index) => (
    <Link className="capitalize text-blue-500" key={link} to={`/${generateUrl(index)}`}>
      {link}
    </Link>
  ));

  return (
    <section>
      <div className="md:w-[1001px] mx-auto p-2">
        <div className="m-2">
          <Breadcrumbs separator="/" separatorMargin="sm">
            {breadcrums}
          </Breadcrumbs>
        </div>
      </div>
    </section>
  );
};

export default Orders;
