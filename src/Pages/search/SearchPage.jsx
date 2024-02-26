import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../Hooks/useProducts';
import ProductCard from '../../Components/Card/ProductCard';
import { Pagination } from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectSearchQuery } from '../../Store/reducers/searchProduct/searchProduct.selector';

const SearchPage = () => {
  const { id } = useParams();
  const searchQuery = useSelector(selectSearchQuery);

  const [isPage, setIsPage] = useState(1);
  const [filters, setFilters] = useState({
    rowCount: 20,
    categoryId: id,
  });
  const { data: productsData, refetch: refetchProducts } = useProducts({
    isPage,
    filters,
  });
  const products = productsData?.data;
  const pagination = productsData?.pagination;

  console.log('products => ', products);

  useEffect(() => {
    setIsPage(1);
    refetchProducts();
  }, [isPage, filters, id]);

  useEffect(() => {
    setFilters({
      ...filters,
      name: searchQuery,
      categoryId: id,
    });
  }, [id, searchQuery]);

  return (
    <section>
      <div className="border-b px-3">
        <p className="p-2">{`${(isPage - 1) * filters?.rowCount + 1}-${Math.min(isPage * filters?.rowCount, pagination?.totalRecords)} of over ${pagination?.totalRecords} results`}</p>
      </div>
      <div className="grid gap-3 md:max-w-[1101px] mx-auto p-1 my-3">
        <div>
          <h4 className="font-semibold text-2xl">Results</h4>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products &&
            products?.map((data) => (
              <ProductCard data={data} key={data._id} to={`/product-page/${data._id}`} />
            ))}
        </div>
        <div className="flex justify-center items-center my-8">
          <Pagination
            total={pagination?.totalPages}
            value={isPage}
            onChange={setIsPage}
            color="#000000"
            classNames={{
              root: 'border rounded-md shadow',
              control:
                'hover:bg-white rounded-none text-black data-[active=true]:border border-0 p-6',
              dots: 'text-gray-400',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
