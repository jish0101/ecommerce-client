import React from 'react';
import { formatNumber } from '../../Lib/Utils';

const ProductCard = ({ data }) => {
  const { name, image, price, currency } = data;
  return (
    <div className="grid gap-2 cursor-pointer shadow-sm p-2">
      <div className="rounded-md overflow-hidden">
        <img className="flex max-w-[100%] object-cover" src={image} alt={name} />
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
