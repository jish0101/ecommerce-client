import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../Hooks/useProducts';
import ProductCard from '../../Components/Card/ProductCard';

const SearchPage = () => {
  const { id } = useParams();

  const [isPage, setIsPage] = useState(0);
  const [filters, setFilters] = useState({
    rowCount: 40,
  });
  const { data: productsData, refetch: refetchProducts } = useProducts({
    isPage: isPage + 1,
    filters,
  });
  const products = productsData?.data;
  const pagination = productsData?.pagination;
  console.log('productsData => ', productsData);

  useEffect(() => {
    refetchProducts();
  }, [isPage, filters]);

  return (
    <section>
      <div className="border-b px-3">
        <p className="p-2">{`${isPage * filters?.rowCount + 1}-${filters?.rowCount} of over ${pagination?.totalRecords} results`}</p>
      </div>
      <div className="grid gap-3 md:max-w-[1101px] mx-auto p-1 my-3">
        <div>
          <h4 className="font-semibold text-2xl">Results</h4>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products && products?.map((data) => <ProductCard data={data} key={data._id} />)}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
