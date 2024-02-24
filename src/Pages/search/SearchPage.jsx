import React from 'react';
import { useParams } from 'react-router-dom';

const SearchPage = () => {
  const params = useParams();
  console.log('🚀 ~ SearchPage ~ params:', params);
  return (
    <div>
      SearchPage
      {JSON.stringify(params)}
    </div>
  );
};

export default SearchPage;
