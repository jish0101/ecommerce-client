import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../Hooks/useProducts';
import ProductCard from '../../Components/Card/ProductCard';

const SearchPage = () => {
  const { id } = useParams();

  const [isPage, setIsPage] = useState(1);
  const [filters, setFilters] = useState({
    rowCount: 20,
  });
  const { data: productsData, refetch: refetchProducts } = useProducts({
    isPage,
    filters,
  });

  console.log('productsData => ', productsData);

  useEffect(() => {
    refetchProducts();
  }, [isPage, filters]);

  return (
    <section>
      <div>Pagination</div>
      <div>
        <div>
          <h4>Results</h4>
        </div>
        <div>
          {/* {productsData.map((data) => (
            <ProductCard key={data._id} />
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
