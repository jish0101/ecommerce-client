import React from 'react';
import { formatNumber } from '../../Lib/Utils';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ data, to }) => {
  const { name, image, price, currency } = data;
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(to);
  };

  return (
    <div
      onClick={handleRedirect}
      className="grid gap-3 cursor-pointer shadow-sm outline outline-1 outline-gray-200 p-3 rounded-md hover:scale-105 transition-transform duration-300"
    >
      <div className="rounded-md overflow-hidden">
        <img loading="lazy" className="flex max-w-[100%] object-cover" src={image} alt={name} />
      </div>
      <h3 className="capitalize font-semibold hover:text-amazon_yellow">{name}</h3>
      <div className="flex gap-1">
        <p className="text-sm">{currency?.code}</p>
        <p className="text-2xl">{`${currency?.symbol}${formatNumber(price)}`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
